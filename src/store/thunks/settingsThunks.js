import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {baseURL} from '../../constants';

const fetchGenders = createAsyncThunk('genders/fetch', async() =>{
    const  response = await axios.get(`${baseURL}/genders`);
    await pause(1000);
    return response.data;
});

const fetchEmployeeTypes = createAsyncThunk('employeeTypes/fetch', async() =>{
    const  response = await axios.get(`${baseURL}/employeeTypes`);
    return response.data;
});

const fetchDesignations = createAsyncThunk('designations/fetch', async() =>{
    const  response = await axios.get(`${baseURL}/designations`);
    return response.data;
});

const fetchBloodGroups = createAsyncThunk('bloodGroups/fetch', async() =>{
    const  response = await axios.get(`${baseURL}/bloodGroups`);
    return response.data;
});

const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
};

export { fetchGenders, fetchEmployeeTypes, fetchDesignations, fetchBloodGroups };