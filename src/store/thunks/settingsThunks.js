import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {baseURL} from '../../helpers/constants';

const fetchGenders = createAsyncThunk('genders/fetch', async() =>{
    const  response = await axios.get(`${baseURL}/types/genders`);
    await pause(1000);
    return response.data;
});

const fetchEmployeeTypes = createAsyncThunk('employeeTypes/fetch', async() =>{
    const  response = await axios.get(`${baseURL}/types/employeeTypes`);
    return response.data;
});

const fetchDesignations = createAsyncThunk('designations/fetch', async() =>{
    const  response = await axios.get(`${baseURL}/types/designations`);
    return response.data;
});

const fetchBloodGroups = createAsyncThunk('bloodGroups/fetch', async() =>{
    const  response = await axios.get(`${baseURL}/types/bloodGroups`);
    return response.data;
});

const fetchStudentStatus = createAsyncThunk('studentStatus/fetch', async() =>{
    const  response = await axios.get(`${baseURL}/types/studentStatus`);
    return response.data;
});

const fetchStudentStatusReasons = createAsyncThunk('studentStatusReasons/fetch', async() =>{
    const  response = await axios.get(`${baseURL}/types/studentStatusReasons`);
    return response.data;
});

const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
};

export { fetchGenders, fetchEmployeeTypes, fetchDesignations, fetchBloodGroups, fetchStudentStatus, fetchStudentStatusReasons };