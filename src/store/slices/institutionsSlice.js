import { createSlice } from '@reduxjs/toolkit';

import { fetchInstitutions, addInstitution, updateInstitution, removeInstitution } from '../thunks/institutionsThunks';

const institutionsSlice = createSlice({
    name: 'institutions',
    initialState: {
      searchTerm: '',
      data: [],
      dataPerPage: 5,
      currentPage: 1,
      isLoading: false,
      error: null,
    },
    reducers: {
      changeInstitutionsSearchTerm(state, action) {
        state.searchTerm = action.payload;
        if(state.searchTerm.length !== 0)
          state.currentPage = 1;
      },
      onNavigateNext: (state) => {
        state.currentPage++;
      },
      onNavigatePrev: (state) => {
        state.currentPage--;
      },
      onChangeTodosPerpage: (state, action) => {
        state.dataPerPage = action.payload;
      },
      onClickCurrentPage: (state, action) => {
        state.currentPage = action.payload;
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
        console.log(action.payload);
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
        state.data = state.data.map(Institution => {

          if(Institution.id === action.payload.id){
            return {
              id: action.payload.id,
              name: action.payload.name}
          }
          return Institution;
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
      state.data = state.data.filter(Institution => {
        return Institution.id !== action.payload.id
      });
    });
    builder.addCase(removeInstitution.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  }
});


export const InstitutionsAction = institutionsSlice.actions;

export const institutionsReducer = institutionsSlice.reducer;