import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {baseURL} from '../../constants';

const fetchEmployees = createAsyncThunk('employees/fetch', async() =>{
    const  response = await axios.get(`${baseURL}/employees`);
    await pause(1000);
    return response.data;
});

const addEmployee = createAsyncThunk('employees/add',  async (employee) => {

    const response = await axios.post(`${baseURL}/employees`, employee);
    await pause(3000);
    return response.data;
});

const getEmployeeById = createAsyncThunk('employees/getById', async (id) => {
    const response = await axios.get(`${baseURL}/employees?id=${id}`);
    return response.data;
});

const updateEmployee = createAsyncThunk('employees/update', async (employee) => {
    const response = await axios.put(`${baseURL}/employees/${employee.id}`, employee);
    await pause(3000);
    return response.data;
});

const removeEmployee = createAsyncThunk('employees/remove', async (employee) => {
    const response = await axios.delete(`${baseURL}/employees/${employee.id}`);
    await pause(3000);

    return employee;
});

const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
};

export { fetchEmployees, addEmployee, getEmployeeById, updateEmployee, removeEmployee };