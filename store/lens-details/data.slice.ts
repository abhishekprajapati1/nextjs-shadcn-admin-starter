import { IDeleteRecord } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  lensDetailToDelete: IDeleteRecord | null;
  sort_by: string;
  search_term?: string;
  total: number;
};

const initialState: InitialState = {
  lensDetailToDelete: null,
  sort_by: "",
  search_term: "",
  total: 0,
};

const lensDetailSlice = createSlice({
  name: "lens-details/data",
  initialState,
  reducers: {
    setLensDetailToDelete: (
      state,
      { payload }: { payload: IDeleteRecord | null },
    ) => {
      state.lensDetailToDelete = payload;
    },
    setSortBy: (state, { payload }: { payload: string }) => {
      state.sort_by = payload;
    },
    setTotal: (state, { payload }: { payload: number }) => {
      state.total = payload;
    },
  },
});

export const { setLensDetailToDelete, setSortBy, setTotal } =
  lensDetailSlice.actions;
export default lensDetailSlice.reducer;
