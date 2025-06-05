import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface LastnameSchema {
    lastname: any
}

const initialState: LastnameSchema = {
    lastname: ""
}

const lastnameSlice = createSlice({
    initialState,
    name: "lastName",
    reducers: {
        setLastname: (state: any, action: PayloadAction) => {
            state.lastname = action.payload
        },
        resetLastname: (state) => {
            state.lastname = ""
        }
    }
})

export const { setLastname,resetLastname } = lastnameSlice.actions
export default lastnameSlice.reducer;