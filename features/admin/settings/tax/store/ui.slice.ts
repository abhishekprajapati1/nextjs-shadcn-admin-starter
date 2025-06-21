import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type InitialState = {
  dialog: boolean;
};
const initialState: InitialState = {
  dialog: false,
};
const taxSlice = createSlice({
  name: "setting/tax",
  initialState,
  reducers: {
    setDialog: (state, action: PayloadAction<boolean>) => {
      state.dialog = action.payload;
    },
  },
});

export const { setDialog } = taxSlice.actions;
export default taxSlice.reducer;
