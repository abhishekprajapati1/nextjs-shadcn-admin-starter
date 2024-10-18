import { ILensFeature } from "@/components/lens-features/LensFeature";
import { IDefaultUrl } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  lens_detail_id: string;
  modal: boolean;
  data: Partial<ILensFeature & IDefaultUrl> | null;
};

const initialState: InitialState = {
  data: null,
  modal: false,
  lens_detail_id: "",
};

const LensDetailFormSlice = createSlice({
  name: "lens-detail/form",
  initialState,
  reducers: {
    setData: (
      state,
      { payload }: { payload: Partial<ILensFeature & IDefaultUrl> },
    ) => {
      state.data = payload;
    },
    setLensFeatureId: (state, { payload }: { payload: string }) => {
      state.lens_detail_id = payload;
    },
    showModal: (state, { payload }: { payload: boolean }) => {
      state.modal = payload;
    },
    resetStore: () => {
      return initialState;
    },
  },
});

export const { setData, setLensDetailId, showModal, resetStore } =
LensDetailFormSlice.actions;
export default LensDetailFormSlice.reducer;