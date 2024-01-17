import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { institutionsReducer } from './slices/institutionsSlice';
import { countriesReducer } from './slices/countriesSlice';

export const store = configureStore({
    reducer: {
      institutions: institutionsReducer,
      countries: countriesReducer
    },
});

setupListeners(store.dispatch);

export * from './thunks/institutionsThunks';
export *  from './thunks/countriesThunks';