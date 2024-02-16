import React from 'react';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchEmployees, fetchInstitutions, fetchDesignations, fetchEmployeeTypes, removeEmployee } from "../../store";
import { EmployeesAction } from "../../store/slices/employeesSlice";

import { useThunk } from "../../hooks/use-thunks";
import Skeleton from "../Skeleton";
import EmployeeAdd from "./EmployeeAdd";
import EmployeeUpdate from "./EmployeeUpdate";
import EmployeeSearch from "./EmployeeSearch";
import Message from "../Message";
import { SUCCESS, ERROR } from '../../constants';
import Paging from "../Paging";
import SortableTable from '../SortableTable';
import Button from '../Button';
import Modal from '../Modal';

const EmployeesList = () => {
  const dispatch = useDispatch();

  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const [isRemoveSuccess, setIsRemoveSuccess] = useState(false);
  const [doFetchEmployees, isLoadingEmployees, loadingEmployeesError] = useThunk(fetchEmployees);
  
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
  const [doRemoveEmployee, isRemovingEmployee, removingEmployeeError] = useThunk(removeEmployee);

  //dropdown lists
  const [doFetchInstitutions] = useThunk(fetchInstitutions);
  const [doFetchDesignations] = useThunk(fetchDesignations);
  const [doFetchEmployeeTypes] = useThunk(fetchEmployeeTypes);

 //Fetch data
  useEffect(() => {
    doFetchEmployees();
    doFetchInstitutions();
    doFetchDesignations();
    doFetchEmployeeTypes();

  }, [doFetchEmployees]);

  const { employees } = useSelector(({ employees: { data, searchTerm }}) => {
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
      employees: sortedData
    }

  }); 
  
 //Delete
 const [showModal, setShowModal] = useState(false);
 const [employee, setEmployee] = useState(null);

 const handleModalClose = () => setShowModal(false);

 const handleDeleteClick = (employee) => {
    setShowModal(true);
    setEmployee(employee);
    setIsRemoveSuccess(false);
  }

 const confirmDelete = () =>{
    doRemoveEmployee(employee);
    setShowModal(false);

    if(!isRemovingEmployee && !removingEmployeeError){
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
  
  const addEmployee = <div className='transition ease-out duration-5000'>
    <EmployeeAdd onClose={handleAddFormClose}></EmployeeAdd>
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
      <EmployeeUpdate data={employee} onClose={handleUpdateFormClose}
       onUpdateSuccess={handleUpdateSuccess} />
    </div>;

  const handleUpdateClick = async (rowData) => {
    if(showUpdateForm)
      setShowUpdateForm(false);
    await delay(200);

    setEmployee(rowData);
    setShowUpdateForm(true);
    setIsUpdateSuccess(false);
    setShowAddForm(false);
  }

  //Paging
  const dataPerPage = useSelector((state) => state.employees.dataPerPage);
  const currentPage = useSelector((state) => state.employees.currentPage);

  const totalPages = Math.ceil(employees.length / dataPerPage);
  const pages = [...Array(totalPages + 1).keys()].slice(1);
  const indexOfLastPage = currentPage * dataPerPage;
  const indexofFirstPage = indexOfLastPage - dataPerPage;

  const visibleEmployees = employees.slice(indexofFirstPage, indexOfLastPage);

  const navigatePrev = () => {
    if (currentPage !== 1) {
      dispatch(EmployeesAction.onNavigatePrev());
    }
  };

  const navigateNext = () => {
    if (currentPage !== totalPages) {
      dispatch(EmployeesAction.onNavigateNext());
    }
  };

  const handleCurrentPage = (_p) => dispatch(EmployeesAction.onClickCurrentPage(_p));

  const handleChangeDataPerpage = (e) => dispatch(EmployeesAction.onChangeTodosPerpage(e));
  
  //Table
  const config = [
    {
      label: 'Employee ID',
      render: (employee) => employee.employeeId,
      sortValue: (employee) => employee.employeeId,
    },
    {
      label: 'Country',
      render: (employee) => employee.countryName,
      sortValue: (employee) => employee.countryName,
    },
    {
      label: 'First Name',
      render: (employee) => employee.firstName,
      sortValue: (employee) => employee.firstName,
    },
    {
      label: 'Last Name',
      render: (employee) => employee.lastName,
      sortValue: (employee) => employee.lastName,
    },
    {
      label: 'Email',
      render: (employee) => employee.email,
      sortValue: (employee) => employee.email,
    },
    {
      label: 'Mobile',
      render: (employee) => employee.mobile,
      sortValue: (employee) => employee.mobile,
    },

    
  ];

  const keyFn = (employee) => {
    return employee.id;
  };

  let content;

  if(isLoadingEmployees){
    content = <Skeleton times={6} className="h-8 w-full"></Skeleton>;
  }
  else if(loadingEmployeesError){
    content = <div> <Message message={'Error fetching employees'} type={ERROR}></Message>  </div>
  }
  else{
    content = <div>
      <SortableTable 
        data={visibleEmployees} 
        config={config} 
        keyFn={keyFn} 
        onDeleteClick={handleDeleteClick}
        isRemovingRecord={isRemovingEmployee}
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
          <h1 className="text-xl m-2">Employees</h1>
          <EmployeeSearch></EmployeeSearch>
        </div>
        {content}
      </div>
      <br></br>
      {!showAddForm && <div className='p-3'>
        <Button link onClick={handleAddCLick}>
          + Employee Add
        </Button>
      </div> }
      {showAddForm && addEmployee}
      {showUpdateForm && updateForm}
      
      {isUpdateSuccess && <Message message={'Update successfull!'} type={SUCCESS}></Message>}
      {isRemoveSuccess && <Message message={'Delete successfull!'} type={SUCCESS}></Message>}
      {showModal && modal}
    </div>
  )
}

export default EmployeesList;
