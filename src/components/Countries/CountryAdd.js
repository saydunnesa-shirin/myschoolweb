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

          <div className="flex flex-row justify items-center">
            <div className="flex flex-row justify items-center m-3">
                <Label htmlFor="name">
                  Country Name
                </Label>
                <TextBox mandatory={true} id="name" value={country.name} placeholder="XYZ" 
                onChange={handleNameChange} />
                
                <Button primary={true} loding={isCreatingCountry} onClick={handlCountryAdd}> 
                  Add
                </Button>
                { 
                  isSubmitted && !isCreatingCountry && creatingCountryError && <Message message={'Error creating Country'} type={ERROR}></Message>
                }

                { validationError && country.name.length === 0  && 
                  <p  className="m-2 text-s text-red-600 dark:text-red-400">
                    Country Name can not be empty.
                  </p>
                }
                { isSubmitted && !isCreatingCountry && !creatingCountryError && <Message message={'Save successfull!'} type={SUCCESS}></Message>}
            </div>
          </div>
    </div>
  )
}

export default CountryAdd
