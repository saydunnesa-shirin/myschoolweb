import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {baseURL} from '../../helpers/constants';

const fetchAcademicClassTemplates = createAsyncThunk('academicClassTemplates/fetch', async(query) =>{
    const  response = await axios.post(`${baseURL}/academicClassTemplates/query`, {
        institutionId: query.institutionId
    }); 
    return response.data;
});

const addAcademicClassTemplate = createAsyncThunk('academicClassTemplates/add',  async (academicClassTemplate) => {
    const response = await axios.post(`${baseURL}/academicClassTemplates`, {
        templateName:academicClassTemplate.templateName,
        institutionId:academicClassTemplate.institutionId,
        serialNo:academicClassTemplate.serialNo
    });
    return response.data;
});

const updateAcademicClassTemplate = createAsyncThunk('academicClassTemplates/update', async (academicClassTemplate) => {
  const response = await axios.put(`${baseURL}/academicClassTemplates`, {
        id:academicClassTemplate.id,
        templateName:academicClassTemplate.templateName,
        institutionId:academicClassTemplate.institutionId,
        serialNo:academicClassTemplate.serialNo
    });
  return response.data;
});

const removeAcademicClassTemplate = createAsyncThunk('academicClassTemplates/remove', async (academicClassTemplate) => {
    const response = await axios.delete(`${baseURL}/academicClassTemplates`,{ 
        data: { 
            id: academicClassTemplate.id 
        } 
    });
    return academicClassTemplate;
});

export { fetchAcademicClassTemplates, addAcademicClassTemplate, updateAcademicClassTemplate, removeAcademicClassTemplate };