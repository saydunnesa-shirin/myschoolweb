import React from 'react';
import { useState  } from "react";

import { GoTrashcan, GoPencil } from 'react-icons/go';
import Button from '../Button';
import { removeCountry } from '../../store';
import { useThunk } from '../../hooks/use-thunks';
import Panel from '../Panel';
import CountryUpdate from './CountryUpdate';
import Message from '../Message';
import Modal from '../Modal';

import { SUCCESS, ERROR } from '../../helpers/constants';

const CountriesListItem = ({country, setIsRemoveSuccess }) => {
 
 const [showModal, setShowModal] = useState(false);
 const [showUpdateForm, setShowUpdateForm] = useState(false);
 const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
 const [doRemoveCountry, isRemovingCountry, removingCountryError] = useThunk(removeCountry);

 //Delete
 const handleDeleteClick = () => {
    setShowModal(true);
    setIsRemoveSuccess(false);
 }

 const confirmDelete = () =>{
      doRemoveCountry(country);
      if(!isRemovingCountry && !removingCountryError){
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
               Are you sure you want to delete this country?
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
      <Panel key={country.id}> 
            <Button className='mr-2' loding={isRemovingCountry} onClick={handleDeleteClick}>
                  <GoTrashcan></GoTrashcan>
            </Button>
            <Button className='mr-2' onClick={handleUpdateClick}>
                  <GoPencil></GoPencil>
            </Button>
            {!isRemovingCountry && removingCountryError && <Message message={'Error deleting country'} type={ERROR}></Message> }
            {country.name}
      </Panel>  
);
 if (showUpdateForm) {
   content = <CountryUpdate data={country} onUpdateSuccess={handleUpdateSuccess} onUpdateFormClose={handleUpdateFormClose} />;
 }

return(

      <div>
            {content}
            {isUpdateSuccess && <Message message={'Update successfull!'} type={SUCCESS}></Message>}
            {showModal && modal}
      </div>
   )
}

export default CountriesListItem;
