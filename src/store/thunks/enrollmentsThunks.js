import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {baseURL} from '../../helpers/constants';

const fetchEnrollments = createAsyncThunk('enrollments/fetch', async(query) =>{
    const  response = await axios.post(`${baseURL}/enrollments/query`, {
        institutionId: query.institutionId,
        isActive: query.isActive,
        academicSessionIds: query.academicSessionIds,
        academicClassIds: query.academicClassIds,
        studentIds: query.studentIds,
        studentName: query.studentName
     });
    return response.data;
});

const addEnrollment = createAsyncThunk('enrollments/add',  async (enrollment) => {

    const response = await axios.post(`${baseURL}/enrollments/withstudnets`, {
        institutionId: enrollment.institutionId,
        enrollmentDate: enrollment.enrollmentDate,
        academicSessionId: enrollment.academicSessionId,
        academicClassId: enrollment.academicClassId,
        studentIds: enrollment.studentIds
    });

    return response.data;
});

const getEnrollmentById = createAsyncThunk('enrollments/getById', async (id) => {
    const response = await axios.get(`${baseURL}/enrollments/${id}`);
    return response.data;
});

const updateEnrollment = createAsyncThunk('enrollments/update', async (enrollment) => {
    const response = await axios.put(`${baseURL}/enrollments`, {
        id: enrollment.id,
        institutionId: enrollment.institutionId,
        enrollmentDate: enrollment.enrollmentDate,
        academicSessionId: enrollment.academicSessionId,
        academicClassId: enrollment.academicClassId,
        studentId: enrollment.studentId,
    });
    return response.data;
});

const removeEnrollment = createAsyncThunk('enrollments/remove', async (enrollment) => {
    const response = await axios.delete(`${baseURL}/enrollments/delete`, { 
        data: { 
            id: enrollment.id 
        } 
    });
    return enrollment;
});

export { fetchEnrollments, addEnrollment, getEnrollmentById, updateEnrollment, removeEnrollment };