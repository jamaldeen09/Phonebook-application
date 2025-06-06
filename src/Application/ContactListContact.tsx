

interface ContactSchema {
    fullName: string,
    email: string,
    city: string,
    firstLetter: string,
    userId: number,
    phoneNum: string
}

const ContactListContact = (props: ContactSchema) => {
    const { fullName,email,city,firstLetter,userId,phoneNum } = props
  return (
     <div className="w-full min-h-16 flex  flex-col
        md:flex-row">
           <div className="w-full flex items-center space-x-2">
             {/* FirstName Logic */}
             <div style={{borderRadius: "50%"}} className="bg-blue-600 text-white font-bold flex
            justify-center items-center h-10 w-12">
                <p>
                    {firstLetter}
                </p>
            </div>
    
            {/* Information */}
            <div className="w-full flex flex-col space-y-2">
                <p className="font-extrabold">{fullName}</p>
    
                <div className="flex space-x-4 items-center">
                    <div className="rounded-full darkishWhite text-xs py-1 px-2">{email}</div>
                    <div className="rounded-full darkishWhite text-xs py-1 px-2">{city}</div>
                    <div className="rounded-full darkishWhite text-xs py-1 px-2">{phoneNum}</div>
                </div>
            </div>
           </div>
        </div>
  )
}

export default ContactListContact