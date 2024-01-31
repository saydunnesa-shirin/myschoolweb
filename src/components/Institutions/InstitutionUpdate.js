import React from 'react';
import { useState, useEffect  } from "react";
import { useSelector } from "react-redux";

import { updateInstitution} from "../../store";
import Button from '../Button';
import TextBox from '../TextBox';
import TextArea from '../TextArea';
import Dropdown from '../Dropdown';
import Label from '../Label';
import { useThunk } from "../../hooks/use-thunks";
import Message from '../Message';
import { ERROR } from '../../constants';
import Modal from '../Modal';

const InstitutionUpdate = ({data, onUpdateSuccess, onUpdateFormClose}) => {

// //Update
const initialInstitutionState = {
  id: data.id,
  name: data.name,
  address: data.address,
  countryId: data.countryId
};

const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
const [institution, setInstitution] = useState(initialInstitutionState);
const [validationError, setValidationError] = useState(false);
const [doUpdateInstitution, isUpdatingInstitution, updatingInstitutionError] = useThunk(updateInstitution);

//country dropdown
const countries = useSelector((state) => state.countries.data);
const [selection, setSelection] = useState(null);

useEffect(() => {
  if(isUpdateSuccess && !isUpdatingInstitution && !updatingInstitutionError){
    onUpdateSuccess();
  }

  if( data.countryId !== null && isUpdatingInstitution === false){
    const country = countries.filter((item) => item.id === data.countryId);
    setSelection(country[0]); 
  }
}, [isUpdatingInstitution]);

const handleSelect = (option) => {
  setSelection(option);
  setInstitution({ ...institution, countryId: option.id });
};

const handleNameChange = (event) => {
  setInstitution({ ...institution, name: event.target.value });
}

const handleAddressChange = (event) => {
  setInstitution({ ...institution, address: event.target.value });
}

function isValid(){
  if(institution.name.length === 0 || institution.address.length === 0 || institution.countryId == null){
    setValidationError(true);
    return false;
  }else{
    setValidationError(false);
    return true;
  }
}

const handlInstitutionUpdate = () => {

  const valid = isValid();
  if(valid)
  {
    setValidationError(false);
    doUpdateInstitution(institution);
    setIsUpdateSuccess(true);
    setSelection(null);
  }
}     

const actionBar = (
  <div className='flex items-center border shadow'>
      <Button secondary className='m-3'
      onClick={onUpdateFormClose}
      >Cancel</Button>
      <Button primary
      loding={isUpdatingInstitution} onClick={handlInstitutionUpdate}
      >Update</Button>
          { validationError && <p className="m-2 text-s text-red-600 dark:text-red-400">Please enter required field(s).</p> }
      
  </div>
  );

const modal = (
  <Modal onClose={onUpdateFormClose} actionBar={actionBar}>

    <div className='border shadow'>
          <h1 className="text-xl m-2">Update Institution</h1>
          <div className="sm:flex sm:items-center sm:justify-between sm:m-2 md:justify-start">
            <div className='flex items-center m-2'>
              <Label className='w-20' htmlFor="name">
                Name
              </Label>
              <TextBox id="name" value={institution.name} placeholder="XYZ" 
              onChange={handleNameChange} mandatory={validationError && institution.name.length === 0 && true}/>
            </div>
            <div className='flex items-center m-2'>
              <Label className='w-20' htmlFor="address">
                Addess
              </Label>
              <TextArea id="address" value={institution.address} 
              placeholder="XYZ" onChange={handleAddressChange} mandatory={validationError && institution.address.length === 0 && true} />
            </div>
            <div className='flex items-center m-2'>
              <Label className='w-18' htmlFor="Country">
                Country
              </Label>
              <Dropdown options={countries} value={selection} onChange={handleSelect} mandatory={validationError && institution.countryId === null && true} />
            </div>
            
            { 
              isUpdateSuccess && !isUpdatingInstitution && updatingInstitutionError && 
              <Message message={'Error updating Institution'} type={ERROR}></Message>
            }
          </div>
        </div>
  </Modal>
);

  return (
    <div>
      {modal}
    </div>
  )
}

export default InstitutionUpdate
