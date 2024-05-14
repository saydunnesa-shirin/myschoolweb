import { createSlice } from '@reduxjs/toolkit';

import { fetchGenders, fetchBloodGroups, fetchDesignations, fetchEmployeeTypes, fetchStudentStatus, fetchStudentStatusReasons } from '../thunks/settingsThunks';

const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
      genders: [],
      bloodGroups: [],
      designations: [],
      employeeTypes: [],
      studentStatus: [],
      studentStatusReasons: [],
      isLoading: false,
      error: null
    },
    reducers: {
    },
    extraReducers(builder){
    //Fetch Genders-----------------------------------------------------------------------
    builder.addCase(fetchGenders.pending, (state, action) => {
        state.isLoading = true;
    });
    builder.addCase(fetchGenders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.genders = action.payload;
    });
    builder.addCase(fetchGenders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
    });

    //Fetch Blood Groups-----------------------------------------------------------------------
    builder.addCase(fetchBloodGroups.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBloodGroups.fulfilled, (state, action) => {
      
      state.isLoading = false;
      state.bloodGroups = action.payload;
    });
    builder.addCase(fetchBloodGroups.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

   //Fetch designations-----------------------------------------------------------------------
    builder.addCase(fetchDesignations.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchDesignations.fulfilled, (state, action) => {
      
        state.isLoading = false;
        state.designations = action.payload;
    });
    builder.addCase(fetchDesignations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
    });


    //Fetch employee types-----------------------------------------------------------------------
    builder.addCase(fetchEmployeeTypes.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchEmployeeTypes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.employeeTypes = action.payload;
    });
    builder.addCase(fetchEmployeeTypes.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    //Fetch StudentStatus-----------------------------------------------------------------------
    builder.addCase(fetchStudentStatus.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchStudentStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.studentStatus = action.payload;
    });
    builder.addCase(fetchStudentStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
    });

    //Fetch StudentStatusReasons-----------------------------------------------------------------------
    builder.addCase(fetchStudentStatusReasons.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchStudentStatusReasons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.studentStatusReasons = action.payload;
    });
    builder.addCase(fetchStudentStatusReasons.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
    });
  }
});

export const EmployeesAction = settingsSlice.actions;

export const settingsReducer = settingsSlice.reducer;