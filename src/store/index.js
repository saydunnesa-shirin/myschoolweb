import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { institutionsReducer, changeSearchTerm } from './slices/institutionsSlice';
import { countriesReducer } from './slices/countriesSlice';

import { institutionFormReducer, resetInstitutionForm, changeInstitutionName, setInstitutionUpdateForm } from './slices/institutionFormSlice';

export const store = configureStore({
    reducer: {
      institutions: institutionsReducer,
      institutionForm: institutionFormReducer,
      countries: countriesReducer
    },
});

setupListeners(store.dispatch);

export * from './thunks/institutionsThunks';
export *  from './thunks/countriesThunks'

export {
  //Institutions
  changeSearchTerm,
  resetInstitutionForm, 
  changeInstitutionName,
  setInstitutionUpdateForm,
  //Utilities
  // changeCountriesSearchTerm
};

