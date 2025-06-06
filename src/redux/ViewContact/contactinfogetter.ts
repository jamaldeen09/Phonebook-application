import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ContactGetterSchema {
    currentContact: any
}

const initialState: ContactGetterSchema = {
    currentContact: {}
}

const contactGetterSlice = createSlice({
    initialState,
    name: "currContact",
    reducers: {
        clickedContact: (state, action: PayloadAction) => {
            state.currentContact = action.payload
        }
    }
})

export const { clickedContact } = contactGetterSlice.actions;
export default contactGetterSlice.reducer;