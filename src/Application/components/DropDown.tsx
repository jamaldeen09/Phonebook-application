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
  
  export function Dropdown() {
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
          <DropdownMenuLabel>Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => alert("Profile clicked")}>
            View Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => alert("Settings clicked")}>
            Edit Contact
          </DropdownMenuItem>
          <DropdownMenuItem className="active:bg-red-600 active:text-white"
          onClick={() => alert("Log out clicked")}>
            Delete Contact
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  

