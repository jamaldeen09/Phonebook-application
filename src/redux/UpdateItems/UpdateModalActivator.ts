import { createSlice } from '@reduxjs/toolkit';

interface UpdateModalSchema {
    updModal: boolean
}

const initialState: UpdateModalSchema = {
    updModal: false
}

const updModalSlice = createSlice({
    initialState,
    name: "updateModal",
    reducers: {
        activateUpdModal: (state) => {
            state.updModal = true
        },
        deactivateUpdModal: (state) => {
            state.updModal = false
        }
    }
})

export const { activateUpdModal,deactivateUpdModal } = updModalSlice.actions
export default updModalSlice.reducer;