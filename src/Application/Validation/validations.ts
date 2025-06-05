const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/

export const firstnameValidation = (name: string): boolean => {
    if (!name || name.length < 3 || name.trim() === ""){
        return false
    } else {
        return true
    }
}

export const lastnameValidation = (name: string): boolean => {
    if (!name || name.length < 3 || name.trim() === "") {
        return false
    } else {
        return true
    }
}

export const emailValidation = (email: string): boolean => {

    if (!email) {
        return false
    } else if (
        !email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        return false
    } else {
        return true
    }
}

export const cityValidation = (city: string): boolean => {
    if (!city || city.length < 1){
        return false
    } else {
        return true;
    }
}