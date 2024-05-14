import { createSlice } from '@reduxjs/toolkit';

import { fetchEnrollments, addEnrollment, getEnrollmentById, updateEnrollment, removeEnrollment } from '../thunks/enrollmentsThunks';

const enrollmentsSlice = createSlice({
    name: 'enrollments',
    initialState: {
      searchTerm: '',
      data: [],
      dataPerPage: 5,
      currentPage: 1,
      isLoading: false,
      error: null,
      enrollment: null
    },
    reducers: {
      changeEnrollmentsSearchTerm(state, action) {
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
    //Fetch-----------------------------------------------------------------------
    builder.addCase(fetchEnrollments.pending, (state, action) => {
        state.isLoading = true;
    });
    builder.addCase(fetchEnrollments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
    });
    builder.addCase(fetchEnrollments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
    });
    //Fetch by id------------------------------------------------------------
    builder.addCase(getEnrollmentById.pending, (state, action) => {
        state.isLoading = true;
    });
    builder.addCase(getEnrollmentById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.enrollment = action.payload;
    });
    builder.addCase(getEnrollmentById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
    });
    //Add-----------------------------------------------------------------------
    builder.addCase(addEnrollment.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addEnrollment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.push(action.payload);
    });
    builder.addCase(addEnrollment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
    });

    //Update-----------------------------------------------------------------------
    builder.addCase(updateEnrollment.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateEnrollment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.map(Enrollment => {
          
          if(Enrollment.id === action.payload.id){
            return {
              id: action.payload.id,
              institutionId: action.payload.institutionId,
              studentId: action.payload.studentId,
              enrollmentDate: action.payload.enrollmentDate,
              academicSessionId: action.payload.academicSessionId,
              academicClassId: action.payload.academicClassId,
              academicSessionName: action.payload.academicSessionName,
              academicClassName: action.payload.academicClassName,
              statusId: action.payload.statusId, 
              statusReasonId: action.payload.statusReasonId,
              studentIdNumber: action.payload.studentIdNumber,
              studentName: action.payload.studentName,
            }
          }
          return Enrollment;
        });

    });
    builder.addCase(updateEnrollment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
    });

    //Remove-----------------------------------------------------------------
    builder.addCase(removeEnrollment.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(removeEnrollment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = state.data.filter(enrollment => {
        return enrollment.id !== action.payload.id
      });
    });
    builder.addCase(removeEnrollment.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  }
});

export const EnrollmentsAction = enrollmentsSlice.actions;

export const enrollmentsReducer = enrollmentsSlice.reducer;