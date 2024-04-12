import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {baseURL} from '../../helpers/constants';

const fetchStudents = createAsyncThunk('students/fetch', async(query) =>{
    const  response = await axios.post(`${baseURL}/students/query`, {
        institutionId: query.institutionId,
        isActive: query.isActive
    });
    await pause(1000);
    return response.data;
});

const addStudent = createAsyncThunk('students/add',  async (student) => {

    const response = await axios.post(`${baseURL}/students`, {
            id: student.id,
            studentId: student.studentId,
            institutionId: student.institutionId,
            admissionDate: student.admissionDate,
            statusId: student.statusId, 
            activeSessionId: student.activeSessionId,
            activeClassId: student.activeClassId,

            firstName: student.firstName,
            lastName: student.lastName,
            email: student.email,
            mobile: student.mobile,

            dateOfBirth: student.dateOfBirth,
            fatherName: student.fatherName,
            motherName: student.motherName,
            genderId: student.genderId,
            bloodGroupId: student.bloodGroupId,
            countryId: student.countryId,
            street: student.street,
            city: student.city,
            state: student.state,
            postalCode: student.postalCode
    });
    await pause(3000);
    console.log(student)

    return response.data;
});

const getStudentById = createAsyncThunk('students/getById', async (id) => {
    const response = await axios.get(`${baseURL}/students/${id}`);
    return response.data;
});

const updateStudent = createAsyncThunk('students/update', async (student) => {
    const response = await axios.put(`${baseURL}/students`, {
            id: student.id,
            studentId: student.studentId,
            institutionId: student.institutionId,
            admissionDate: student.admissionDate,
            statusId: student.statusId, 
            activeSessionId: student.activeSessionId,
            activeClassId: student.activeClassId,
            activeSessionName: student.activeSessionName,
            activeClassName: student.activeClassName,

            firstName: student.firstName,
            lastName: student.lastName,
            email: student.email,
            mobile: student.mobile,

            dateOfBirth: student.dateOfBirth,
            fatherName: student.fatherName,
            motherName: student.motherName,
            genderId: student.genderId,
            bloodGroupId: student.bloodGroupId,
            countryId: student.countryId,
            street: student.street,
            city: student.city,
            state: student.state,
            postalCode: student.postalCode
    });
    await pause(3000);
    return response.data;
});

const removeStudent = createAsyncThunk('students/remove', async (student) => {
    const response = await axios.delete(`${baseURL}/students/delete`, { 
        data: { 
            id: student.id 
        } 
    });
    await pause(3000);

    return student;
});

const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
};

export { fetchStudents, addStudent, getStudentById, updateStudent, removeStudent };