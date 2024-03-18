import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {baseURL} from '../../helpers/constants';

const fetchAcademicSessions = createAsyncThunk('academicSessions/fetch', async(query) =>{
    await pause(1000);
    const  response = await axios.post(`${baseURL}/academicSessions/query`, {
        institutionId: query.institutionId,
        isActive: true
    }); 

    return response.data;
});

const getById = createAsyncThunk('academicSessions/getById', async (id) => {
    const response = await axios.get(`${baseURL}/academicSessions/${id}`);
    return response.data;
});

const addAcademicSession = createAsyncThunk('academicSessions/add',  async (academicSession) => {
    
    const response = await axios.post(`${baseURL}/academicSessions/create`, {
        name:academicSession.name,
        description:academicSession.description,
        startDate:academicSession.startDate,
        endDate:academicSession.endDate,
        institutionId:academicSession.institutionId,
        academicClasses: academicSession.academicClasses
    });
    return response.data;
});

const updateAcademicSession = createAsyncThunk('academicSessions/update', async (academicSession) => {
    console.log(academicSession)
  const response = await axios.put(`${baseURL}/academicSessions/update`, {
        id:academicSession.id,
        name:academicSession.name,
        description:academicSession.description,
        startDate:academicSession.startDate,
        endDate:academicSession.endDate,
        institutionId:academicSession.institutionId,
        academicClasses: academicSession.academicClasses
    });
  return response.data;
});

const removeAcademicSession = createAsyncThunk('academicSessions/remove', async (academicSession) => {
    const response = await axios.delete(`${baseURL}/academicSessions`,{ 
        data: { 
            id: academicSession.id 
        } 
    });
    return academicSession;
});

const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
};

export { fetchAcademicSessions, getById, addAcademicSession, updateAcademicSession, removeAcademicSession };