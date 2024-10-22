import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import userStore from "./slices/users.slice";
import typeStore from "./slices/types.slice";
import powerTypeStore from "./power-types";
import placeOrderStore from "./placed-order";
import productDetailStore from "./product-detail";
import lensFeatureStore from "./lens-features";
import lensDetailStore from "./lens-details";
import frameMaterialStore from "./frame-materials";
import brandStore from "./brands";

const store = configureStore({
  reducer: {
    userStore,
    typeStore,
    lensFeatureStore,
    lensDetailStore,
    powerTypeStore,
    placeOrderStore,
    productDetailStore,
    frameMaterialStore,
    brandStore
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
