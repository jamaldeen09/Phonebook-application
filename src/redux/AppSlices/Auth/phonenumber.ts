import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

interface phoneNumber {
    phoneNum: any
} 

const initialState: phoneNumber = {
    phoneNum: ""
}

const phoneNumSlice = createSlice({
    initialState,
    name: "Phonenumber",
    reducers: {
        setPhoneNum: (state, action: PayloadAction) => {
            state.phoneNum = action.payload
        },
        resetPhoneNum: (state, action: PayloadAction) => {
            state.phoneNum = ""
        }
    }
}) 

export const { setPhoneNum,resetPhoneNum } = phoneNumSlice.actions
export default phoneNumSlice.reducer;