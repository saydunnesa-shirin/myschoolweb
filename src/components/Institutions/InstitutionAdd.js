import React from 'react';
import { useState } from "react";
import { useSelector } from "react-redux";

import { addInstitution } from "../../store";
import { useThunk } from "../../hooks/use-thunks";

import Button from '../Button';
import TextBox from '../TextBox';
import Dropdown from '../Dropdown';
import Label from '../Label';
import Message from '../Message';
import { SUCCESS, ERROR } from '../../helpers/constants';

const InstitutionAdd = ({onClose}) => {

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

const handlInstitutionAdd = (event) => {
  event.preventDefault();
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
    <form className="border shadow p-2" onSubmit={handlInstitutionAdd}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className='flex justify-between'>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Institution Add
            </h2>
            <Button onClick={onClose}>x</Button>
          </div>
          
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4 sm:col-start-1">
              <Label>
                Name
              </Label>
              
              <div className="mt-2">
                <TextBox
                  autoFocus={true}
                  name="name"
                  id="name"
                  value={institution.name} 
                  placeholder="Tal Tech" onChange={handleNameChange} 
                  mandatory={validationError && institution.name.length < 2 && true}
                />
              </div>
            </div>
            
            <div className="sm:col-span-2">
              <Label>
                Country
              </Label>
              <div className="mt-2">
                <Dropdown 
                  options={countries} 
                  value={selection} 
                  onChange={handleSelect} 
                  mandatory={validationError && institution.countryId === null && true} 
                />
                
              </div>
            </div>
            <div className="sm:col-span-4">
              <Label>
              Address
              </Label>
              <div className="mt-2">
                <TextBox
                  name="address"
                  id="address"
                  value={institution.address} 
                  placeholder="Tallinn" onChange={handleAddressChange} 
                  mandatory={validationError && institution.address.length < 2 && true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-x-6">
        <Button onClick={onClose} type="button" secondary>
          Cancel
        </Button>
        <Button 
        type="submit" 
        primary
        loding={isCreatingInstitution} 
        >
          Save
        </Button>
        { 
          validationError 
          && <p className="m-2 text-s text-red-600 dark:text-red-400">
              Please enter required field(s).
            </p> 
        }
        { 
          isSubmitted 
          && !isCreatingInstitution 
          && creatingInstitutionError 
          && <Message message={'Error creating institution'} type={ERROR}></Message>
        }
        { 
          isSubmitted 
          && !isCreatingInstitution 
          && !creatingInstitutionError 
          && <Message message={'Save successfull!'} type={SUCCESS}></Message>
        }
      </div>
    </form>
    
  )
}

export default InstitutionAdd
