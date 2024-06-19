import { IFormOption } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
    showForm: boolean,
    dataToEdit: IFormOption | null,
}

const initialState: InitialState = {
    showForm: false,
    dataToEdit: null
}
const injuryTypeSlice = createSlice({
    name: "injury-types",
    initialState,
    reducers: {
        setShowForm: (state, { payload }: { payload: boolean }) => {
            state.showForm = payload;
        },
        setDataToEdit: (state, { payload }: { payload: IFormOption | null }) => {
            state.dataToEdit = payload;
        }
    }
});

export const { setDataToEdit, setShowForm } = injuryTypeSlice.actions;
export default injuryTypeSlice.reducer;