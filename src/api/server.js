import express from "express"
import { checkSchema,matchedData,validationResult,param,body } from "express-validator"
import cors from "cors"
import contactSchema from "./schemas.js"
import database from "./database.js"

const app = express();
const PORT = process.env.PORT || 4080;


app.use(express.json())
app.use(cors())


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

    database.push(data);
    return response.status(201).send(
        {
            msg: "Successfully Created User",
            userInformation: { id: database.length, ...data }
        }
    )
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})



