import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  sort_by: string;
  search_term?: string;
  total: number;
};

const initialState: InitialState = {
  sort_by: "",
  search_term: "",
  total: 0,
};

const productResultSlice = createSlice({
  name: "product/result",
  initialState,
  reducers: {
    setSortBy: (state, { payload }: { payload: string }) => {
      state.sort_by = payload;
    },
    setTotal: (state, { payload }: { payload: number }) => {
      state.total = payload;
    },
  },
});

export const { setSortBy, setTotal } = productResultSlice.actions;
export default productResultSlice.reducer;
