import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { institutionsReducer } from './slices/institutionsSlice';
import { countriesReducer } from './slices/countriesSlice';
import { employeesReducer } from './slices/employeesSlice';


export const store = configureStore({
    reducer: {
      institutions: institutionsReducer,
      countries: countriesReducer,
      employees: employeesReducer
    },
});

setupListeners(store.dispatch);

export * from './thunks/institutionsThunks';
export *  from './thunks/countriesThunks';
export *  from './thunks/employeesThunks';
