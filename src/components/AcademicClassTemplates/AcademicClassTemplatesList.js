import React from 'react';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchAcademicClassTemplates, removeAcademicClassTemplate, getEmployeeById } from "../../store";
import { AcademicClassTemplatesAction } from "../../store/slices/academicClassTemplatesSlice";

import { useThunk } from "../../hooks/use-thunks";
import Skeleton from "../Skeleton";
import AcademicClassTemplateCreate from "./AcademicClassTemplateCreate";
import AcademicClassTemplateUpdate from "./AcademicClassTemplateUpdate";
import AcademicClassTemplateSearch from "./AcademicClassTemplateSearch";
import Message from "../Message";
import { SUCCESS, ERROR, LOGGED_IN_USER_ID } from '../../helpers/constants';
import Paging from "../Paging";
import SortableTable from '../SortableTable';
import Button from '../Button';
import Modal from '../Modal';

const AcademicClassTemplatesList = () => {
  const dispatch = useDispatch();

  const [doFetchUser, isLoadingUser, loadingUserError] = useThunk(getEmployeeById);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const [isRemoveSuccess, setIsRemoveSuccess] = useState(false);
  const [doFetchAcademicClassTemplates, isLoadingAcademicClassTemplates, loadingAcademicClassTemplatesError] = useThunk(fetchAcademicClassTemplates);
  
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
  const [doRemoveAcademicClassTemplate, isRemovingAcademicClassTemplate, removingAcademicClassTemplateError] = useThunk(removeAcademicClassTemplate);


  const user = useSelector((state) => state.employees.employee);
  const getInstitution = async () => {
    doFetchUser(LOGGED_IN_USER_ID);
    if(user != null)
      doFetchAcademicClassTemplates({institutionId: user.institutionId});
  }

 //Fetch data
  useEffect(() => {
    if(user != null){
      doFetchAcademicClassTemplates({institutionId: user.institutionId});
    }
    else{
      getInstitution();
    }
  }, [user]);

  const { academicClassTemplates } = useSelector(({ academicClassTemplates: { data, searchTerm }}) => {
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
      academicClassTemplates: sortedData
    }
  }); 
  
 //Delete
 const [showModal, setShowModal] = useState(false);
 const [academicClassTemplate, setAcademicClassTemplate] = useState(null);

 const handleModalClose = () => setShowModal(false);

 const handleDeleteClick = (academicClassTemplate) => {
    setShowModal(true);
    setAcademicClassTemplate(academicClassTemplate);
    setIsRemoveSuccess(false);
  }

 const confirmDelete = () =>{
    doRemoveAcademicClassTemplate(academicClassTemplate);
    setShowModal(false);

    if(!isRemovingAcademicClassTemplate && !removingAcademicClassTemplateError){
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
  
  const addAcademicClassTemplate = <div className='transition ease-out duration-5000'>
    <AcademicClassTemplateCreate onClose={handleAddFormClose}></AcademicClassTemplateCreate>
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
      <AcademicClassTemplateUpdate data={academicClassTemplate} onClose={handleUpdateFormClose}
       onUpdateSuccess={handleUpdateSuccess} />
    </div>;

  const handleUpdateClick = async (rowData) => {
    if(showUpdateForm)
      setShowUpdateForm(false);
    await delay(200);

    setAcademicClassTemplate(rowData);
    setShowUpdateForm(true);
    setIsUpdateSuccess(false);
    setShowAddForm(false);
  }

  //Paging
  const dataPerPage = useSelector((state) => state.academicClassTemplates.dataPerPage);
  const currentPage = useSelector((state) => state.academicClassTemplates.currentPage);

  const totalPages = Math.ceil(academicClassTemplates.length / dataPerPage);
  const pages = [...Array(totalPages + 1).keys()].slice(1);
  const indexOfLastPage = currentPage * dataPerPage;
  const indexofFirstPage = indexOfLastPage - dataPerPage;

  const visibleAcademicClassTemplates = academicClassTemplates.slice(indexofFirstPage, indexOfLastPage);

  const navigatePrev = () => {
    if (currentPage !== 1) {
      dispatch(AcademicClassTemplatesAction.onNavigatePrev());
    }
  };

  const navigateNext = () => {
    if (currentPage !== totalPages) {
      dispatch(AcademicClassTemplatesAction.onNavigateNext());
    }
  };

  const handleCurrentPage = (_p) => dispatch(AcademicClassTemplatesAction.onClickCurrentPage(_p));

  const handleChangeDataPerpage = (e) => dispatch(AcademicClassTemplatesAction.onChangeTodosPerpage(e));
  
  //Table
  const config = [
    {
      label: 'Template',
      render: (academicClassTemplate) => academicClassTemplate.templateName,
      sortValue: (academicClassTemplate) => academicClassTemplate.templateName,
    }
  ];

  const keyFn = (academicClassTemplate) => {
    return academicClassTemplate.id;
  };

  let content;

  if(isLoadingAcademicClassTemplates){
    content = <Skeleton times={6} className="h-8 w-full"></Skeleton>;
  }
  else if(loadingAcademicClassTemplatesError || loadingUserError){
    content = <div> <Message message={'Error fetching academic session templates'} type={ERROR}></Message>  </div>
  }
  else{
    content = <div>
      <SortableTable 
        data={visibleAcademicClassTemplates} 
        config={config} 
        keyFn={keyFn} 
        onDeleteClick={handleDeleteClick}
        isRemovingRecord={isRemovingAcademicClassTemplate}
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
          <AcademicClassTemplateSearch></AcademicClassTemplateSearch>
        </div>
        {content}
      </div>
      <br></br>
      {!showAddForm && <div className='p-3'>
        <Button link onClick={handleAddCLick}>
          + Add
        </Button>
      </div> }
      {showAddForm && addAcademicClassTemplate}
      {showUpdateForm && updateForm}
      
      {isUpdateSuccess && <Message message={'Update successfull!'} type={SUCCESS}></Message>}
      {isRemoveSuccess && <Message message={'Delete successfull!'} type={SUCCESS}></Message>}
      {showModal && modal}
    </div>
  )
}

export default AcademicClassTemplatesList;
