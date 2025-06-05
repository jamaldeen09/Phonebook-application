import ContactList from "./Application/ContactList"
import PhoneBook from "./Application/PhoneBook"
import { useLocation,useNavigate } from "react-router"

const App = () => {
  const location = useLocation()
  const navigate = useNavigate()
  return (
    <>
      {
        location.pathname === "/" ? <PhoneBook /> : 
        location.pathname === "/contact-list" ? <ContactList />  :
        <div className="flex justify-center items-center  text-red-600 flex-col gap-8 h-screen">
          <h1 className="text-4xl">PAGE NOT FOUND</h1>
          <p className="underline text-blue-500 hover:cursor-pointer" onClick={() => navigate("/")}>Go back</p>
        </div>
      }
    </>
  )
}

export default App