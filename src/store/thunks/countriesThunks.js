import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchCountries = createAsyncThunk('countries/fetch', async() =>{
    const  response = await axios.get("http://localhost:3006/Countries");
    await pause(1000);
    return response.data;
});

const addCountry = createAsyncThunk('countries/add',  async (utility) => {
    const response = await axios.post("http://localhost:3006/Countries", {
              name:utility.name
    });
    return response.data;
});

const updateCountry = createAsyncThunk('countries/update', async (utility) => {

  const response = await axios.put(`http://localhost:3006/Countries/${utility.id}`, utility);
  await pause(3000);
  return response.data;
});

const removeCountry = createAsyncThunk('countries/remove', async (utility) => {
    const response = await axios.delete(`http://localhost:3006/Countries/${utility.id}`);
    return utility;
});

const pause = (duration) => {
    return new Promise((resolve) => {
              setTimeout(resolve, duration);
    });
};

export { fetchCountries, addCountry, updateCountry, removeCountry };