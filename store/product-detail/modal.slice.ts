import { createSlice } from "@reduxjs/toolkit";

// Define the type for the initial state
type InitialState = {
    edit_modal: boolean;
    
};

// Define the initial state
const initialState: InitialState = {
    edit_modal: false,
    
};

// Create the modal slice
const modalSlice = createSlice({
    name: "product-detail/modal",
    initialState,
    reducers: {
        showEditProductDeatail: (state, { payload }: { payload: boolean }) => {
            state.edit_modal = payload;  // Correct the payload typo
        }
    }
});

// Export the actions
export const { showEditProductDeatail } = modalSlice.actions;
// Export the reducer
export default modalSlice.reducer;
