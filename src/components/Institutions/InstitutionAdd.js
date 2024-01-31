import React from 'react';
import { useState } from "react";
import { useSelector } from "react-redux";

import { addInstitution } from "../../store";
import { useThunk } from "../../hooks/use-thunks";

import Button from '../Button';
import TextBox from '../TextBox';
import TextArea from '../TextArea';
import Dropdown from '../Dropdown';
import Label from '../Label';
import Message from '../Message';
import { SUCCESS, ERROR } from '../../constants';

const InstitutionAdd = () => {

const initialInstitutionState = {
  name: "",
  address: "",
  countryId: null,
};

const countries = useSelector((state) => state.countries.data);

const [selection, setSelection] = useState(null);

const handleSelect = (option) => {
  setSelection(option);
  setInstitution({ ...institution, countryId: option.id });
};

//Add
const [doCreateInstitution, isCreatingInstitution, creatingInstitutionError] = useThunk(addInstitution);

const [institution, setInstitution] = useState(initialInstitutionState);
const [validationError, setValidationError] = useState(false);
const [isSubmitted, setIsSubmitted] = useState(false);

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

const handlInstitutionAdd = () => {
  const valid = isValid();
  if(valid)
  {
    setValidationError(false);
    doCreateInstitution(institution);
    setIsSubmitted(true);
    setInstitution(initialInstitutionState);
    setSelection(null);
  }
}                                       
  return (
    <div className='border shadow'>
      <h1 className="text-xl m-2">Add Institution</h1>
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
        <div className='flex items-center m-2'>
          <Button primary={true} loding={isCreatingInstitution} onClick={handlInstitutionAdd} > 
            Add
          </Button>
          { validationError && <p className="m-2 text-s text-red-600 dark:text-red-400">Please enter required field(s).</p> }
        </div>
          { isSubmitted && !isCreatingInstitution && creatingInstitutionError && <Message message={'Error creating Institution'} type={ERROR}></Message>}
          { isSubmitted && !isCreatingInstitution && !creatingInstitutionError && <Message message={'Save successfull!'} type={SUCCESS}></Message>}
      </div>
    </div>
  )
}

export default InstitutionAdd