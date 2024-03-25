import React from 'react';
import { useState } from "react";

import { addCountry } from "../../store";
import Button from '../Button';
import TextBox from '../TextBox';
import Label from '../Label';
import { useThunk } from "../../hooks/use-thunks";
import Message from '../Message';
import { SUCCESS, ERROR } from '../../helpers/constants';

const CountryCreate = () => {

const [doCreateCountry, isCreatingCountry, creatingCountryError] = useThunk(addCountry);
//Add

const initialCountryState = {
  name: "",
  iso2Code: ""
};

const [country, setCountry] = useState(initialCountryState);

const [validationError, setValidationError] = useState(false);
const [isSubmitted, setIsSubmitted] = useState(false);

const handleNameChange = (event) => {
  setCountry({ ...country, name: event.target.value });
}

const handleIso2CodeChange = (event) => {
  setCountry({ ...country, iso2Code: event.target.value });
}

function isValid(){
  if(country.name.length < 2 
    || country.iso2Code.length < 2 
    ){
      setValidationError(true);
      return false;
  }else{
      setValidationError(false);
      return true;
  }
}

const handlCountryAdd = (event) => {
  event.preventDefault();
  const valid = isValid();

  if(valid)
  {
    setValidationError(false);
    doCreateCountry(country);
    setIsSubmitted(true);

    //initail-setup
    setCountry(initialCountryState);
  }
}                                       
  return (
    <form className="border shadow p-2" onSubmit={handlCountryAdd}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className='flex justify-between'>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Country Add
            </h2>
          </div>
          
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2 sm:col-start-1">
              <Label>
               Country Name
              </Label>
              
              <div className="mt-2">
                <TextBox
                  autoFocus={true}
                  name="name"
                  id="name"
                  value={country.name} 
                  placeholder="Estonia" onChange={handleNameChange} 
                  mandatory={validationError && country.name.length < 2 && true}
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <Label>
              ISO Code
              </Label>
              <div className="mt-2">
                <TextBox
                  autoFocus={true}
                  name="iso2Code"
                  id="iso2Code"
                  value={country.iso2Code} 
                  placeholder="EE" onChange={handleIso2CodeChange} 
                  mandatory={validationError && country.iso2Code.length < 2 && true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-x-6">
        <Button onClick={() => setCountry(initialCountryState)} type="button" secondary>
          Cancel
        </Button>
        <Button 
        type="submit" 
        primary
        loding={isCreatingCountry} 
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
          && !isCreatingCountry 
          && creatingCountryError 
          && <Message message={'Error creating country'} type={ERROR}></Message>
        }
        { 
          isSubmitted 
          && !isCreatingCountry 
          && !creatingCountryError 
          && <Message message={'Save successfull!'} type={SUCCESS}></Message>
        }
      </div>
    </form>
  )
}

export default CountryCreate
