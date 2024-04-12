import React from 'react';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchInstitutions, removeInstitution } from "../../store";
import { InstitutionsAction } from "../../store/slices/institutionsSlice";

import { useThunk } from "../../hooks/use-thunks";
import Skeleton from "../Skeleton";
import InstitutionCreate from "./InstitutionCreate";
import InstitutionUpdate from "./InstitutionUpdate";
import InstitutionSearch from "./InstitutionSearch";
import Message from "../Message";
import { SUCCESS, ERROR } from '../../helpers/constants';
import Paging from "../Paging";
import SortableTable from '../SortableTable';
import Button from '../Button';
import Modal from '../Modal';

const InstitutionsList = () => {
  const dispatch = useDispatch();

  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const [isRemoveSuccess, setIsRemoveSuccess] = useState(false);
  const [doFetchInstitutions, isLoadingInstitutions, loadingInstitutionsError] = useThunk(fetchInstitutions);
  
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
  const [doRemoveInstitution, isRemovingInstitution, removingInstitutionError] = useThunk(removeInstitution);

 //Fetch data
  useEffect(() => {
    doFetchInstitutions();
  }, [doFetchInstitutions]);

  const { institutions } = useSelector(({ institutions: { data, searchTerm }}) => {
    let dataList = data;
    
    if(searchTerm.length !== 0){
      dataList = data.filter((item) => item.name.toLowerCase().startsWith(searchTerm.toLowerCase())); 
    }

    const sortedData = [...dataList].sort((a, b) => {
      const valueA = a.name;
      const valueB = b.name;
      // const reverseOrder = sortOrder === 'asc' ? 1 : -1;

      if (typeof valueA === 'string') {
        return valueA.localeCompare(valueB);
      } else {
        return (valueA - valueB);
      }
    });

    return {
      institutions: sortedData
    }

  }); 
  
 //Delete
 const [showModal, setShowModal] = useState(false);
 const [institution, setInstitution] = useState(null);

 const handleModalClose = () => setShowModal(false);

 const handleDeleteClick = (institution) => {
    setShowModal(true);
    setInstitution(institution);
    setIsRemoveSuccess(false);
  }

 const confirmDelete = () =>{
    doRemoveInstitution(institution);
    setShowModal(false);

    if(!isRemovingInstitution && !removingInstitutionError){
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
  
  const addInstitution = <div className='transition ease-out duration-5000'>
    <InstitutionCreate onClose={handleAddFormClose}></InstitutionCreate>
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
      <InstitutionUpdate data={institution} onClose={handleUpdateFormClose}
       onUpdateSuccess={handleUpdateSuccess} />
    </div>;

  const handleUpdateClick = async (rowData) => {
    if(showUpdateForm)
      setShowUpdateForm(false);
    await delay(200);

    setInstitution(rowData);
    setShowUpdateForm(true);
    setIsUpdateSuccess(false);
    setShowAddForm(false);
  }

  //Paging
  const dataPerPage = useSelector((state) => state.institutions.dataPerPage);
  const currentPage = useSelector((state) => state.institutions.currentPage);

  const totalPages = Math.ceil(institutions.length / dataPerPage);
  const pages = [...Array(totalPages + 1).keys()].slice(1);
  const indexOfLastPage = currentPage * dataPerPage;
  const indexofFirstPage = indexOfLastPage - dataPerPage;

  const visibleInstitutions = institutions.slice(indexofFirstPage, indexOfLastPage);

  const navigatePrev = () => {
    if (currentPage !== 1) {
      dispatch(InstitutionsAction.onNavigatePrev());
    }
  };

  const navigateNext = () => {
    if (currentPage !== totalPages) {
      dispatch(InstitutionsAction.onNavigateNext());
    }
  };

  const handleCurrentPage = (_p) => dispatch(InstitutionsAction.onClickCurrentPage(_p));

  const handleChangeDataPerpage = (e) => dispatch(InstitutionsAction.onChangeTodosPerpage(e));
  
  //Table
  const config = [
    {
      label: 'Name',
      render: (institution) => institution.name,
      sortValue: (institution) => institution.name,
    },
    {
      label: 'Country',
      render: (institution) => institution.countryName,
      sortValue: (institution) => institution.countryName,
    }
  ];

  const keyFn = (institution) => {
    return institution.id;
  };

  let content;

  if(isLoadingInstitutions){
    content = <Skeleton times={6} className="h-8 w-full"></Skeleton>;
  }
  else if(loadingInstitutionsError){
    content = <div> <Message message={'Error fetching institutions'} type={ERROR}></Message>  </div>
  }
  else{
    content = <div>
      <SortableTable 
        data={visibleInstitutions} 
        config={config} 
        keyFn={keyFn} 
        onDeleteClick={handleDeleteClick}
        isRemovingRecord={isRemovingInstitution}
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
          <h1 className="m-2">Institutions</h1>
          <InstitutionSearch></InstitutionSearch>
        </div>
        {content}
      </div>
      <br></br>
      {!showAddForm && <div className='p-3'>
        <Button link onClick={handleAddCLick}>
          + Institution Add
        </Button>
      </div> }
      {showAddForm && addInstitution}
      {showUpdateForm && updateForm}
      
      {isUpdateSuccess && <Message message={'Update successfull!'} type={SUCCESS}></Message>}
      {isRemoveSuccess && <Message message={'Delete successfull!'} type={SUCCESS}></Message>}
      {showModal && modal}
    </div>
  )
}

export default InstitutionsList;
