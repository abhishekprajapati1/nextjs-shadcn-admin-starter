import { combineReducers } from "@reduxjs/toolkit";
import modalStore from './modal.slice';



const lenseFeatureStore = combineReducers({
    modalStore,
});

export default lenseFeatureStore;