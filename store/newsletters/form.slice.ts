import { INewsletter } from "@/components/newsletters/ListItem";
import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  item_id: string; // used to edit the item.
  data: Partial<INewsletter> | null;
};

const initialState: InitialState = {
  data: null,
  item_id: "",
};

const formSlice = createSlice({
  name: "newsletters/form",
  initialState,
  reducers: {
    setData: (state, { payload }: { payload: Partial<INewsletter> | null }) => {
      state.data = payload;
    },
    setItemId: (state, { payload }: { payload: string }) => {
      state.item_id = payload;
    },
    resetStore: () => {
      return initialState;
    },
  },
});

export const { setData, setItemId, resetStore } = formSlice.actions;
export default formSlice.reducer;
