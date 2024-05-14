import React from 'react';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchEnrollments, removeEnrollment, getEmployeeById, fetchAcademicSessions, fetchAcademicClasses, 
  fetchStudentStatus, fetchStudentStatusReasons } from "../../store";

import { EnrollmentsAction } from "../../store/slices/enrollmentsSlice";

import { useThunk } from "../../hooks/use-thunks";
import Skeleton from "../Skeleton";
import Dropdown from '../Dropdown';
import TextBox from '../TextBox';
import EnrollmentUpdate from "./EnrollmentUpdate";
import Message from "../Message";
import { SUCCESS, ERROR, LOGGED_IN_USER_ID } from '../../helpers/constants';
import { displayToLocaleDateString } from '../../helpers/utils';

import { GoSearch, GoPencil } from 'react-icons/go';
import Paging from "../Paging";
import SortableTable from '../SortableTable';
import Button from '../Button';
import Modal from '../Modal';
import Label from '../Label';

const EnrollmentsPreviewList = () => {
  const dispatch = useDispatch();
  const [doFetchUser, isLoadingUser, loadingUserError] = useThunk(getEmployeeById);

  const [validationError, setValidationError] = useState(false);
  const [validationErrorMessage, setValidationErrorMessage] = useState('');
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const [isRemoveSuccess, setIsRemoveSuccess] = useState(false);
  const [doFetchEnrollments, isLoadingEnrollments, loadingEnrollmentsError] = useThunk(fetchEnrollments);

  const [doFetchAcademicSessions, isLoadingAcademicSessions, loadingAcademicSessionsError] = useThunk(fetchAcademicSessions);
  const [doFetchAcademicClasses, isLoadingAcademicClasses, loadingAcademicClassesError] = useThunk(fetchAcademicClasses);
  const [doFetchStudentStatus, isLoadingStudentStatus, loadingStudentStatusError] = useThunk(fetchStudentStatus);
  const [doFetchStudentStatusReasons, isLoadingStudentStatusReasons, loadingStudentStatusReasonsError] = useThunk(fetchStudentStatusReasons);

  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
  const [doRemoveEnrollment, isRemovingEnrollment, removingEnrollmentError] = useThunk(removeEnrollment);
  const [showEnrollments, setShowEnrollments] = useState(false);
  
  const user = useSelector((state) => state.employees.employee);

  const fetchData = async () => {
    doFetchUser(LOGGED_IN_USER_ID);
    if(user) {
      // doFetchEnrollments({institutionId: user.institutionId, isActive: true});
      doFetchAcademicSessions({institutionId: user.institutionId, isActive: true})
    }
  }

   //Fetch data
  useEffect(() => {
    if(user){
      doFetchStudentStatus();
      doFetchStudentStatusReasons();
      doFetchAcademicSessions({institutionId: user.institutionId, isActive: true})
    }
    else{
      fetchData();
    }
  }, [user, doFetchAcademicSessions]);

  const [studentName, setStudentName] = useState('');

  //DDL
  const [academicSessionSelection, setAcademicSessionSelection] = useState(null);
  const [academicClassSelection, setAcademicClassSelection] = useState(null);

  const { academicSessions } = useSelector(({ academicSessions: { data }}) => {
    const list = data.map((item) => {
      const id = item.id;
      const name = item.name;
      return ({id, name});
    });

    return {
      academicSessions: list
    }
  });

  const { academicClasses } = useSelector(({ academicClasses: { data }}) => {
    const list = data.map((item) => {
      const id = item.id;
      const name = item.name;
      return ({id, name});
    });

    return {
      academicClasses: list
    }
  });

  const handleAcademicSessionSelect = (option) => {
    setAcademicSessionSelection(option);
    setSearchEnrollment({ ...searchEnrollment, academicSessionId: option.id });
    setAcademicClassSelection(null);
    
    if(user){
      doFetchAcademicClasses({academicSessionId: option.id, institutionId: user.institutionId, isActive: true});
    }
  };
  
  const handleAcademicClassSelect = (option) => {
    setAcademicClassSelection(option);
    setSearchEnrollment({ ...searchEnrollment, academicClassId: option.id });
  };

  const handleStudentNameChange = (event) => {
    setStudentName(event.target.value.replace(/[0-9]/, ''));
    setSearchEnrollment({ ...searchEnrollment, studentName: event.target.value.replace(/[0-9]/, '') });
  } 

  const enrollments = useSelector((state) => state.enrollments.data);
  const initialSearchState = {
    academicSessionId: null,
    academicClassId: null,
    studentName: null
  };
  
  const [searchEnrollment, setSearchEnrollment] = useState(initialSearchState);

  //Get students
  const loadEnrollments = (event) => {

    event.preventDefault();

    if(user.institutionId === null
      || searchEnrollment.academicSessionId === null 
      || searchEnrollment.academicClassId === null 
      ){
        setValidationErrorMessage('Please enter required field(s).');
        setValidationError(true);
        setShowEnrollments(false);

        return false;
    }else{
      setValidationErrorMessage('');
      setValidationError(false);
      setShowEnrollments(true);
    }
    
    doFetchEnrollments({institutionId: user.institutionId, 
      academicSessionIds: [searchEnrollment.academicSessionId], 
      academicClassIds: [searchEnrollment.academicClassId],
      isActive: true,
      studentName: searchEnrollment.studentName});
  }
  //Reset search
  const reset = () => {
    setAcademicSessionSelection(null);
    setAcademicClassSelection(null);
    setStudentName('');
    setValidationErrorMessage('');
    setValidationError(false);
    setShowEnrollments(false);
  }
  
  //Delete
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => setShowModal(false);

  const handleDeleteClick = (enrollment) => {
      setShowModal(true);
      setSearchEnrollment(enrollment);
      setIsRemoveSuccess(false);
  }

  const confirmDelete = () =>{
      doRemoveEnrollment(searchEnrollment);
      setShowModal(false);

      if(!isRemovingEnrollment && !removingEnrollmentError){
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

  //Update
  const [enrollment, setEnrollment] = new useState();
  const handleUpdateFormClose = () => setShowUpdateForm(false);

  const handleUpdateSuccess = () => {
    setShowUpdateForm(false);
    setIsUpdateSuccess(true);
  }

  const updateForm = <div> 
      <EnrollmentUpdate data={enrollment} onClose={handleUpdateFormClose}
       onUpdateSuccess={handleUpdateSuccess} />
    </div>;

  const handleUpdateClick = async (rowData) => {
    if(showUpdateForm)
      setShowUpdateForm(false);

    await delay(200);

    setEnrollment(rowData);
    setShowUpdateForm(true);
    setIsUpdateSuccess(false);
  }

  //Paging
  const dataPerPage = useSelector((state) => state.enrollments.dataPerPage);
  const currentPage = useSelector((state) => state.enrollments.currentPage);

  const totalPages = Math.ceil(enrollments.length / dataPerPage);
  const pages = [...Array(totalPages + 1).keys()].slice(1);
  const indexOfLastPage = currentPage * dataPerPage;
  const indexofFirstPage = indexOfLastPage - dataPerPage;

  const visibleEnrollments = enrollments.slice(indexofFirstPage, indexOfLastPage);

  const navigatePrev = () => {
    if (currentPage !== 1) {
      dispatch(EnrollmentsAction.onNavigatePrev());
    }
  };

  const navigateNext = () => {
    if (currentPage !== totalPages) {
      dispatch(EnrollmentsAction.onNavigateNext());
    }
  };

  const handleCurrentPage = (_p) => dispatch(EnrollmentsAction.onClickCurrentPage(_p));

  const handleChangeDataPerpage = (e) => dispatch(EnrollmentsAction.onChangeTodosPerpage(e));
  
  //Table
  const config = [
    {
      label: 'Student',
      render: (enrollment) => enrollment.studentName,
      sortValue: (enrollment) => enrollment.studentName,
    },
    {
      label: 'Student ID',
      render: (enrollment) => enrollment.studentIdNumber,
      sortValue: (enrollment) => enrollment.studentIdNumber,
    },
    {
      label: 'Academic Session',
      render: (enrollment) => enrollment.academicSessionName,
      sortValue: (enrollment) => enrollment.academicSessionName,
    },
    {
      label: 'Academic Class',
      render: (enrollment) => enrollment.academicClassName,
      sortValue: (enrollment) => enrollment.academicClassName,
    },
    {
      label: 'Enrollment Date',
      render: (enrollment) => displayToLocaleDateString(enrollment.enrollmentDate),
      sortValue: (enrollment) => enrollment.enrollmentDate,
    },
  ];

  const keyFn = (enrollment) => {
    return enrollment.id;
  };

  let content;

  if(isLoadingEnrollments){
    content = <Skeleton times={6} className="h-8 w-full"></Skeleton>;
  }
  else if(loadingEnrollmentsError || loadingUserError){
    content = <div> <Message message={'Error fetching enrollments'} type={ERROR}></Message>  </div>
  }
  else{
    content = <div>
      <SortableTable 
        data={visibleEnrollments} 
        config={config} 
        keyFn={keyFn} 
        onDeleteClick={handleDeleteClick}
        isRemovingRecord={isRemovingEnrollment}
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
          <h1 className="m-2">Enrollments Preview</h1>
        </div>
        <form className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3 sm:col-start-1">
            <Label>
              Active Session <b className='text-red-600'>*</b>
            </Label>
            <div className="mt-2">
              <Dropdown 
                options={academicSessions} 
                value={academicSessionSelection} 
                onChange={handleAcademicSessionSelect} 
                mandatory={validationError && academicSessionSelection === null && true}
              />
            </div>
          </div>
          <div className="sm:col-span-3">
            <Label>
              Active Class <b className='text-red-600'>*</b>
            </Label>
            <div className="mt-2">
              <Dropdown 
                options={academicClasses} 
                value={academicClassSelection} 
                onChange={handleAcademicClassSelect} 
                mandatory={validationError && academicClassSelection === null && true}
              />
            </div>
          </div>
          <div className="sm:col-span-3">
            <Label>
              Student Name
            </Label>
            <div className="mt-2">
              <TextBox
                name="studentName"
                id="studentName"
                value={studentName} 
                onChange={handleStudentNameChange} 
                placeholder={'First Name'}
              />
            </div>
          </div>
          <div className="sm:col-span-3">
            <div className="sm:mt-8 flex items-start justify-start gap-x-4">
              <Button secondary loding={isLoadingEnrollments} onClick={loadEnrollments}><GoSearch /></Button>
              <Button secondary onClick={reset}><GoPencil /></Button>
              { 
                validationError 
                && <p className="text-s text-red-600 dark:text-red-400">
                    {validationErrorMessage}
                  </p> 
              }
            </div>
          </div>
        </form>
        <div className='mt-10 border shadow'>
          { showEnrollments && content}
        </div>
      </div>
      <br></br>
      {showUpdateForm && updateForm}
      {isUpdateSuccess && <Message message={'Update successfull!'} type={SUCCESS}></Message>}
      {isRemoveSuccess && <Message message={'Delete successfull!'} type={SUCCESS}></Message>}
      {showModal && modal}
    </div>
  )
}

export default EnrollmentsPreviewList;
