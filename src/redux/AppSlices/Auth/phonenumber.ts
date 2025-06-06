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
        }
    }
}) 

export const { setPhoneNum } = phoneNumSlice.actions
export default phoneNumSlice.reducer;