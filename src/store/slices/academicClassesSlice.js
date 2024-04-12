import { createSlice } from '@reduxjs/toolkit';

import { fetchAcademicClasses } from '../thunks/academicClassesThunks';

const academicClassesSlice = createSlice({
    name: 'academicClasses',
    initialState: {
      searchTerm: '',
      data: [],
      dataPerPage: 5,
      currentPage: 1,
      isLoading: false,
      error: null
    },
    reducers: {
      changeAcademicClassesSearchTerm(state, action) {
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
    //Fetch----------------------------------------------------------
    builder.addCase(fetchAcademicClasses.pending, (state, action) => {
        state.isLoading = true;
    });
    builder.addCase(fetchAcademicClasses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
    });
    builder.addCase(fetchAcademicClasses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
    });
  }
});

export const AcademicClassesAction = academicClassesSlice.actions;

export const academicClassesReducer = academicClassesSlice.reducer;