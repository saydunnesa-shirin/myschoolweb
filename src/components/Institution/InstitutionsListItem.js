import React from 'react';
import { useState  } from "react";

import { GoTrashcan, GoPencil } from 'react-icons/go';
import Button from '../Button';
import { removeInstitution } from '../../store';
import { useThunk } from '../../hooks/use-thunks';
import Panel from '../Panel';
import InstitutionUpdate from './InstitutionUpdate';
import Message from '../Message';
import Modal from '../Modal';

import { SUCCESS, ERROR } from '../../constants';

const InstitutionsListItem = ({institution, setIsRemoveSuccess }) => {
 
 const [showModal, setShowModal] = useState(false);
 const [showUpdateForm, setShowUpdateForm] = useState(false);
 const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
 const [doRemoveInstitution, isRemovingInstitution, removingInstitutionError] = useThunk(removeInstitution);

 //Delete
 const handleDeleteClick = () => {
    setShowModal(true);
    setIsRemoveSuccess(false);
 }

 const confirmDelete = () =>{
      doRemoveInstitution(institution);
      if(!isRemovingInstitution && !removingInstitutionError){
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
               Are you sure you want to delete this institution?
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

 let content = (
      <Panel key={institution.id}> 
            <Button className='mr-2' loding={isRemovingInstitution} onClick={handleDeleteClick}>
                  <GoTrashcan></GoTrashcan>
            </Button>
            <Button className='mr-2' onClick={handleUpdateClick}>
                  <GoPencil></GoPencil>
            </Button>
            {!isRemovingInstitution && removingInstitutionError && <Message message={'Error deleting institution'} type={ERROR}></Message> }
            {institution.name}
      </Panel>  
);
 if (showUpdateForm) {
   content = <InstitutionUpdate data={institution} onUpdateSuccess={handleUpdateSuccess} onUpdateFormClose={handleUpdateFormClose} />;
 }

return(

      <div>
            {content}
            {isUpdateSuccess && <Message message={'Update successfull!'} type={SUCCESS}></Message>}
            {showModal && modal}
      </div>
   )
}

export default InstitutionsListItem;
