import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import userStore from './slices/users.slice';
import typeStore from './slices/types.slice';
import lenseFeatureStore from './lense-feature';

const store = configureStore({
    reducer: {
        userStore, typeStore,
        lenseFeatureStore
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;