import { combineReducers } from "@reduxjs/toolkit";
import modalStore from './modal.slice';



const PlaceOrderStore = combineReducers({
    modalStore,
});

export default PlaceOrderStore;