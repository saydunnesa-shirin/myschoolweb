import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { academicSessionTemplatesReducer } from './slices/academicSessionTemplatesSlice';
import { academicSessionsReducer } from './slices/academicSessionsSlice';
import { academicClassesReducer } from './slices/academicClassesSlice';

import { countriesReducer } from './slices/countriesSlice';
import { employeesReducer } from './slices/employeesSlice';
import { studentsReducer } from './slices/studentsSlice';
import { enrollmentsReducer } from './slices/enrollmentsSlice';

import { institutionsReducer } from './slices/institutionsSlice';
import { settingsReducer } from './slices/settingsSlice';

export const store = configureStore({
    reducer: {
      academicSessionTemplates: academicSessionTemplatesReducer,
      academicSessions: academicSessionsReducer,
      academicClasses: academicClassesReducer,
      countries: countriesReducer,
      employees: employeesReducer,
      students: studentsReducer,
      institutions: institutionsReducer,
      settings: settingsReducer,
      enrollments: enrollmentsReducer
    },
});

setupListeners(store.dispatch);

export * from './thunks/academicSessionTemplatesThunks';
export * from './thunks/academicSessionsThunks';
export * from './thunks/academicClassesThunks';

export * from './thunks/countriesThunks';
export * from './thunks/employeesThunks';
export * from './thunks/studentsThunks';

export * from './thunks/institutionsThunks';
export * from './thunks/settingsThunks';
export * from './thunks/enrollmentsThunks';

