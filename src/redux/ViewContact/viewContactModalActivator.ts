import { createSlice } from "@reduxjs/toolkit";

interface ViewModalSchema {
    viewModal: boolean
}

const initialState: ViewModalSchema = {
    viewModal: false
}

const viewModalSlice = createSlice({
    initialState,
    name: "viewContact",
    reducers: {
        activateContactViewer: (state) => {
            state.viewModal = true
        },
        deactivateContactViewer: (state) => {
            state.viewModal = false
        }
    }
})

export const { activateContactViewer,deactivateContactViewer } = viewModalSlice.actions;
export default viewModalSlice.reducer; 