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
import { SUCCESS, ERROR } from '../../constants';

const CountriesListItem = ({country, setIsRemoveSuccess }) => {
 
 const [popUp, setPopUp] = useState(false);
 const [showUpdateForm, setShowUpdateForm] = useState(false);
 const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
 const [doRemoveCountry, isRemovingCountry, removingCountryError] = useThunk(removeCountry);

 const handleDeleteClick = () => {
      setPopUp(true);
      setIsRemoveSuccess(false);
 }

 const confirmDelete = () =>{
      doRemoveCountry(country);
      if(!isRemovingCountry && !removingCountryError){
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
            { isUpdateSuccess && <Message message={'Update successfull!'} type={SUCCESS}></Message>}
            { popUp && <Modal setPopUp={setPopUp} entity={'Country'} confirmDelete={confirmDelete}/>}
      </div>
      )
}

export default CountriesListItem;
