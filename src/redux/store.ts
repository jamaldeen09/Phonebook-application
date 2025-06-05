import { configureStore } from "@reduxjs/toolkit";
import contactStoreSlice from "./AppSlices/contactStore"
import imgUrlSlice from "./AppSlices/profilePic"
import firstnameSlice from "./AppSlices/Auth/firstname"
import lastnameSlice from "./AppSlices/Auth/lastname"
import emailSlice from "./AppSlices/Auth/email"
import citySlice from "./AppSlices/Auth/city"


const store = configureStore({
    reducer: {
        // slices goes here
        contactStorage: contactStoreSlice,
        url: imgUrlSlice,
        firstName: firstnameSlice,
        lastName: lastnameSlice,
        useremail: emailSlice,
        usercity: citySlice,
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch