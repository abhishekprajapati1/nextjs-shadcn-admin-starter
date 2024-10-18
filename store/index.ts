import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import userStore from './slices/users.slice';
import typeStore from './slices/types.slice';
import powerTypeStore from './power-types';
import PlaceOrderStore from './placed-order';
import ProductDetailStore from './product-detail';
import lensFeatureStore from './lens-features';

const store = configureStore({
    reducer: {
        userStore, typeStore,
        lensFeatureStore,
        powerTypeStore,
        PlaceOrderStore,
        ProductDetailStore
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;