import { createSlice } from '@reduxjs/toolkit';

import { fetchInstitutions, addInstitution, updateInstitution, removeInstitution } from '../thunks/institutionsThunks';

const institutionsSlice = createSlice({
    name: 'institutions',
    initialState: {
      searchTerm: '',
      data: [],
      isLoading: false,
      error: null,
    },
    reducers: {
      changeSearchTerm(state, action) {
        state.searchTerm = action.payload;
      }
    },
    extraReducers(builder){
    //Fetch
    builder.addCase(fetchInstitutions.pending, (state, action) => {
        state.isLoading = true;
    });
    builder.addCase(fetchInstitutions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
    });
    builder.addCase(fetchInstitutions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
    });
    //Add
    builder.addCase(addInstitution.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addInstitution.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.push(action.payload);
    });
    builder.addCase(addInstitution.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
    });

    //Update
    builder.addCase(updateInstitution.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateInstitution.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.map(institution => {

          if(institution.id === action.payload.id){
            return {
              id: action.payload.id,
              name: action.payload.name}
          }
          return institution;
        });

    });
    builder.addCase(updateInstitution.rejected, (state, action) => {
              state.isLoading = false;
              state.error = action.error;
    });

    //Remove
    builder.addCase(removeInstitution.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(removeInstitution.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = state.data.filter(institution => {
        return institution.id !== action.payload.id
      });
    });
    builder.addCase(removeInstitution.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  }
});

export const { changeSearchTerm } = institutionsSlice.actions;

export const institutionsReducer = institutionsSlice.reducer;