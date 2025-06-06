// first name last name email phone number and the city the person came from
const contactSchema = {
    firstname:  {
        isString: {
            errorMessage: "Invalid Firstname"
        },
        notEmpty: {
            errorMessage: "Firstname cannot be empty"
        },
        isLength: {
            options: {min: 3},
            errorMessage: "Firstname must be at least 3 characters"
        },
    },
    lastname: {
        isString: {
            errorMessage: "Invalid Lastname"
        },
        notEmpty: {
            errorMessage: "Lastname cannot be empty"
        },
        isLength: {
            options: { min: 3 },
            errorMessage: "Lastname must be at least 3 characters"
        },
    },

    email: {
        isString: {
            errorMessage: "Email Address must be a string"
        },
        isEmail: {
            errorMessage: "Invalid Email"
        },
        notEmpty: {
            errorMessage: "An Email Address must be provided"
        }
    },

    city: {
        isString: {
            errorMessage: "City must be a string"
        },
        notEmpty: {
            errorMessage: "City cannot be empty"
        },
        isLength: {
            options: { min: 1 },
            errorMessage: "City must be at least 1 character"
        }
    },
    phonenumber: {
        isString: {
            errorMessage: "Phone Number must be A string"
        },
        isLength: {
            options: {min: 11, max: 11},
            errorMessage: "Invalid Phone Number"
        },
        notEmpty: {
            errorMessage: "Phone Numer cannot be empty"
        },
    }
}

export default contactSchema