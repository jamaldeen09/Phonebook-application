import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus} from '@fortawesome/free-solid-svg-icons'
import { Input } from "../components/ui/input";



const PhoneBook = () => {
  return (
    <div className="flex justify-center items-center min-h-[150vh] bg-gray-400">

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
                           src="https://blog.stocksnap.io/content/images/2022/02/smiling-woman_W6GFOSFAXA.jpg" 
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

                        <p className={`font-bold text-xl hover:cursor-pointer
                        hover:scale-105 transition-all py-3 text-blue-500 border-b-4 border-blue-500`}>Contacts</p>
                        <p className={`font-bold text-xl hover:cursor-pointer
                        hover:scale-105 transition-all py-2`}>Lists</p>
                    </div>
                </div>
            </div>

            {/* Iphone body */}
            <div className="w-full min-h-32 border-b border-gray-400 flex flex-col gap-8 py-6">

                {/* Search Bar */}
                <div className="w-full flex items-center 
                justify-center px-6">
                
                    <div className="w-full max-w-md">
                      <Input type="text" placeholder="Search" className="sleek-white h-12"/>
                    </div>
                </div>

                {/* Add New contact */}
                <div className="w-full">

                    {/* Icon and text container */}
                    <div className="w-full flex gap-4 items-center
                    px-6">
                        <button 
                        style={{borderRadius: "50%"}}
                        className="bg-black text-white w-10 h-10 hover:scale-105 
                        hover:brightness-110 active:brightness-110 transition-all">
                            <FontAwesomeIcon icon={faPlus} className=""/>
                        </button>
                        <p className="font-bold text-xl">Add new contact</p>
                    </div>
                </div>
            </div>

            {/* Display area */}
            <div className="w-full min-h-full border-4 border-red-500">

            </div>
        </div>
    </div>
  )
}

export default PhoneBook