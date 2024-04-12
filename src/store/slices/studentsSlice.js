import { createSlice } from '@reduxjs/toolkit';

import { fetchStudents, addStudent, getStudentById, updateStudent, removeStudent } from '../thunks/studentsThunks';

const studentsSlice = createSlice({
    name: 'students',
    initialState: {
      searchTerm: '',
      data: [],
      dataPerPage: 5,
      currentPage: 1,
      isLoading: false,
      error: null,
      student: null
    },
    reducers: {
      changeStudentsSearchTerm(state, action) {
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
    builder.addCase(fetchStudents.pending, (state, action) => {
        state.isLoading = true;
    });
    builder.addCase(fetchStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
    });
    builder.addCase(fetchStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
    });
    //Fetch by id------------------------------------------------------------
    builder.addCase(getStudentById.pending, (state, action) => {
        state.isLoading = true;
    });
    builder.addCase(getStudentById.fulfilled, (state, action) => {
      
        state.isLoading = false;
        state.student = action.payload;
    });
    builder.addCase(getStudentById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
    });
    //Add-----------------------------------------------------------------------
    builder.addCase(addStudent.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.push(action.payload);
    });
    builder.addCase(addStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
    });

    //Update-----------------------------------------------------------------------
    builder.addCase(updateStudent.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.map(Student => {

          if(Student.id === action.payload.id){
            return {
              id: action.payload.id,
              studentId: action.payload.studentId,
              institutionId: action.payload.institutionId,
              admissionDate: action.payload.admissionDate,
              statusId: action.payload.statusId, 
              activeSessionId: action.payload.activeSessionId,
              activeClassId: action.payload.activeClassId,

              activeSessionName: action.payload.activeSessionName,
              activeClassName: action.payload.activeClassName,

              firstName: action.payload.firstName,
              lastName: action.payload.lastName,
              email: action.payload.email,
              mobile: action.payload.mobile,

              dateOfBirth: action.payload.dateOfBirth,
              fatherName: action.payload.fatherName,
              motherName: action.payload.motherName,
              genderId: action.payload.genderId,
              bloodGroupId: action.payload.bloodGroupId,
              countryId: action.payload.countryId,
              street: action.payload.street,
              city: action.payload.city,
              state: action.payload.state,
              postalCode: action.payload.postalCode,
              countryName: action.payload.countryName
            }
          }
          return Student;
        });

    });
    builder.addCase(updateStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
    });

    //Remove-----------------------------------------------------------------
    builder.addCase(removeStudent.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(removeStudent.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action.payload.id);
      state.data = state.data.filter(student => {
        return student.id !== action.payload.id
      });
    });
    builder.addCase(removeStudent.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  }
});

export const StudentsAction = studentsSlice.actions;

export const studentsReducer = studentsSlice.reducer;