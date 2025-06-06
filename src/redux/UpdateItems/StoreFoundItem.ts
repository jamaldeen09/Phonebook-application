import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

interface StorageSchema {
    storage: any
}

const initialState: StorageSchema = {
    storage: {}
}

const storageSlice = createSlice({
    initialState,
    name: "foundItemStorage",
    reducers: {
        getItem: (state, action: PayloadAction) => {
            state.storage = action.payload
        },
        changeFirstName: (state, action: PayloadAction) => {
            state.storage.firstname = action.payload
        },
        changeLastName: (state, action: PayloadAction) => {
            state.storage.lastname = action.payload
        },
        changeEmail: (state, action: PayloadAction) => {
            state.storage.email = action.payload
        },
        changeCity: (state, action: PayloadAction) => {
            state.storage.city = action.payload
        },
        changePhoneNumber: (state, action: PayloadAction) => {
            state.storage.phonenumber = action.payload
        }
    }
})

export const { getItem,changeFirstName,changeLastName,changeEmail,changeCity,changePhoneNumber } = storageSlice.actions;
export default storageSlice.reducer;