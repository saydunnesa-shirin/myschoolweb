import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {baseURL} from '../../helpers/constants';

const fetchCountries = createAsyncThunk('countries/fetch', async() =>{
    const  response = await axios.post(`${baseURL}/countries/query`, {}); 
    await pause(1000);
    return response.data;
});

const addCountry = createAsyncThunk('countries/add',  async (country) => {
    const response = await axios.post(`${baseURL}/countries`, {
              name:country.name,
              iso2Code: country.iso2Code
    });
    return response.data;
});

const updateCountry = createAsyncThunk('countries/update', async (country) => {
  // const response = await axios.put(`${baseURL}/countries/${country.id}`, country);
  const response = await axios.put(`${baseURL}/countries`, country)
  return response.data;
});

const removeCountry = createAsyncThunk('countries/remove', async (country) => {
    // const response = await axios.delete(`${baseURL}/countries/${country.id}`);
    const response = await axios.delete(`${baseURL}/countries`,{ 
        data: { 
            id: country.id 
        } 
    });
    return country;
});

const pause = (duration) => {
    return new Promise((resolve) => {
              setTimeout(resolve, duration);
    });
};

export { fetchCountries, addCountry, updateCountry, removeCountry };