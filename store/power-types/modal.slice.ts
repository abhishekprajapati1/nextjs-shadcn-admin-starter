import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
 
  delete_modal: boolean;
  add_modal: boolean;
  edit_modal:boolean;
  
};

const initialState: InitialState = {

  delete_modal: false,
  add_modal: false,
  edit_modal:false,

};

const modalSlice = createSlice({
  name: "power-types/modal",
  initialState,
  reducers: {
    showEditModal: (state, { payload }: { payload: boolean }) => {
      state.edit_modal = payload; 
    },
    showDeleteModal: (state, { payload }: { payload: boolean }) => {
      state.delete_modal = payload;
    },
    showAddModal: (state, { payload }: { payload: boolean }) => {
      state.add_modal = payload;
    },
    
  },
});

export const { showEditModal, showDeleteModal, showAddModal } = modalSlice.actions;
export default modalSlice.reducer; 