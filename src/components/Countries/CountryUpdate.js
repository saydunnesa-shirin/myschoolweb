import React from 'react';
import { useState, useEffect  } from "react";

import { updateCountry } from "../../store";
import Button from '../Button';
import TextBox from '../TextBox';
import Label from '../Label';
import { useThunk } from "../../hooks/use-thunks";
import Message from '../Message';
import { ERROR } from '../../constants';

const CountryUpdate = ({data, onUpdateSuccess, onUpdateFormClose}) => {

const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);

const [doUpdateCountry, isUpdatingCountry, updatingCountryError] = useThunk(updateCountry);

// //Update
const initialCountryState = {
  id: data.id,
  name: data.name,
  type: data.type
};

const [country, setCountry] = useState(initialCountryState);
const [validationError, setValidationError] = useState(false);

const handleNameChange = (event) => {
  setCountry({ ...country, name: event.target.value });
}

useEffect(() => {
  if(isUpdateSuccess && !isUpdatingCountry && !updatingCountryError){
    onUpdateSuccess();
  }
}, [isUpdatingCountry]);

const handlCountryUpdate = () => {
  if(country.name.length === 0)
    setValidationError(true);
  else{
    setValidationError(false);
    doUpdateCountry(country);
    setIsUpdateSuccess(true);
  }
}                                       
  return (
    <div>
          <div className="flex justify items-baseline m-3">
            <div className='flex justify-left m-2'>
              <Label htmlFor="name">
                  Name
              </Label>
              <TextBox id="name" value={country.name} placeholder="XYZ" 
                onChange={handleNameChange} mandatory={validationError && country.name.length === 0 && true} />
            </div>
            <div className='flex justify-center m-2'>
            <Button primary={true} loding={isUpdatingCountry} onClick={handlCountryUpdate}> 
                  Update
                </Button>

                <Button secondary={true} className="ml-2" onClick={onUpdateFormClose}> 
                  Cancel
                </Button>
            </div>
            { 
              isUpdateSuccess && !isUpdatingCountry && updatingCountryError && 
              <Message message={'Error updating Country'} type={ERROR}></Message>
            }
        </div>
    </div>
  )
}

export default CountryUpdate
