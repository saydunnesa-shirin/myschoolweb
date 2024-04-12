import React from 'react';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchStudents, removeStudent, getEmployeeById, fetchAcademicSessions } from "../../store";
import { StudentsAction } from "../../store/slices/studentsSlice";

import { useThunk } from "../../hooks/use-thunks";
import Skeleton from "../Skeleton";
import StudentCreate from "./StudentCreate";
import StudentUpdate from "./StudentUpdate";
import StudentSearch from "./StudentSearch";
import Message from "../Message";
import { SUCCESS, ERROR, LOGGED_IN_USER_ID } from '../../helpers/constants';
import Paging from "../Paging";
import SortableTable from '../SortableTable';
import Button from '../Button';
import Modal from '../Modal';

const StudentsList = () => {
  const dispatch = useDispatch();
  const [doFetchUser, isLoadingUser, loadingUserError] = useThunk(getEmployeeById);

  const [showAddNewForm, setShowAddNewForm] = useState(false);
  const [showAddExistingForm, setShowAddExistingForm] = useState(false);

  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const [isRemoveSuccess, setIsRemoveSuccess] = useState(false);
  const [doFetchStudents, isLoadingStudents, loadingStudentsError] = useThunk(fetchStudents);

  const [doFetchAcademicSessions, isLoadingAcademicSessions, loadingAcademicSessionsError] = useThunk(fetchAcademicSessions);

  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
  const [doRemoveStudent, isRemovingStudent, removingStudentError] = useThunk(removeStudent);

  const user = useSelector((state) => state.employees.employee);

  const fetchData = async () => {
    doFetchUser(LOGGED_IN_USER_ID);
    if(user) {
      doFetchStudents({institutionId: user.institutionId, isActive: true});
      doFetchAcademicSessions({institutionId: user.institutionId, isActive: true})
    }
  }

   //Fetch data
  useEffect(() => {
    if(user){
      doFetchStudents({institutionId: user.institutionId, isActive: true});
      doFetchAcademicSessions({institutionId: user.institutionId, isActive: true})
    }
    else{
      fetchData();
    }
  }, [user]);


  const { students } = useSelector(({ students: { data, searchTerm }}) => {
    let dataList = data;
    
    if(searchTerm.length !== 0){
      dataList = data.filter((item) => item.firstName.toLowerCase().startsWith(searchTerm.toLowerCase())); 
    }

    const sortedData = [...dataList].sort((a, b) => {
      const valueA = a.firstName;
      const valueB = b.firstName;
      // const reverseOrder = sortOrder === 'asc' ? 1 : -1;

      if (typeof valueA === 'string') {
        return valueA.localeCompare(valueB);
      } else {
        return (valueA - valueB);
      }
    });

    return {
      students: sortedData
    }

  }); 
  
 //Delete
 const [showModal, setShowModal] = useState(false);
 const [student, setStudent] = useState(null);

 const handleModalClose = () => setShowModal(false);

 const handleDeleteClick = (student) => {
    setShowModal(true);
    setStudent(student);
    setIsRemoveSuccess(false);
  }

 const confirmDelete = () =>{
    doRemoveStudent(student);
    setShowModal(false);

    if(!isRemovingStudent && !removingStudentError){
        setIsRemoveSuccess(true);
    }
 }

 const deleteModalActionBar = (
  <div className='flex justify-between mt-5'>
      <Button secondary onClick={handleModalClose}>No, Cancel</Button>
      <Button danger onClick={confirmDelete}>Yes, Delete</Button>
  </div>
 );

  const modal = (
    <Modal onClose={handleModalClose} actionBar={deleteModalActionBar}>
        <p>
          Are you sure you want to delete this record?
        </p>
    </Modal>
  );

  const delay = async (ms) => {
    return new Promise((resolve) => 
        setTimeout(resolve, ms));
  }

  //Add
  const handleAddFormClose = () => setShowAddNewForm(false);
  const handleAddExistingFormClose = () => setShowAddExistingForm(false);
  
  const addNewStudent = <div className='transition ease-out duration-5000'>
    <StudentCreate onClose={handleAddFormClose} status={1} formHeader={'New Registration'}></StudentCreate>
  </div>

  const addExistingStudent = <div className='transition ease-out duration-5000'>
    <StudentCreate onClose={handleAddExistingFormClose} status={2} formHeader={'Update Existing Registration'}></StudentCreate>
  </div>

  const handleAddCLick = () =>{
    setShowAddNewForm(!showAddNewForm);

    if(showUpdateForm)
      setShowUpdateForm(false);
    if(showAddExistingForm)
      setShowAddExistingForm(false);
  }

  const handleAddExistingCLick = () =>{
    setShowAddExistingForm(!showAddExistingForm);
    
    if(showAddNewForm)
      setShowAddNewForm(false);
    if(showUpdateForm)
      setShowUpdateForm(false);
  }

  //Update
  const handleUpdateFormClose = () => setShowUpdateForm(false);

  const handleUpdateSuccess = () => {
    setShowUpdateForm(false);
    setIsUpdateSuccess(true);
  }

  const updateForm = <div> 
      <StudentUpdate data={student} onClose={handleUpdateFormClose}
       onUpdateSuccess={handleUpdateSuccess} />
    </div>;

  const handleUpdateClick = async (rowData) => {
    if(showUpdateForm)
      setShowUpdateForm(false);

    //doFetchStudentById(rowData.id)
    await delay(200);

    setStudent(rowData);
    setShowUpdateForm(true);
    setIsUpdateSuccess(false);
    setShowAddNewForm(false);
    setShowAddExistingForm(false);
  }

  //Paging
  const dataPerPage = useSelector((state) => state.students.dataPerPage);
  const currentPage = useSelector((state) => state.students.currentPage);

  const totalPages = Math.ceil(students.length / dataPerPage);
  const pages = [...Array(totalPages + 1).keys()].slice(1);
  const indexOfLastPage = currentPage * dataPerPage;
  const indexofFirstPage = indexOfLastPage - dataPerPage;

  const visibleStudents = students.slice(indexofFirstPage, indexOfLastPage);

  const navigatePrev = () => {
    if (currentPage !== 1) {
      dispatch(StudentsAction.onNavigatePrev());
    }
  };

  const navigateNext = () => {
    if (currentPage !== totalPages) {
      dispatch(StudentsAction.onNavigateNext());
    }
  };

  const handleCurrentPage = (_p) => dispatch(StudentsAction.onClickCurrentPage(_p));

  const handleChangeDataPerpage = (e) => dispatch(StudentsAction.onChangeTodosPerpage(e));
  
  //Table
  const config = [
    {
      label: 'Student ID',
      render: (student) => student.studentId,
      sortValue: (student) => student.studentId,
    },
    {
      label: 'Country',
      render: (student) => student.countryName,
      sortValue: (student) => student.countryName,
    },
    {
      label: 'First Name',
      render: (student) => student.firstName,
      sortValue: (student) => student.firstName,
    },
    {
      label: 'Last Name',
      render: (student) => student.lastName,
      sortValue: (student) => student.lastName,
    },
    {
      label: 'Email',
      render: (student) => student.email,
      sortValue: (student) => student.email,
    },
    {
      label: 'Mobile',
      render: (student) => student.mobile,
      sortValue: (student) => student.mobile,
    },

    
  ];

  const keyFn = (student) => {
    return student.id;
  };

  let content;

  if(isLoadingStudents){
    content = <Skeleton times={6} className="h-8 w-full"></Skeleton>;
  }
  else if(loadingStudentsError || loadingUserError){
    content = <div> <Message message={'Error fetching students'} type={ERROR}></Message>  </div>
  }
  else{
    content = <div>
      <SortableTable 
        data={visibleStudents} 
        config={config} 
        keyFn={keyFn} 
        onDeleteClick={handleDeleteClick}
        isRemovingRecord={isRemovingStudent}
        onUpdateClick={handleUpdateClick}
      />
      <Paging currentPage={currentPage} pages={pages} navigatePrev={navigatePrev} navigateNext={navigateNext} 
          handleCurrentPage={handleCurrentPage} handleChangeDataPerpage={handleChangeDataPerpage}>
      </Paging>
    </div>
  }

  return (
    <div className="p-2 m-2">
      <div className='border shadow'>
        <div className="flex flex-row justify-between items-center mt-2 mb-2">
          <h1 className="m-2">Students</h1>
          <StudentSearch></StudentSearch>
        </div>
        {content}
      </div>
      <br></br>
      <div className='flex'>
        {!showAddNewForm && 
        <div className='p-3 text-6xl'>
          <Button link onClick={handleAddCLick}>
            + New Student
          </Button>
        </div> }

        {!showAddExistingForm && 
        <div className='p-3 text-6xl'>
          <Button link onClick={handleAddExistingCLick}>
            + Existing Student
          </Button>
        </div> }
      </div>
      
      
      {showAddNewForm && addNewStudent}
      {showAddExistingForm && addExistingStudent}
      {showUpdateForm && updateForm}
      
      {isUpdateSuccess && <Message message={'Update successfull!'} type={SUCCESS}></Message>}
      {isRemoveSuccess && <Message message={'Delete successfull!'} type={SUCCESS}></Message>}
      {showModal && modal}
    </div>
  )
}

export default StudentsList;
