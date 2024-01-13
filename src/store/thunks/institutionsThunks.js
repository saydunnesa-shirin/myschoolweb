import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchInstitutions = createAsyncThunk('institutions/fetch', async() =>{
    const  response = await axios.get('http://localhost:3006/institutions');
    await pause(1000);
    return response.data;
});

const addInstitution = createAsyncThunk('institutions/add',  async (institution) => {
    const response = await axios.post('http://localhost:3006/institutions', {
              name:institution.name
    });
    return response.data;
});

const updateInstitution = createAsyncThunk('institutions/update', async (institution) => {

  const response = await axios.put(`http://localhost:3006/institutions/${institution.id}`, institution);
  await pause(3000);
  return response.data;
});

const removeInstitution = createAsyncThunk('institutions/remove', async (institution) => {
    const response = await axios.delete(`http://localhost:3006/institutions/${institution.id}`);
    return institution;
});

const pause = (duration) => {
    return new Promise((resolve) => {
              setTimeout(resolve, duration);
    });
};

export { fetchInstitutions, addInstitution, updateInstitution, removeInstitution };