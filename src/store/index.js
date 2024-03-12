import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { academicSessionTemplatesReducer } from './slices/academicSessionTemplatesSlice';
import { academicSessionsReducer } from './slices/academicSessionsSlice';

import { countriesReducer } from './slices/countriesSlice';
import { employeesReducer } from './slices/employeesSlice';
import { institutionsReducer } from './slices/institutionsSlice';
import { settingsReducer } from './slices/settingsSlice';

export const store = configureStore({
    reducer: {
      academicSessionTemplates: academicSessionTemplatesReducer,
      academicSessions: academicSessionsReducer,
      countries: countriesReducer,
      employees: employeesReducer,
      institutions: institutionsReducer,
      settings: settingsReducer
    },
});

setupListeners(store.dispatch);

export * from './thunks/academicSessionTemplatesThunks';
export * from './thunks/academicSessionsThunks';

export *  from './thunks/countriesThunks';
export *  from './thunks/employeesThunks';
export * from './thunks/institutionsThunks';
export * from './thunks/settingsThunks';
