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

const handleNameChange = (event) => {

  setCountry({ ...country, name: event.target.value });
}

useEffect(() => {
  if(isUpdateSuccess && !isUpdatingCountry && !updatingCountryError){
    onUpdateSuccess();
  }
}, [isUpdatingCountry]);

const handlCountryUpdate = () => {
  doUpdateCountry(country);
  setIsUpdateSuccess(true);
}                                       
  return (
    <div>
          <div className="flex flex-rows justify items-center">
            <div className=" flex justify items-center m-3">
                <Label htmlFor="name">
                  Country Name
                </Label>
                <TextBox mandatory={true} id="name" value={country.name} placeholder="XYZ" 
                onChange={handleNameChange} />

                <Button primary={true} loding={isUpdatingCountry} onClick={handlCountryUpdate}> 
                  Update
                </Button>

                <Button secondary={true} className="ml-2" onClick={onUpdateFormClose}> 
                  Cancel
                </Button>
                { 
                  isUpdateSuccess && !isUpdatingCountry && updatingCountryError && 
                  <Message message={'Error updating Country'} type={ERROR}></Message>
                }
            </div>
          </div>
    </div>
  )
}

export default CountryUpdate
