import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {baseURL} from '../../constants';

const fetchEmployees = createAsyncThunk('employees/fetch', async() =>{
    const  response = await axios.post(`${baseURL}/employees/query`, {});
    await pause(1000);
    return response.data;
});

const addEmployee = createAsyncThunk('employees/add',  async (employee) => {

    const response = await axios.post(`${baseURL}/employees`, {
            id: employee.id,
            employeeId: employee.employeeId,
            institutionId: employee.institutionId,
            joinDate: employee.joinDate,
            designationId: employee.designationId,
            employeeTypeId: employee.employeeTypeId,

            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            mobile: employee.mobile,

            dateOfBirth: employee.dateOfBirth,
            fatherName: employee.fatherName,
            motherName: employee.motherName,
            genderId: employee.genderId,
            bloodGroupId: employee.bloodGroupId,
            countryId: employee.countryId,
            street: employee.street,
            city: employee.city,
            state: employee.state,
            postalCode: employee.postalCode
    });
    await pause(3000);
    return response.data;
});

const getEmployeeById = createAsyncThunk('employees/getById', async (id) => {
    const response = await axios.get(`${baseURL}/employees?id=${id}`);
    return response.data;
});

const updateEmployee = createAsyncThunk('employees/update', async (employee) => {
    const response = await axios.put(`${baseURL}/employees`, {
            id: employee.id,
            employeeId: employee.employeeId,
            institutionId: employee.institutionId,
            joinDate: employee.joinDate,
            designationId: employee.designationId,
            employeeTypeId: employee.employeeTypeId,

            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            mobile: employee.mobile,

            dateOfBirth: employee.dateOfBirth,
            fatherName: employee.fatherName,
            motherName: employee.motherName,
            genderId: employee.genderId,
            bloodGroupId: employee.bloodGroupId,
            countryId: employee.countryId,
            street: employee.street,
            city: employee.city,
            state: employee.state,
            postalCode: employee.postalCode
    });
    await pause(3000);
    return response.data;
});

const removeEmployee = createAsyncThunk('employees/remove', async (employee) => {
    const response = await axios.delete(`${baseURL}/employees`, { 
        data: { 
            id: employee.id 
        } 
    });
    await pause(3000);

    return employee;
});

const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
};

export { fetchEmployees, addEmployee, getEmployeeById, updateEmployee, removeEmployee };