import React from 'react';
import { useState } from "react";

import { addCountry } from "../../store";
import Button from '../Button';
import TextBox from '../TextBox';
import Label from '../Label';
import { useThunk } from "../../hooks/use-thunks";
import Message from '../Message';
import { SUCCESS, ERROR } from '../../constants';

const CountryAdd = () => {

const [doCreateCountry, isCreatingCountry, creatingCountryError] = useThunk(addCountry);
//Add

const initialCountryState = {
  name: ""
};

const [country, setCountry] = useState(initialCountryState);

const [validationError, setValidationError] = useState(false);
const [isSubmitted, setIsSubmitted] = useState(false);

const handleNameChange = (event) => {
  setCountry({ ...country, name: event.target.value });
}

const handlCountryAdd = () => {

  if(country.name.length === 0)
    setValidationError(true);
  else{
    setValidationError(false);
    doCreateCountry(country);
    setIsSubmitted(true);

    setCountry(initialCountryState);
  }
}                                       
  return (
    <div>
        <h1 className="text-xl mb-2">Add Country</h1>
        <div className="flex justify items-baseline m-3">
          <div className='flex justify-left m-2'>
            <Label htmlFor="name">
                Name
            </Label>
            <TextBox id="name" value={country.name} placeholder="XYZ" 
            onChange={handleNameChange} mandatory={validationError && country.name.length === 0 && true} />
          </div>
          <div className='flex justify-center m-2'>
            <Button primary={true} loding={isCreatingCountry} onClick={handlCountryAdd}> 
              Add
            </Button>
            { validationError && <p className="m-2 text-s text-red-600 dark:text-red-400">Please enter required field(s).</p> }
          </div>
          { isSubmitted && !isCreatingCountry && creatingCountryError && <Message message={'Error creating Country'} type={ERROR}></Message>}
          { isSubmitted && !isCreatingCountry && !creatingCountryError && <Message message={'Save successfull!'} type={SUCCESS}></Message>}
        </div>
    </div>
  )
}

export default CountryAdd
