import React from 'react';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchAcademicSessions, getById, removeAcademicSession, getEmployeeById, fetchAcademicSessionTemplates, fetchEmployees } from "../../store";
import { AcademicSessionsAction } from "../../store/slices/academicSessionsSlice";

import { useThunk } from "../../hooks/use-thunks";
import Skeleton from "../Skeleton";
import AcademicSessionAdd from "./AcademicSessionCreate";
import AcademicSessionUpdate from "./AcademicSessionUpdate";
import AcademicSessionSearch from "./AcademicSessionSearch";
import Message from "../Message";
import { SUCCESS, ERROR } from '../../helpers/constants';
import { displayToLocaleDateString } from '../../helpers/utils';
import Paging from "../Paging";
import SortableTable from '../SortableTable';
import Button from '../Button';
import Modal from '../Modal';
import { GoSync } from 'react-icons/go';

const AcademicSessionsList = () => {
  const dispatch = useDispatch();

  const [doFetchUser, isLoadingUser, loadingUserError] = useThunk(getEmployeeById);
  const [doFetchById, isLoadingById, loadingByIdError] = useThunk(getById);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const [isRemoveSuccess, setIsRemoveSuccess] = useState(false);

  const [doFetchAcademicSessionTemplates, isLoadingAcademicSessionTemplates, loadingAcademicSessionTemplatesError] = useThunk(fetchAcademicSessionTemplates);
  const [doFetchEmployees, isLoadingEmployees, loadingEmployeesError] = useThunk(fetchEmployees);
  
  const [doFetchAcademicSessions, isLoadingAcademicSessions, loadingAcademicSessionsError] = useThunk(fetchAcademicSessions);
  
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
  const [doRemoveAcademicSession, isRemovingAcademicSession, removingAcademicSessionError] = useThunk(removeAcademicSession);

  const user = useSelector((state) => state.employees.employee);
  const getDataByInstitution = async () => {
    doFetchUser(3);
    if(user != null){
      doFetchAcademicSessionTemplates({institutionId: user.institutionId});
      doFetchAcademicSessions({institutionId: user.institutionId});
      doFetchEmployees({institutionId: user.institutionId, designationId: 3});
    }
  }

  const [academicSession, setAcademicSession] = useState(null);

  //Fetch data
  useEffect(() => {
    if(user != null){
      doFetchAcademicSessionTemplates({institutionId: user.institutionId});
      doFetchAcademicSessions({institutionId: user.institutionId});
      doFetchEmployees({institutionId: user.institutionId, designationId: 3});
    }
    else{
      getDataByInstitution();
    }
  }, [user, doFetchAcademicSessions, doFetchById]);

  const { academicSessions } = useSelector(({ academicSessions: { data, searchTerm }}) => {
    let dataList = data;
    
    if(searchTerm.length !== 0){
      dataList = data.filter((item) => item.name.toLowerCase().startsWith(searchTerm.toLowerCase())); 
    }

    const sortedData = [...dataList].sort((a, b) => {
      const valueA = a.name;
      const valueB = b.name;

      if (typeof valueA === 'string') {
        return valueA.localeCompare(valueB);
      } else {
        return (valueA - valueB);
      }
    });

    return {
      academicSessions: sortedData
    }
  }); 
  
 //Delete
 const [showModal, setShowModal] = useState(false);

 const handleModalClose = () => setShowModal(false);

 const handleDeleteClick = (academicSession) => {
    setShowModal(true);
    setAcademicSession(academicSession);
    setIsRemoveSuccess(false);
  }

  const confirmDelete = () =>{
      doRemoveAcademicSession(academicSession);
      setShowModal(false);

      if(!isRemovingAcademicSession && !removingAcademicSessionError){
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
  
  const addAcademicSession = <div className='transition ease-out duration-5000'>
    <AcademicSessionAdd 
      onClose={handleAddFormClose} 
      isLoadingAcademicSessionTemplates={isLoadingAcademicSessionTemplates} 
      loadingAcademicSessionTemplatesError={loadingAcademicSessionTemplatesError}>
    </AcademicSessionAdd>
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
      <AcademicSessionUpdate 
        onClose={handleUpdateFormClose}
        onUpdateSuccess={handleUpdateSuccess}
        isLoading={isLoadingById}
        loadingError={loadingByIdError} />
    </div>;

  const handleUpdateClick = async (rowData) => {
    if(showUpdateForm)
      setShowUpdateForm(false);
    
    doFetchById(rowData.id);
    await delay(200);
    
    setShowUpdateForm(true);
    setIsUpdateSuccess(false);
    setShowAddForm(false);
  }

  //Paging
  const dataPerPage = useSelector((state) => state.academicSessions.dataPerPage);
  const currentPage = useSelector((state) => state.academicSessions.currentPage);

  const totalPages = Math.ceil(academicSessions.length / dataPerPage);
  const pages = [...Array(totalPages + 1).keys()].slice(1);
  const indexOfLastPage = currentPage * dataPerPage;
  const indexofFirstPage = indexOfLastPage - dataPerPage;

  const visibleAcademicSessions = academicSessions.slice(indexofFirstPage, indexOfLastPage);

  const navigatePrev = () => {
    if (currentPage !== 1) {
      dispatch(AcademicSessionsAction.onNavigatePrev());
    }
  };

  const navigateNext = () => {
    if (currentPage !== totalPages) {
      dispatch(AcademicSessionsAction.onNavigateNext());
    }
  };

  const handleCurrentPage = (_p) => dispatch(AcademicSessionsAction.onClickCurrentPage(_p));

  const handleChangeDataPerpage = (e) => dispatch(AcademicSessionsAction.onChangeTodosPerpage(e));
  
  //Table
  const config = [
    {
      label: 'Session',
      render: (academicSession) => academicSession.name,
      sortValue: (academicSession) => academicSession.name,
    },
    {
      label: 'Start Date',
      render: (academicSession) => displayToLocaleDateString(academicSession.startDate)
    },
    {
      label: 'End Date',
      render: (academicSession) => displayToLocaleDateString(academicSession.endDate)
    }
  ];

  const keyFn = (academicSession) => {
    return academicSession.id;
  };

  let content;

  if(isLoadingAcademicSessions){
    content = <Skeleton times={6} className="h-8 w-full"></Skeleton>;
  }
  else if(loadingAcademicSessionsError || loadingUserError){
    content = <div> <Message message={'Error fetching academic sessions'} type={ERROR}></Message>  </div>
  }
  else{
    content = <div>
      <SortableTable 
        data={visibleAcademicSessions} 
        config={config} 
        keyFn={keyFn} 
        onDeleteClick={handleDeleteClick}
        isRemovingRecord={isRemovingAcademicSession}
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
          <h1 className="text-xl m-2">Sessions</h1>
          <AcademicSessionSearch></AcademicSessionSearch>
        </div>
        {content}
      </div>
      <br></br>
      {!showAddForm && <div className='p-3'>
        <Button link onClick={handleAddCLick}>
          + Add
        </Button>
      </div> }
      {showAddForm && addAcademicSession}
      {!isLoadingById && showUpdateForm && updateForm}

      <div>
      {loadingByIdError &&  <div> <Message message={'Error fetching data'} type={ERROR}></Message>  </div>}
    
      <div className="flex items-center justify-center opacity-80 text-9xl">
        <div className='border shadow'>
          { isLoadingById && <GoSync className='animate-spin'></GoSync>}
        </div>
      </div>
    </div>
      
      {isUpdateSuccess && <Message message={'Update successfull!'} type={SUCCESS}></Message>}
      {isRemoveSuccess && <Message message={'Delete successfull!'} type={SUCCESS}></Message>}
      {showModal && modal}
    </div>
  )
}

export default AcademicSessionsList;
