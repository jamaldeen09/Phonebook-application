import React, { useState,useEffect, act } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faX} from '@fortawesome/free-solid-svg-icons'
import { Input } from "../components/ui/input";
import { useLocation,useNavigate } from "react-router"
import { setUrl } from '../redux/AppSlices/profilePic';
import { useAppDispatch,useAppSelector } from '../redux/hooks';
import { firstnameValidation, lastnameValidation,emailValidation,cityValidation, phoneNumberVaidation } from "./Validation/validations"
import { setEmail,resetEmail } from '../redux/AppSlices/Auth/email';
import { setFirstname,resetFirstname } from '../redux/AppSlices/Auth/firstname';
import { setLastname,resetLastname } from '../redux/AppSlices/Auth/lastname';
import { setCity,resetCity } from '../redux/AppSlices/Auth/city';
import Contact from './components/Contact';
import { getDataBase } from '../redux/AppSlices/contactStore';
import { deactivateUpdModal } from '/Users/macbook/phonebook-app/src/redux/UpdateItems/UpdateModalActivator';
import { changeCity, changeEmail, changeFirstName, changeLastName, changePhoneNumber } from '/Users/macbook/phonebook-app/src/redux/UpdateItems/StoreFoundItem';
import { deactivateContactViewer } from '/Users/macbook/phonebook-app/src/redux/ViewContact/viewContactModalActivator';
import ContactView from './components/ContactView';
import { resetPhoneNum, setPhoneNum } from '/Users/macbook/phonebook-app/src/redux/AppSlices/Auth/phonenumber';


const PhoneBook = () => {
    // extract useNavigate and useLocation
    const navigate = useNavigate()
    const location = useLocation();

    // extract selector and dispatch
    const selector = useAppSelector(state => state)
    const dispatch = useAppDispatch();

    // url Modal activator
    const [ urlModal,setUrlModal ] = useState<boolean>(false);


    // url container;
    const url = selector.url.imgUrl;
    // add new user Modal activator
    const [ userAdder,setUserAdder ] = useState<boolean>(false);

    // get email city firstname and lastname
    const firstname = selector.firstName.firstname
    const lastname = selector.lastName.lastname
    const email = selector.useremail.email
    const city = selector.usercity.city
    const phonenumber = selector.Phonenumber.phoneNum

    // cancel request
    const cancelReq = () => {
        dispatch(resetFirstname())
        dispatch(resetLastname())
        dispatch(resetEmail())
        dispatch(resetCity())
        dispatch(resetPhoneNum())

        setUserAdder(false)
    }

    // GET REQUEST
    const GETlatestData = async () => {
        try {
            const res = await fetch("http://localhost:4080/contact", {
                method: "GET",
            })
            const data = await res.json();
            dispatch(getDataBase(data.data));
        } catch (err) {
            console.error(err)
        }
    }
    useEffect(() => {
        GETlatestData()
    },[])
    // validation
    const [ validation,setValidation ] = useState<boolean>(false)
    const information = selector.contactStorage.contactStore
    const createUser = async () => {
        // Frontend Validation
        const isValidFirstname = firstnameValidation(firstname)
        const isValidLastname = lastnameValidation(lastname)
        const isValidEmail = emailValidation(email)
        const isValidCity = cityValidation(city)
        const isValidPhoneNumber = phoneNumberVaidation(phonenumber)

        if (isValidFirstname && isValidLastname && isValidEmail && isValidCity && isValidPhoneNumber){

            try {
                const res = await fetch("http://localhost:4080/contact", {
                    method: "POST",
                    headers: { "Content-Type" : "application/json" },
                    body: JSON.stringify({ firstname,lastname,email,city,phonenumber })
                })
                const data = await res.json()

                if (!data?.userInformation) {
                    setValidation(true)
                    return;
                } else {
                    setValidation(false);

                    cancelReq()
                    setUserAdder(false);
                }
            } catch (err) {
                console.error(err)
            }

            await GETlatestData()

        }

    }

    // Update Modal activator
    const activateModal = selector.updateModal.updModal
    const itemGetter = selector.foundItemStorage.storage
    const updateUserPUT = async () => {
        try {
          const response = await fetch (`http://localhost:4080/contact/${itemGetter.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(itemGetter)
          });
          const data = response.json();
          console.log(data);
        } catch (err) {
          console.error(err)
        }
      }

    const updateContact = async () => {
        await updateUserPUT();
        await GETlatestData();

        dispatch(deactivateUpdModal());
    }
    // View contact
    const storingUserInfo = selector.currContact.currentContact;
    const viewContact = selector.viewContact.viewModal

    // Search Bar
    const [ search,setSearch ] = useState<string>("");
    const [ foundItem,setFoundItem ] = useState<any>(null);


    const fetchSearchData = async () => {
        try {
            const response = await fetch (`http://localhost:4080/filter-contact/${search}`, {
                method: "GET"
            })

            const data = await response.json()
            setFoundItem(data.item)
        } catch (err) {
            console.error(err)
        }
    }
    useEffect(() => {
        if (search.trim()) {
          fetchSearchData();
        } else {
          setFoundItem(null);
        }
      }, [search]);

  
  return (
    <div className="flex justify-center items-center min-h-[150vh] bg-gray-400 relative">

        {/* Phone UI */}
        <div style={{borderRadius: "3.8rem", overflow:"hidden"}}
         className="w-full bg-white h-[852px] border-8 border-black 
         max-w-[400px]
        md:max-w-[470px] ">

            {/* Iphone header */}
            <div 
           
            className="w-full min-h-fit
            flex flex-col gap-6 sleek-white
            ">
                {/* Iphone Top */}
                <div className="w-full h-fit flex justify-center">
                    <div style={{borderBottomRightRadius: "5rem", borderBottomLeftRadius: "5rem"}}
                     className="w-full max-w-72 h-8 bg-black flex justify-center items-center">
                     <div className="w-full bg-gray-600 max-w-8 rounded-full h-2">

                     </div>
                    </div>
                </div>

                {/* Iphone Header Body */}
                <div className="w-full flex flex-col
                  gap-6
                  ">

                    <div className="
                    px-6
                    flex 
                    gap-6
                    md:gap-10
                    lg:gap-12">
                        {/* Image container */}
                       <div className="">
                        <div 
                           style={{ borderRadius: "50%" }}
                           className="p-1 w-fit h-fit border-4 border-blue-500">
                           <img 
                    
                           className="
                           h-10 w-10"
                           style={{borderRadius: "50%"}}
                           src={url || "https://craftsnippets.com/articles_images/placeholder/placeholder.jpg"} 
                           alt="Profile Picture" />
                          </div>
                        </div>

                       {/* APP title */}
                       <div className=" w-fit
                   
                        flex items-center justify-center ">
                        <h1 className="font-bold text-3xl">Phonebook</h1>
                       </div>
                    </div>

                    {/* App Navigation */}
                    <div className="w-fullh-fit flex px-6 gap-6 items-center">

                        <p 
                        onClick={() => navigate("/")}
                        className={`font-bold text-xl hover:cursor-pointer
                        hover:scale-105 transition-all py-3 
                        ${location.pathname === "/" ? "text-blue-500 border-b-4 border-blue-500" : "text-black"}`}>
                            Contacts
                        </p>
                        <p 
                        onClick={() => navigate("/contact-list")}
                        className={`font-bold text-xl hover:cursor-pointer
                        hover:scale-105 transition-all py-2 
                        ${location.pathname === "/contact-list" ? "text-blue-500 border-b-4 border-blue-500" : "text-black"}`}>
                            Lists
                            </p>
                    </div>
                </div>
            </div>

            {/* Iphone body */}
            <div className="w-full min-h-32 border-b border-gray-400 flex flex-col gap-8 py-6">

                {/* Search Bar */}
                <div className="w-full flex items-center 
                justify-center px-6">
                
                    <div className="w-full max-w-md">
                      <Input value={search} onChange={(e) => setSearch(e.target.value)}
                      type="text" placeholder="Search" className="sleek-white h-12"/>
                    </div>
                </div>

                {/* Add New contact */}
                <div className="w-full flex flex-col gap-4">

                    {/* Icon and text container */}
                    <div className="w-full flex gap-4 items-center
                    px-6">
                        <button 
                        onClick={() => setUserAdder(true)}
                        style={{borderRadius: "50%"}}
                        className="bg-black text-white w-10 h-10 hover:scale-105 
                        hover:brightness-110 active:brightness-110 transition-all">
                            <FontAwesomeIcon icon={faPlus} className=""/>
                        </button>
                        <p 
                        className="font-bold text-xl">Add new contact</p>
                    </div>

                    <div 
                    className="w-full flex gap-4 items-center
                    px-6">
                        <button 
                        onClick={() => setUrlModal(true)}
                        style={{borderRadius: "50%"}}
                        className="bg-gray-500 text-white w-10 h-10 hover:scale-105 
                        hover:brightness-110 active:brightness-110 transition-all">
                            <FontAwesomeIcon icon={faPlus} className=""/>
                        </button>
                        <p className="font-bold text-xl">Change profile picture</p>
                    </div>
                </div>
            </div>

            {/* Display area */}
            <div 
            style={{overflow: "scroll-auto"}}
            className="w-full max-h-[400px] overflow-y-auto flex flex-col gap-4 px-4
            py-10">

                {
                    foundItem ? <Contact 
                     fullName={`${foundItem.firstname} ${foundItem.lastname}`}
                     email={foundItem.email} city={foundItem.city}
                     firstLetter={foundItem.firstname.split("")[0]}
                     key={foundItem.id} userId={foundItem.id}
                     /> :

                    information.map((info: any) => {
                        return <Contact 
                        key={info.id}
                        userId={info.id}
                        firstLetter={info.firstname.split("")[0]}
                        email={info.email} city={info.city} 
                        fullName={`${info.firstname} ${info.lastname}`}/>
                    })
                }
            </div>

            {/* MODAL FOR CHANGING PROFILE PICTURE */}
            <div className={`${urlModal ? "flex" : "hidden"} 
            absolute inset-0 z-10 bg-black/70 flex items-center justify-center`}>

               <div className={`${urlModal ? "show-modal" : "hide-modal"} bg-white rounded-xl p-6 shadow-lg w-[90%] max-w-sm`}>
                 <Input 
                 value={url}
                 onChange={(e: React.ChangeEvent<HTMLInputElement> | any) => dispatch(setUrl(e.target.value))}
                 type="text" 
                 placeholder="Paste image URL" />
                 <button onClick={() => setUrlModal(false)} 
                 className=" hover:brightness-105 transition-all
                 mt-4 w-full bg-blue-500 text-white p-2 rounded">
                   Done
                 </button>
                </div>
            </div>

            {/* MODAL FOR ADDING NEW USER */}
            <div className={`${userAdder ? "flex" : "hidden"} 
            inset-0 flex justify-center items-center absolute z-10`}>

                <div 
                style={{borderRadius: "3.8rem"}}
                className={`${userAdder ? "show-modal" : "hide-modal"} 
                w-[90%] bg-black/90 rounded-xl shadow-xl h-[800px]
                  max-w-[370px]
                 md:max-w-[440px] flex flex-col gap-6 px-10 py-16`}>

                    {/* TITLE */}
                    <div className="w-full flex justify-between items-center text-white font-extrabold text-2xl">
                        <h1>New Contact</h1>
                        <FontAwesomeIcon 
                        onClick={cancelReq}
                        icon={faX} 
                        className="text-xl hover:scale-105 transition-all hover:cursor-pointer" />
                    </div>

                    {/* Firstname area */}
                    <div className="w-full max-w-sm flex justify-center items-center flex-col gap-2
                    ">
                        <Input value={firstname} onChange={(e: React.ChangeEvent<HTMLInputElement>| any) => dispatch(setFirstname(e.target.value))}
                        type="text" placeholder="Firstname" className="bg-white w-full h-12"/>
                        <p className="text-red-600">{firstnameValidation(firstname) ? null : validation ? "Invalid firstname" : "Invalid firstname"}</p>
                    </div>

                    {/* Lastname area */}
                    <div className="w-full max-w-sm flex justify-center items-center
                    flex-col gap-2">
                        <Input 
                        value={lastname}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>| any) => dispatch(setLastname(e.target.value))}
                        type="text" placeholder="Lastname" className="bg-white w-full h-12"/>
                        <p className="text-red-600">{lastnameValidation(lastname) ? null : validation ? "Invalid Lastname" : "Invalid Lastname"}</p>
                    </div>

                    {/* Email area */}
                    <div className="w-full max-w-sm flex justify-center items-center flex-col gap-2
                    ">
                        <Input 
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement> | any) => dispatch(setEmail(e.target.value))}
                        type="email" placeholder="Email" className="bg-white w-full h-12"/>
                        <p className="text-red-600">{emailValidation(email) ? null : validation ? "Invalid Email Address" : "Invalid Email Address"}</p>
                    </div>

                    {/* City area */}
                    <div className="w-full max-w-sm flex justify-center items-center flex-col gap-2
                    ">
                        
                        <Input 
                        value={city}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>| any) => dispatch(setCity(e.target.value))}
                        type="text" placeholder="City" className="bg-white w-full h-12"/>
                        <p className="text-red-600">{cityValidation(city) ? null : validation ? "Invalid City" : "Invalid City"}</p>
                    </div>

                    {/* Phone number area */}
                    <div className="w-full max-w-sm flex justify-center items-center flex-col gap-2
                    ">
                        <Input 
                        value={phonenumber} 
                        onChange={(e: React.ChangeEvent<HTMLInputElement> | any) => dispatch(setPhoneNum(e.target.value))}

                        type="number" placeholder="Phone number" className="bg-white w-full h-12"/>
                        <p className="text-red-600">{
                        phoneNumberVaidation(phonenumber) ? null : validation ? "Invalid Phonenumber" : "Invalid Phone number"}</p>
                    </div>

                    {/* submit btn */}
                    <div className="w-full flex justify-center items-center">

                        <button onClick={createUser}
                        className="hover:brightness-105 transition-all
                        bg-blue-500 w-full h-10 text-white font-extrabold rounded-md shadow-xl">
                            Create
                        </button>
                    </div>
                </div>
            </div>

            {/* MODAL FOR UPDATING */}
            <div className={` ${activateModal ? "flex" : "hidden"}
            inset-0 flex z-10 justify-center items-center w-full absolute`}>

                <div style={{borderRadius: "3.8rem"}}
                className={`${activateModal ? "show-modal" : "hide-modal"} 
                  w-[90%] bg-black/90 rounded-xl shadow-xl h-[800px]
                  max-w-[370px]
                 md:max-w-[440px] flex flex-col gap-6 px-10 py-16`}>

                    {/* TITLE */}
                    <div className="w-full flex justify-between items-center text-white font-extrabold text-2xl">
                        <h1>Update Contact</h1>
                        <FontAwesomeIcon 
                        onClick={() => dispatch(deactivateUpdModal())}
                        icon={faX} 
                        className="text-xl hover:scale-105 transition-all hover:cursor-pointer" />
                    </div>

                    {/* Modal Body */}

                    {/* New firstName */}
                    <div className="w-full">
                        <Input value={itemGetter.firstname} onChange={(e: React.ChangeEvent<HTMLInputElement>| any) => dispatch(changeFirstName(e.target.value))}
                        type="text" placeholder="New Firstname" className="bg-white w-full h-12"/>
                    </div>

                    {/* New lastName */}

                    <div className="w-full">
                        <Input value={itemGetter.lastname} onChange={(e: React.ChangeEvent<HTMLInputElement>| any) => dispatch(changeLastName(e.target.value))}
                        type="text" placeholder="New Lastname" className="bg-white w-full h-12"/>
                    </div>

                    {/* New Email */}
                    <div className="w-full">
                        <Input value={itemGetter.email} onChange={(e: React.ChangeEvent<HTMLInputElement>| any) => dispatch(changeEmail(e.target.value))}
                        type="text" placeholder="New Email" className="bg-white w-full h-12"/>
                    </div>

                    {/* New City */}
                    <div className="w-full">
                        <Input value={itemGetter.city} onChange={(e: React.ChangeEvent<HTMLInputElement>| any) => dispatch(changeCity(e.target.value))}
                        type="text" placeholder="New City" className="bg-white w-full h-12"/>
                    </div>

                    {/* New Number */}
                    <div className="w-full max-w-sm flex justify-center items-center flex-col gap-2
                    ">
                        <Input 
                        value={itemGetter.phonenumber} 
                        onChange={(e: React.ChangeEvent<HTMLInputElement> | any) => dispatch(changePhoneNumber(e.target.value))}

                        type="number" placeholder="Phonenumber" className="bg-white w-full h-12"/>
                    </div>

                    <div className="w-full">
                        <button 
                        onClick={updateContact}
                        className="w-full hover:brightness-105 transition-all bg-blue-500 h-10 text-white
                        font-extrabold rounded-md shadow-xl">Update</button>
                    </div>
                </div>
            </div>

            {/* MODAL FOR VIEWING A SPECIFIC CONTACT */}
            <div className={` ${viewContact ? "flex" : "hidden"}
            inset-0 flex z-10 justify-center items-center w-full absolute`}>

                <div style={{borderRadius: "3.8rem"}}
                className={`${viewContact ? "show-modal" : "hide-modal"} 
                  w-[90%] bg-black/90 rounded-xl shadow-xl h-[800px]
                  max-w-[370px]
                 md:max-w-[440px] flex flex-col gap-16 px-10 py-16`}>

                    <div className="w-full flex justify-between items-center">
                        <h1 className="text-white font-bold text-xl">{`${storingUserInfo.firstname}'s Information`}</h1>

                        <FontAwesomeIcon 
                        onClick={() => dispatch(deactivateContactViewer())}
                        icon={faX} 
                        className=" text-white
                        text-xl hover:scale-105 transition-all hover:cursor-pointer" />
                    </div>
                    <div className="w-full flex justify-center items-center  h-fit">

                        <div style={{borderRadius: "50%"}} className="bg-blue-600 text-white font-bold flex
                        justify-center items-center h-16 w-16 text-2xl">
                            <ContactView 
                            letter={storingUserInfo.firstname ? storingUserInfo.firstname.split("")[0] : "None"}/>
                        </div>
                    </div>

                    <div className="w-full flex flex-col items-center justify-center gap-4">
                        <h1 className="text-xl font-extrabold text-white">Name: {`${storingUserInfo.firstname} ${storingUserInfo.lastname}`}</h1>
                        <p className="text-lg text-white">Email: {storingUserInfo.email}</p>
                        <p className="text-lg text-white">City: {storingUserInfo.city}</p>
                        <p className="text-lg text-white">Phone number: {storingUserInfo.phonenumber}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PhoneBook