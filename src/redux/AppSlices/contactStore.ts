import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

interface StoreSchema {
    contactStore: any
}

const initialState: StoreSchema = {
    contactStore: []
}

const contactStoreSlice = createSlice({
    initialState,
    name: "contactStorage",
    reducers: {
       
        getDataBase: (state, action: PayloadAction) => {
            state.contactStore = action.payload;
        }
    }
}) 

export const { getDataBase } = contactStoreSlice.actions;
export default contactStoreSlice.reducer