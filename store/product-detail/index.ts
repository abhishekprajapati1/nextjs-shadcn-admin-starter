import { combineReducers } from "@reduxjs/toolkit";
import modalStore from './modal.slice';



const ProductDetailStore = combineReducers({
    modalStore,
});

export default ProductDetailStore;