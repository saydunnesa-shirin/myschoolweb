import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {baseURL} from '../../helpers/constants';

const fetchAcademicSessionTemplates = createAsyncThunk('academicSessionTemplates/fetch', async(query) =>{
    await pause(1000);
    const  response = await axios.post(`${baseURL}/academicSessionTemplates/query`, {
        institutionId: query.institutionId
    }); 
    return response.data;
});

const addAcademicSessionTemplate = createAsyncThunk('academicSessionTemplates/add',  async (academicSessionTemplate) => {
    const response = await axios.post(`${baseURL}/academicSessionTemplates`, {
        templateName:academicSessionTemplate.templateName,
        institutionId:academicSessionTemplate.institutionId
    });
    return response.data;
});

const updateAcademicSessionTemplate = createAsyncThunk('academicSessionTemplates/update', async (academicSessionTemplate) => {
  const response = await axios.put(`${baseURL}/academicSessionTemplates`, {
        id:academicSessionTemplate.id,
        templateName:academicSessionTemplate.templateName,
        institutionId:academicSessionTemplate.institutionId
    });
  return response.data;
});

const removeAcademicSessionTemplate = createAsyncThunk('academicSessionTemplates/remove', async (academicSessionTemplate) => {
    const response = await axios.delete(`${baseURL}/academicSessionTemplates`,{ 
        data: { 
            id: academicSessionTemplate.id 
        } 
    });
    return academicSessionTemplate;
});

const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
};

export { fetchAcademicSessionTemplates, addAcademicSessionTemplate, updateAcademicSessionTemplate, removeAcademicSessionTemplate };