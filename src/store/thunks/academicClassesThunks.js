import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {baseURL} from '../../helpers/constants';

const fetchAcademicClasses = createAsyncThunk('academicClasses/fetch', async(query) =>{

    console.log(query.institutionId)
    const  response = await axios.post(`${baseURL}/academicClasses/query`, {
        academicSessionId: query.academicSessionId,
        institutionId: query.institutionId,
        isActive: true
    }); 

    return response.data;
});

export { fetchAcademicClasses };