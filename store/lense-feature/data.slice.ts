import { IDeleteRecord } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  LensFeatureToDelete: IDeleteRecord | null;
  sort_by: string;
  search_term?: string;
  total: number;
};

const initialState: InitialState = {
  LensFeatureToDelete: null,
  sort_by: "",
  search_term: "",
  total: 0,
};

const LensFeatureSlice = createSlice({
  name: "customer/data",
  initialState,
  reducers: {
    setLensFeatureToDelete: (state, { payload }: { payload: IDeleteRecord | null }) => {
      state.LensFeatureToDelete = payload;
    },
    setSortBy: (state, { payload }: { payload: string }) => {
      state.sort_by = payload;
    },
    setTotal: (state, { payload }: { payload: number }) => {
      state.total = payload;
    },
  },
});

export const { setLensFeatureToDelete, setSortBy, setTotal } = LensFeatureSlice.actions;
export default LensFeatureSlice.reducer;