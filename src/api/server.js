import express from "express"
import { checkSchema,matchedData,validationResult,param,body } from "express-validator"
import cors from "cors"
import contactSchema from "./schemas.js"
import database from "./database.js"

const app = express();
const PORT = process.env.PORT || 4080;


app.use(express.json())
app.use(cors())


app.get("/usercontact/:id", param("id").notEmpty() ,(request, response) => {
    const result = validationResult(request);
    const isValid = result.isEmpty()


    if (!isValid)
        return response.status(400).send(result.array())

    const data = matchedData(request)
    const parsedId = parseInt(data.id);;

    const itemsIndex = database.findIndex(contact => contact.id === parsedId)

    if (itemsIndex === -1){
        return response.status(400).send({msg: "Item was not found"})
    } else {
        const itemFound = database[itemsIndex]
        return response.status(200).send({
            msg: "Successfully Found Item",
            contact: itemFound
        })
    }
})

app.get("/contact", (request, response) => {
    return response.status(200).send(
        {
            msg: "Sucessfull",
            data: database
        }
    )
})

app.post("/contact", checkSchema(contactSchema) ,(request, response) => {
    const result = validationResult(request)
    const isValid = result.isEmpty();

    if (!isValid)
        return response.status(400).send(result.array())
    const data = matchedData(request)
    const newUser = { id: database.length + 1, ...data }
    database.push(newUser);
    return response.status(201).send(
        {
            msg: "Successfully Created User",
            userInformation: newUser
        }
    )
})

app.get("/filter-contact/:name", param("name").isString(), (request, response) => {
    const result = validationResult(request)
    const isValid = result.isEmpty();

    if (!isValid)
        return response.status(400).send(result.array())

    const data = matchedData(request)
    const extractedName = data.name;

    const foundItem = database.find(item => item.firstname.toLowerCase().includes(extractedName.toLowerCase()))

    if (!foundItem) {
        return response.status(404).send({msg: "Item does not exist and was not found"})
    } else {
        return response.status(200).send({
            msg: "Item Found",
            item: foundItem
        })
    }
})

app.put("/contact/:id", checkSchema(contactSchema), param("id").notEmpty() , (request, response) => {
    const result = validationResult(request);
    const isValid = result.isEmpty();

    if (!isValid)
        return response.status(400).send(result.array)

    const data = matchedData(request);
    const parsedId = parseInt(data.id);
    const clonedData = data
    delete clonedData.id
    
    const findItemsIndex = database.findIndex(item => item.id === parsedId);
    const updatedData = {  id: parsedId, ...clonedData}

    if (findItemsIndex === -1) {
        return response.status(404).send({ msg: "Item was not found"})
    } else {
        database[findItemsIndex] = { ...updatedData }
        return response.status(200).send({
            msg: "Sucessfully Updated",
            updatedItem: database[findItemsIndex]
        })
    }
})

app.delete("/contact/:id", param("id").notEmpty() ,(request, response) => {
    const result = validationResult(request);
    const isValid = result.isEmpty()

    if (!isValid)
        return response.status(400).send(result.array())

    const data = matchedData(request)
    const parsedId = parseInt(data.id);
    
    const findItemsIndex = database.findIndex(item => item.id === parsedId)

    if (findItemsIndex === -1){
        return response.status(400).send({msg: "Item was not found"})
    } else{
        database.splice(findItemsIndex, 1);

        return response.status(200).send({msg: "Item sucessfully deleted"})
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})



