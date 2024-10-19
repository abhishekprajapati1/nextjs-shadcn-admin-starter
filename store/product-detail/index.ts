import { combineReducers } from "@reduxjs/toolkit";
import modalStore from './modal.slice';



const productDetailStore = combineReducers({
    modalStore,
});

export default productDetailStore;