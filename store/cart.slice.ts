import { IDeleteRecord } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  itemToDelete: IDeleteRecord | null;
  search_term?: string;
  total: number;
};

const initialState: InitialState = {
  itemToDelete: null,
  search_term: "",
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItemToDelete: (
      state,
      { payload }: { payload: IDeleteRecord | null },
    ) => {
      state.itemToDelete = payload;
    },
    setTotal: (state, { payload }: { payload: number }) => {
      state.total = payload;
    },
  },
});

export const { setItemToDelete, setTotal } = cartSlice.actions;
export default cartSlice.reducer;
