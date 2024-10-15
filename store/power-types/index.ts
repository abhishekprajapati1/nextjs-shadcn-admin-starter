import { combineReducers } from "@reduxjs/toolkit";
import modalStore from './modal.slice';



const powerTypeStore = combineReducers({
    modalStore,
});

export default powerTypeStore;