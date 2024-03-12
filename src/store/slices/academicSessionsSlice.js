import { createSlice } from '@reduxjs/toolkit';

import { fetchAcademicSessions, getById, addAcademicSession, updateAcademicSession, removeAcademicSession } from '../thunks/academicSessionsThunks';

const academicSessionsSlice = createSlice({
    name: 'academicSessions',
    initialState: {
      searchTerm: '',
      data: [],
      dataPerPage: 5,
      currentPage: 1,
      isLoading: false,
      error: null,
      academicSession: null
    },
    reducers: {
      changeAcademicSessionsSearchTerm(state, action) {
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
    builder.addCase(fetchAcademicSessions.pending, (state, action) => {
        state.isLoading = true;
    });
    builder.addCase(fetchAcademicSessions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
    });
    builder.addCase(fetchAcademicSessions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
    });
    //Fetch by id------------------------------------------------------------
    builder.addCase(getById.pending, (state, action) => {
        state.isLoading = true;
    });
    builder.addCase(getById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.academicSession = action.payload;
    });
    builder.addCase(getById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
    });
    //Add-----------------------------------------------------------------
    builder.addCase(addAcademicSession.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addAcademicSession.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.data.push(action.payload);
    });
    builder.addCase(addAcademicSession.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
    });
    //Update--------------------------------------------------------------
    builder.addCase(updateAcademicSession.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateAcademicSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.map(AcademicSession => {

          if(AcademicSession.id === action.payload.id){
            return {
              id:action.payload.id,
              name:action.payload.name,
              description:action.payload.description,
              startDate:action.payload.startDate,
              endDate:action.payload.endDate,
              institutionId:action.payload.institutionId
            }
          }
          return AcademicSession;
        });
    });
    builder.addCase(updateAcademicSession.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    //Remove----------------------------------------------------------
    builder.addCase(removeAcademicSession.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(removeAcademicSession.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = state.data.filter(AcademicSession => {
        return AcademicSession.id !== action.payload.id
      });
    });
    builder.addCase(removeAcademicSession.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  }
});

export const AcademicSessionsAction = academicSessionsSlice.actions;

export const academicSessionsReducer = academicSessionsSlice.reducer;