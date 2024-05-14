import React from 'react';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchAcademicSessionTemplates, removeAcademicSessionTemplate, getEmployeeById } from "../../store";
import { AcademicSessionTemplatesAction } from "../../store/slices/academicSessionTemplatesSlice";

import { useThunk } from "../../hooks/use-thunks";
import Skeleton from "../Skeleton";
import AcademicSessionTemplateCreate from "./AcademicSessionTemplateCreate";
import AcademicSessionTemplateUpdate from "./AcademicSessionTemplateUpdate";
import AcademicSessionTemplateSearch from "./AcademicSessionTemplateSearch";
import Message from "../Message";
import { SUCCESS, ERROR, LOGGED_IN_USER_ID } from '../../helpers/constants';
import Paging from "../Paging";
import SortableTable from '../SortableTable';
import Button from '../Button';
import Modal from '../Modal';

const AcademicSessionTemplatesList = () => {
  const dispatch = useDispatch();

  const [doFetchUser, isLoadingUser, loadingUserError] = useThunk(getEmployeeById);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const [isRemoveSuccess, setIsRemoveSuccess] = useState(false);
  const [doFetchAcademicSessionTemplates, isLoadingAcademicSessionTemplates, loadingAcademicSessionTemplatesError] = useThunk(fetchAcademicSessionTemplates);
  
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
  const [doRemoveAcademicSessionTemplate, isRemovingAcademicSessionTemplate, removingAcademicSessionTemplateError] = useThunk(removeAcademicSessionTemplate);


  const user = useSelector((state) => state.employees.employee);
  const getInstitution = async () => {
    doFetchUser(LOGGED_IN_USER_ID);
    if(user != null)
      doFetchAcademicSessionTemplates({institutionId: user.institutionId});
  }

 //Fetch data
  useEffect(() => {
    if(user != null){
      doFetchAcademicSessionTemplates({institutionId: user.institutionId});
    }
    else{
      getInstitution();
    }
  }, [user]);

  const { academicSessionTemplates } = useSelector(({ academicSessionTemplates: { data, searchTerm }}) => {
    let dataList = data;
    
    if(searchTerm.length !== 0){
      dataList = data.filter((item) => item.templateName.toLowerCase().startsWith(searchTerm.toLowerCase())); 
    }

    const sortedData = [...dataList].sort((a, b) => {
      const valueA = a.templateName;
      const valueB = b.templateName;

      if (typeof valueA === 'string') {
        return valueA.localeCompare(valueB);
      } else {
        return (valueA - valueB);
      }
    });

    return {
      academicSessionTemplates: sortedData
    }
  }); 
  
 //Delete
 const [showModal, setShowModal] = useState(false);
 const [academicSessionTemplate, setAcademicSessionTemplate] = useState(null);

 const handleModalClose = () => setShowModal(false);

 const handleDeleteClick = (academicSessionTemplate) => {
    setShowModal(true);
    setAcademicSessionTemplate(academicSessionTemplate);
    setIsRemoveSuccess(false);
  }

 const confirmDelete = () =>{
    doRemoveAcademicSessionTemplate(academicSessionTemplate);
    setShowModal(false);

    if(!isRemovingAcademicSessionTemplate && !removingAcademicSessionTemplateError){
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
  
  const addAcademicSessionTemplate = <div className='transition ease-out duration-5000'>
    <AcademicSessionTemplateCreate onClose={handleAddFormClose}></AcademicSessionTemplateCreate>
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
      <AcademicSessionTemplateUpdate data={academicSessionTemplate} onClose={handleUpdateFormClose}
       onUpdateSuccess={handleUpdateSuccess} />
    </div>;

  const handleUpdateClick = async (rowData) => {
    if(showUpdateForm)
      setShowUpdateForm(false);
    await delay(200);

    setAcademicSessionTemplate(rowData);
    setShowUpdateForm(true);
    setIsUpdateSuccess(false);
    setShowAddForm(false);
  }

  //Paging
  const dataPerPage = useSelector((state) => state.academicSessionTemplates.dataPerPage);
  const currentPage = useSelector((state) => state.academicSessionTemplates.currentPage);

  const totalPages = Math.ceil(academicSessionTemplates.length / dataPerPage);
  const pages = [...Array(totalPages + 1).keys()].slice(1);
  const indexOfLastPage = currentPage * dataPerPage;
  const indexofFirstPage = indexOfLastPage - dataPerPage;

  const visibleAcademicSessionTemplates = academicSessionTemplates.slice(indexofFirstPage, indexOfLastPage);

  const navigatePrev = () => {
    if (currentPage !== 1) {
      dispatch(AcademicSessionTemplatesAction.onNavigatePrev());
    }
  };

  const navigateNext = () => {
    if (currentPage !== totalPages) {
      dispatch(AcademicSessionTemplatesAction.onNavigateNext());
    }
  };

  const handleCurrentPage = (_p) => dispatch(AcademicSessionTemplatesAction.onClickCurrentPage(_p));

  const handleChangeDataPerpage = (e) => dispatch(AcademicSessionTemplatesAction.onChangeTodosPerpage(e));
  
  //Table
  const config = [
    {
      label: 'Template',
      render: (academicSessionTemplate) => academicSessionTemplate.templateName,
      sortValue: (academicSessionTemplate) => academicSessionTemplate.templateName,
    }
  ];

  const keyFn = (academicSessionTemplate) => {
    return academicSessionTemplate.id;
  };

  let content;

  if(isLoadingAcademicSessionTemplates){
    content = <Skeleton times={6} className="h-8 w-full"></Skeleton>;
  }
  else if(loadingAcademicSessionTemplatesError || loadingUserError){
    content = <div> <Message message={'Error fetching academic session templates'} type={ERROR}></Message>  </div>
  }
  else{
    content = <div>
      <SortableTable 
        data={visibleAcademicSessionTemplates} 
        config={config} 
        keyFn={keyFn} 
        onDeleteClick={handleDeleteClick}
        isRemovingRecord={isRemovingAcademicSessionTemplate}
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
        <div className="sm:flex sm:flex-row sm:justify-between sm:items-center mt-2 mb-2">
          <h1 className="m-2">Templates</h1>
          <AcademicSessionTemplateSearch></AcademicSessionTemplateSearch>
        </div>
        {content}
      </div>
      <br></br>
      {!showAddForm && <div className='p-3'>
        <Button link onClick={handleAddCLick}>
          + Add
        </Button>
      </div> }
      {showAddForm && addAcademicSessionTemplate}
      {showUpdateForm && updateForm}
      
      {isUpdateSuccess && <Message message={'Update successfull!'} type={SUCCESS}></Message>}
      {isRemoveSuccess && <Message message={'Delete successfull!'} type={SUCCESS}></Message>}
      {showModal && modal}
    </div>
  )
}

export default AcademicSessionTemplatesList;
