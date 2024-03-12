import { createSlice } from '@reduxjs/toolkit';

import { fetchAcademicSessionTemplates, addAcademicSessionTemplate, updateAcademicSessionTemplate, removeAcademicSessionTemplate } from '../thunks/academicSessionTemplatesThunks';

const academicSessionTemplatesSlice = createSlice({
    name: 'academicSessionTemplates',
    initialState: {
      searchTerm: '',
      data: [],
      dataPerPage: 5,
      currentPage: 1,
      isLoading: false,
      error: null,
    },
    reducers: {
      changeAcademicSessionTemplatesSearchTerm(state, action) {
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
    builder.addCase(fetchAcademicSessionTemplates.pending, (state, action) => {
        state.isLoading = true;
    });
    builder.addCase(fetchAcademicSessionTemplates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
    });
    builder.addCase(fetchAcademicSessionTemplates.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
    });
    //Add
    builder.addCase(addAcademicSessionTemplate.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addAcademicSessionTemplate.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.data.push(action.payload);
    });
    builder.addCase(addAcademicSessionTemplate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
    });
    //Update
    builder.addCase(updateAcademicSessionTemplate.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateAcademicSessionTemplate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.map(AcademicSessionTemplate => {

          if(AcademicSessionTemplate.id === action.payload.id){
            return {
              id:action.payload.id,
              templateName:action.payload.templateName,
              institutionId:action.payload.institutionId
            }
          }
          return AcademicSessionTemplate;
        });
    });
    builder.addCase(updateAcademicSessionTemplate.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    //Remove
    builder.addCase(removeAcademicSessionTemplate.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(removeAcademicSessionTemplate.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = state.data.filter(AcademicSessionTemplate => {
        return AcademicSessionTemplate.id !== action.payload.id
      });
    });
    builder.addCase(removeAcademicSessionTemplate.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  }
});

export const AcademicSessionTemplatesAction = academicSessionTemplatesSlice.actions;

export const academicSessionTemplatesReducer = academicSessionTemplatesSlice.reducer;