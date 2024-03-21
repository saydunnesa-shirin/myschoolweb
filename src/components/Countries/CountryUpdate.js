import React from 'react';
import { useState, useEffect  } from "react";

import { updateCountry } from "../../store";
import Button from '../Button';
import TextBox from '../TextBox';
import Label from '../Label';
import { useThunk } from "../../hooks/use-thunks";
import Message from '../Message';
import { ERROR } from '../../helpers/constants';
import { displayErrorMessage } from '../../helpers/utils';

const CountryUpdate = ({data, onUpdateSuccess, onUpdateFormClose}) => {

const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);

const [doUpdateCountry, isUpdatingCountry, updatingCountryError] = useThunk(updateCountry);

// //Update
const initialCountryState = {
  id: data.id,
  name: data.name,
  iso2Code: data.iso2Code
};

const [country, setCountry] = useState(initialCountryState);
const [validationError, setValidationError] = useState(false);

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

useEffect(() => {
  if(isUpdateSuccess && !isUpdatingCountry && !updatingCountryError){
    onUpdateSuccess();
  }
}, [isUpdatingCountry]);

const handlCountryUpdate = (event) => {
  event.preventDefault();
  const valid = isValid();

  if(valid)
  {
    setValidationError(false);
    doUpdateCountry(country);
    setIsUpdateSuccess(true);
  }
}        

  return (
    <form className="border shadow p-2" onSubmit={handlCountryUpdate}>
    <div className="space-y-12">
      <div className="border-b border-gray-900/10 pb-12">
        
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
          <div className="sm:col-span-2">
              <div className="flex justify mt-8">
                <div className='mr-4'>
                  <Button onClick={onUpdateFormClose} type="button" secondary>
                    Cancel
                  </Button>
                </div>
                  <Button 
                  type="submit" 
                  primary
                  loding={isUpdatingCountry} 
                  >
                    Save
                  </Button>
                </div>
            </div>
            <div className="sm:col-span-2">
              { 
                validationError 
                && <p className="m-2 text-s text-red-600 dark:text-red-400">
                    Please enter required field(s).
                  </p> 
              }
              { 
                !isUpdatingCountry 
                && updatingCountryError 
                && <Message 
                      message={displayErrorMessage(updatingCountryError.message, 'Error updating country')} 
                      type={ERROR}
                    ></Message>
              }
            </div>
        </div>
      </div>
    </div>

    
  </form>

    // <div>
    //       <div className="flex justify items-baseline m-3">
    //         <div className='flex justify-left m-2'>
    //           <Label htmlFor="name">
    //               Name
    //           </Label>
    //           <TextBox id="name" value={country.name} placeholder="XYZ" 
    //             onChange={handleNameChange} mandatory={validationError && country.name.length === 0 && true} />
    //         </div>
    //         <div className='flex justify-center m-2'>
    //         <Button primary={true} loding={isUpdatingCountry} onClick={handlCountryUpdate}> 
    //               Update
    //             </Button>

    //             <Button secondary={true} className="ml-2" onClick={onUpdateFormClose}> 
    //               Cancel
    //             </Button>
    //         </div>
    //         { 
    //           isUpdateSuccess && !isUpdatingCountry && updatingCountryError && 
    //           <Message message={'Error updating Country'} type={ERROR}></Message>
    //         }
    //     </div>
    // </div>
  )
}

export default CountryUpdate
