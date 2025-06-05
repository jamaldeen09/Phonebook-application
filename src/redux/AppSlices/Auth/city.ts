import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CitySchema {
    city: any
}

const initialState: CitySchema = {
    city: ""
}

const citySlice = createSlice({
    initialState,
    name: "usercity",
    reducers: {
        setCity: (state: any, action: PayloadAction) => {
            state.city = action.payload
        },
        resetCity: (state) => {
            state.city = ""
        }
    }
})

export const { setCity,resetCity } = citySlice.actions
export default citySlice.reducer;