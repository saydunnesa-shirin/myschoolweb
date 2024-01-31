import { createSlice } from '@reduxjs/toolkit';

import { fetchEmployees, addEmployee, updateEmployee, removeEmployee } from '../thunks/employeesThunks';

const employeesSlice = createSlice({
    name: 'employees',
    initialState: {
      searchTerm: '',
      data: [],
      dataPerPage: 5,
      currentPage: 1,
      isLoading: false,
      error: null,
    },
    reducers: {
      changeEmployeesSearchTerm(state, action) {
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
    builder.addCase(fetchEmployees.pending, (state, action) => {
        state.isLoading = true;
    });
    builder.addCase(fetchEmployees.fulfilled, (state, action) => {
      
        state.isLoading = false;
        state.data = action.payload;
    });
    builder.addCase(fetchEmployees.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
    });
    //Add
    builder.addCase(addEmployee.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.data.push(action.payload);
    });
    builder.addCase(addEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
    });

    //Update
    builder.addCase(updateEmployee.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.map(Employee => {

          if(Employee.id === action.payload.id){
            return {
              id: action.payload.id,
              firstName: action.payload.firstName,
              lastName: action.payload.lastName,
              institutionId: action.payload.institutionId
            }
          }
          return Employee;
        });

    });
    builder.addCase(updateEmployee.rejected, (state, action) => {
              state.isLoading = false;
              state.error = action.error;
    });

    //Remove
    builder.addCase(removeEmployee.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(removeEmployee.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = state.data.filter(Employee => {
        return Employee.id !== action.payload.id
      });
    });
    builder.addCase(removeEmployee.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  }
});


export const EmployeesAction = employeesSlice.actions;

export const employeesReducer = employeesSlice.reducer;