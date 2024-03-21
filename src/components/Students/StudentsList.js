import React from 'react';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchStudents, fetchInstitutions, removeStudent, getEmployeeById } from "../../store";
import { StudentsAction } from "../../store/slices/studentsSlice";

import { useThunk } from "../../hooks/use-thunks";
import Skeleton from "../Skeleton";
import StudentAdd from "./StudentAdd";
import StudentUpdate from "./StudentUpdate";
import StudentSearch from "./StudentSearch";
import Message from "../Message";
import { SUCCESS, ERROR } from '../../helpers/constants';
import Paging from "../Paging";
import SortableTable from '../SortableTable';
import Button from '../Button';
import Modal from '../Modal';

const StudentsList = () => {
  const dispatch = useDispatch();

  const [doFetchUser, isLoadingUser, loadingUserError] = useThunk(getEmployeeById);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const [isRemoveSuccess, setIsRemoveSuccess] = useState(false);
  const [doFetchStudents, isLoadingStudents, loadingStudentsError] = useThunk(fetchStudents);
  
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
  const [doRemoveStudent, isRemovingStudent, removingStudentError] = useThunk(removeStudent);

  //dropdown lists
  // const [doFetchInstitutions] = useThunk(fetchInstitutions);

  const user = useSelector((state) => state.employees.employee);

  const getInstitution = async () => {
    doFetchUser(3);
    if(user != null)
      doFetchStudents({institutionId: user.institutionId, isActive: true});
  }

   //Fetch data
   useEffect(() => {
    if(user != null){
      doFetchStudents({institutionId: user.institutionId, isActive: true});
    }
    else{
      getInstitution();
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
  const handleAddFormClose = () => setShowAddForm(false);
  
  const addStudent = <div className='transition ease-out duration-5000'>
    <StudentAdd onClose={handleAddFormClose}></StudentAdd>
  </div>

  const handleAddCLick = () =>{
    setShowAddForm(!showAddForm);

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
    await delay(200);

    setStudent(rowData);
    setShowUpdateForm(true);
    setIsUpdateSuccess(false);
    setShowAddForm(false);
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
          <h1 className="text-xl m-2">Students</h1>
          <StudentSearch></StudentSearch>
        </div>
        {content}
      </div>
      <br></br>
      {!showAddForm && <div className='p-3'>
        <Button link onClick={handleAddCLick}>
          + Student Add
        </Button>
      </div> }
      {showAddForm && addStudent}
      {showUpdateForm && updateForm}
      
      {isUpdateSuccess && <Message message={'Update successfull!'} type={SUCCESS}></Message>}
      {isRemoveSuccess && <Message message={'Delete successfull!'} type={SUCCESS}></Message>}
      {showModal && modal}
    </div>
  )
}

export default StudentsList;
