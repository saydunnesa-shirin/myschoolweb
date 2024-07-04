import { createSlice } from '@reduxjs/toolkit';

import { fetchAcademicClassTemplates, addAcademicClassTemplate, updateAcademicClassTemplate, removeAcademicClassTemplate } from '../thunks/academicClassTemplatesThunks';

const academicClassTemplatesSlice = createSlice({
    name: 'academicClassTemplates',
    initialState: {
      searchTerm: '',
      data: [],
      dataPerPage: 5,
      currentPage: 1,
      isLoading: false,
      error: null,
    },
    reducers: {
      changeAcademicClassTemplatesSearchTerm(state, action) {
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
    builder.addCase(fetchAcademicClassTemplates.pending, (state, action) => {
        state.isLoading = true;
    });
    builder.addCase(fetchAcademicClassTemplates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
    });
    builder.addCase(fetchAcademicClassTemplates.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
    });
    //Add
    builder.addCase(addAcademicClassTemplate.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addAcademicClassTemplate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.push(action.payload);
    });
    builder.addCase(addAcademicClassTemplate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
    });
    //Update
    builder.addCase(updateAcademicClassTemplate.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateAcademicClassTemplate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.map(AcademicClassTemplate => {

          if(AcademicClassTemplate.id === action.payload.id){
            return {
              id:action.payload.id,
              templateName:action.payload.templateName,
              institutionId:action.payload.institutionId,
              serialNo:action.payload.serialNo
            }
          }
          return AcademicClassTemplate;
        });
    });
    builder.addCase(updateAcademicClassTemplate.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    //Remove
    builder.addCase(removeAcademicClassTemplate.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(removeAcademicClassTemplate.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = state.data.filter(AcademicClassTemplate => {
        return AcademicClassTemplate.id !== action.payload.id
      });
    });
    builder.addCase(removeAcademicClassTemplate.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  }
});

export const AcademicClassTemplatesAction = academicClassTemplatesSlice.actions;

export const academicClassTemplatesReducer = academicClassTemplatesSlice.reducer;