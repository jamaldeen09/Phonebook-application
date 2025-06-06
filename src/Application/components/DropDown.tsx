import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "/Users/macbook/phonebook-app/src/components/ui/dropdown-menu";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "/Users/macbook/phonebook-app/src/components/ui/button";
import { useAppDispatch,useAppSelector } from "/Users/macbook/phonebook-app/src/redux/hooks";
import { getDataBase } from "/Users/macbook/phonebook-app/src/redux/AppSlices/contactStore";
import { activateUpdModal } from "/Users/macbook/phonebook-app/src/redux/UpdateItems/UpdateModalActivator";
import { getItem } from "/Users/macbook/phonebook-app/src/redux/UpdateItems/StoreFoundItem";
import { activateContactViewer } from "/Users/macbook/phonebook-app/src/redux/ViewContact/viewContactModalActivator";
import { clickedContact } from "/Users/macbook/phonebook-app/src/redux/ViewContact/contactinfogetter";

interface DropdwonSchema {
  usersname: string,
  id:number;
}
  
  export function Dropdown(props: DropdwonSchema) {
    const { usersname,id } = props
      const dispatch = useAppDispatch()
    // Delete Function
    const DELETEreq = async () => {
      try {
        const response = await fetch(`http://localhost:4080/contact/${id}`, {
          method: "DELETE"
        });

        const data = await response.json();
        return data
      } catch (err) {
        console.error(err)
      }
    }

    const GETnewDatabase = async () => {
      try {
        const res = await fetch("http://localhost:4080/contact", {
            method: "GET",
        })
        const data = await res.json();
          console.log(data)
           dispatch(getDataBase(data.data));
        } catch (err) {
          console.error(err)
        }
    }

    const handleDeleting = async () => {
      await DELETEreq()
      await GETnewDatabase()
    }

    // Update Function
  

    const findUserGET = async () => {
      try {
        const response = await fetch(`http://localhost:4080/usercontact/${id}`, {
          method: "GET"
        })

        const data = await response.json()
        dispatch(getItem(data.contact))
      } catch (err) {
        console.error(err)
      }
    }
   

    const handleContactUpdate = async () => {
      dispatch(activateUpdModal())

      await findUserGET()
    }

    // Handle view contact
    const clickedContactGET = async () => {
      try {
        const response = await fetch (`http://localhost:4080/usercontact/${id}`, {
          method: "GET"
        })
        const data = await response.json();
        dispatch(clickedContact(data.contact))
      } catch (err) {
        console.error(err)
      }
    }


    const handleViewingContact = async () => {
      dispatch(activateContactViewer())

      await clickedContactGET()
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="hover:scale-110 transition-all 
          cursor-pointer  bg-white text-black shadow-none 
          hover:text-white">
            <FontAwesomeIcon icon={faEllipsis} className="text-2xl"/>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>{usersname}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleViewingContact}>
            View Contact
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleContactUpdate}>
            Edit Contact
          </DropdownMenuItem>
          <DropdownMenuItem className="active:bg-red-600 active:text-white"
          onClick={handleDeleting}>
            Delete Contact
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  

