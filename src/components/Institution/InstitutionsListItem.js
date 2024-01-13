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

const InstitutionsListItem = ({ institution, setIsRemoveSuccess }) => {
 
 const [popUp, setPopUp] = useState(false);
 const [showUpdateForm, setShowUpdateForm] = useState(false);
 const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
 const [doRemoveInstitution, isRemovingInstitution, removingInstitutionError] = useThunk(removeInstitution);

 const handleDeleteClick = () => {
      setPopUp(true);
      setIsRemoveSuccess(false);
 }

 const confirmDelete = () =>{
      doRemoveInstitution(institution);
      if(!isRemovingInstitution && !removingInstitutionError){
            setIsRemoveSuccess(true);
      }
 }

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
            { isUpdateSuccess && <Message message={'Update successfull!'} type={SUCCESS}></Message>}
            { popUp && <Modal setPopUp={setPopUp} entity={'Institution'} confirmDelete={confirmDelete}/>}
      </div>
      )
}

export default InstitutionsListItem;
