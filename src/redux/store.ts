import { configureStore } from "@reduxjs/toolkit";
import contactStoreSlice from "./AppSlices/contactStore"
import imgUrlSlice from "./AppSlices/profilePic"
import firstnameSlice from "./AppSlices/Auth/firstname"
import lastnameSlice from "./AppSlices/Auth/lastname"
import emailSlice from "./AppSlices/Auth/email"
import citySlice from "./AppSlices/Auth/city"
import updModalSlice from "./UpdateItems/UpdateModalActivator"
import storageSlice from "./UpdateItems/StoreFoundItem"
import contactGetterSlice from "./ViewContact/contactinfogetter"
import viewModalSlice from "./ViewContact/viewContactModalActivator"
import phoneNumSlice from "./AppSlices/Auth/phonenumber"


const store = configureStore({
    reducer: {
        // slices goes here
        contactStorage: contactStoreSlice,
        url: imgUrlSlice,
        firstName: firstnameSlice,
        lastName: lastnameSlice,
        useremail: emailSlice,
        usercity: citySlice,
        updateModal: updModalSlice,
        foundItemStorage: storageSlice,
        currContact: contactGetterSlice,
        viewContact: viewModalSlice,
        Phonenumber: phoneNumSlice
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch