import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

interface URLSchema {
    imgUrl: any
}

const initialState: URLSchema = {
    imgUrl: ""
}

const imgUrlSlice = createSlice({
    initialState,
    name: "url",
    reducers: {
        setUrl: (state: any , action: PayloadAction) => {
            state.imgUrl = action.payload
        }
    }
})

export const { setUrl } = imgUrlSlice.actions;
export default imgUrlSlice.reducer;