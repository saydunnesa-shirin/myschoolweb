import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchEmployees = createAsyncThunk('employees/fetch', async() =>{
    const  response = await axios.get('http://localhost:3006/employees');
    await pause(1000);
    return response.data;
});

const addEmployee = createAsyncThunk('employees/add',  async (employee) => {

    const response = await axios.post(`http://localhost:3006/employees`, employee);
    await pause(3000);
    return response.data;

    // // "institutionId": 0,
    // //   "firstName": "string",
    // //   "lastName": "string",
    // //   "title": "string",
    // //   "dateOfBirth": "2024-01-23T10:47:21.473Z",
    // //   "gender": 0,
    // //   "joinDate": "2024-01-23T10:47:21.473Z",
    // //   "mobile": "string",
    // //   "email": "string",
    // //   "employeeType": 0,
    // //   "designation": "PRINCIPAL",
    // //   "bloodGroup": 0,
    // //   "employeeId": "string"
   
});

const updateEmployee = createAsyncThunk('employees/update', async (employee) => {

  const response = await axios.put(`http://localhost:3006/employees/${employee.id}`, employee);
  await pause(3000);
  return response.data;
});

const removeEmployee = createAsyncThunk('employees/remove', async (employee) => {
    const response = await axios.delete(`http://localhost:3006/employees/${employee.id}`);
    await pause(3000);

    return employee;
});

const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
};

export { fetchEmployees, addEmployee, updateEmployee, removeEmployee };