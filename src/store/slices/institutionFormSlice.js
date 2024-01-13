import { createSlice } from '@reduxjs/toolkit';

const institutionFormSlice = createSlice({
    name: 'institutionForm',
    initialState: {
      id: 0,
      name: "",
    },
    reducers: {
      resetInstitutionForm(state, action) {
        state.name = "";
      },
      changeInstitutionName(state, action){
        state.name = action.payload;
      },
      setInstitutionUpdateForm(state, action) {
        state.id = action.payload.id;
        state.name = action.payload.name;
      },
    }
});

export const { resetInstitutionForm, changeInstitutionName, setInstitutionUpdateForm } = institutionFormSlice.actions;

export const institutionFormReducer = institutionFormSlice.reducer;