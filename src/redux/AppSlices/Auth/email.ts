import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface EmailSchema {
    email: any 
}

const initialState: EmailSchema = {
    email: ""
}

const emailSlice = createSlice({
    initialState,
    name: "useremail",
    reducers: {
        setEmail: (state: any, action: PayloadAction) => {
            state.email = action.payload
        },
        resetEmail: (state) => {
            state.email = ""
        }
    }
})

export const { setEmail,resetEmail } = emailSlice.actions
export default emailSlice.reducer;