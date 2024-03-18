import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {baseURL} from '../../helpers/constants';

const fetchInstitutions = createAsyncThunk('institutions/fetch', async() =>{
    const  response = await axios.post(`${baseURL}/institutions/query`, {}); 
    return response.data;
});

const addInstitution = createAsyncThunk('institutions/add',  async (institution) => {
    const response = await axios.post(`${baseURL}/institutions`, {
        name:institution.name,
        address:institution.address,
        countryId:institution.countryId
    });
    return response.data;
});

const updateInstitution = createAsyncThunk('institutions/update', async (institution) => {
  const response = await axios.put(`${baseURL}/institutions`, {
        id:institution.id,
        name:institution.name,
        address:institution.address,
        countryId:institution.countryId
    });
  await pause(3000);
  return response.data;
});

const removeInstitution = createAsyncThunk('institutions/remove', async (institution) => {
    const response = await axios.delete(`${baseURL}/institutions`,{ 
        data: { 
            id: institution.id 
        } 
    });
    return institution;
});

const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
};

export { fetchInstitutions, addInstitution, updateInstitution, removeInstitution };