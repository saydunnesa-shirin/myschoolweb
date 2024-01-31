import React from 'react';
import { useState  } from "react";

import { GoTrashcan, GoPencil } from 'react-icons/go';
import Button from '../Button';
import { removeEmployee } from '../../store';
import { useThunk } from '../../hooks/use-thunks';
import Panel from '../Panel';
import EmployeeUpdate from './EmployeeUpdate';
import Message from '../Message';
import Modal from '../Modal';

import { SUCCESS, ERROR } from '../../constants';

const EmployeesListItem = ({employee, setIsRemoveSuccess }) => {

 const [showModal, setShowModal] = useState(false);
 const [showUpdateForm, setShowUpdateForm] = useState(false);
 const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
 const [doRemoveEmployee, isRemovingEmployee, removingEmployeeError] = useThunk(removeEmployee);

 //Delete
 const handleDeleteClick = () => {
    setShowModal(true);
    setIsRemoveSuccess(false);
 }

 const confirmDelete = () =>{
      doRemoveEmployee(employee);
      if(!isRemovingEmployee && !removingEmployeeError){
            setIsRemoveSuccess(true);
      }
 }
  
 const handleModalClose = () => setShowModal(false);

 const actionBar = (
      <div className='flex justify-between mt-5'>
            <Button secondary
            onClick={handleModalClose}
            >No, Cancel</Button>
            <Button danger
            onClick={confirmDelete}
            >Yes, Delete</Button>
      </div>
      );

const modal = (
      <Modal onClose={handleModalClose} actionBar={actionBar}>
            <p>
               Are you sure you want to delete this employee?
            </p>
      </Modal>
  );

 //Update
 const handleUpdateClick = () => {
      setShowUpdateForm(false);
      setIsUpdateSuccess(false);
      setShowUpdateForm(!showUpdateForm);
 }

 const handleUpdateFormClose = () => setShowUpdateForm(false);

 const handleUpdateSuccess = () => {
       setShowUpdateForm(false);
       setIsUpdateSuccess(true);
 }

 const content = (
      <Panel key={employee.id}> 
            <Button className='mr-2' loding={isRemovingEmployee} onClick={handleDeleteClick}>
                  <GoTrashcan></GoTrashcan>
            </Button>
            <Button className='mr-2' onClick={handleUpdateClick}>
                  <GoPencil></GoPencil>
            </Button>
            {!isRemovingEmployee && removingEmployeeError && <Message message={'Error deleting employee'} type={ERROR}></Message> }
            {employee.firstName}

            {employee.lastName}
      </Panel>  
);

const updateModal = <EmployeeUpdate data={employee} onUpdateSuccess={handleUpdateSuccess} onUpdateFormClose={handleUpdateFormClose} />;

return(
      <div>
            {content}
            {isUpdateSuccess && <Message message={'Update successfull!'} type={SUCCESS}></Message>}
            {showUpdateForm && updateModal}
            {showModal && modal}
      </div>
   )
}

export default EmployeesListItem;
