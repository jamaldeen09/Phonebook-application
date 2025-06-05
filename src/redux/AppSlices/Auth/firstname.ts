import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface FirstnameSchema {
    firstname: any
}

const initialState: FirstnameSchema = {
    firstname: ""
}

const firstnameSlice = createSlice({
    initialState,
    name: "firstName",
    reducers: {
        setFirstname: (state: any, action: PayloadAction) => {
            state.firstname = action.payload
        },
        resetFirstname: (state) => {
            state.firstname = ""
        }
    }
})

export const { setFirstname,resetFirstname } = firstnameSlice.actions
export default firstnameSlice.reducer;