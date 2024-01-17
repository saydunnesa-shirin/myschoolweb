import React from 'react';
import { useState, useEffect  } from "react";

import { updateInstitution } from "../../store";
import Button from '../Button';
import TextBox from '../TextBox';
import Label from '../Label';
import { useThunk } from "../../hooks/use-thunks";
import Message from '../Message';
import { ERROR } from '../../constants';

const InstitutionUpdate = ({data, onUpdateSuccess, onUpdateFormClose}) => {

const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);

const [doUpdateInstitution, isUpdatingInstitution, updatingInstitutionError] = useThunk(updateInstitution);

// //Update
const initialInstitutionState = {
  id: data.id,
  name: data.name,
  type: data.type
};

const [country, setInstitution] = useState(initialInstitutionState);

const handleNameChange = (event) => {

  setInstitution({ ...country, name: event.target.value });
}

useEffect(() => {
  if(isUpdateSuccess && !isUpdatingInstitution && !updatingInstitutionError){
    onUpdateSuccess();
  }
}, [isUpdatingInstitution]);

const handlInstitutionUpdate = () => {
  doUpdateInstitution(country);
  setIsUpdateSuccess(true);
}                                       
  return (
    <div>
          <div className="flex flex-rows justify items-center">
            <div className=" flex justify items-center m-3">
                <Label htmlFor="name">
                  Institution Name
                </Label>
                <TextBox mandatory={true} id="name" value={country.name} placeholder="XYZ" 
                onChange={handleNameChange} />

                <Button primary={true} loding={isUpdatingInstitution} onClick={handlInstitutionUpdate}> 
                  Update
                </Button>

                <Button secondary={true} className="ml-2" onClick={onUpdateFormClose}> 
                  Cancel
                </Button>
                { 
                  isUpdateSuccess && !isUpdatingInstitution && updatingInstitutionError && 
                  <Message message={'Error updating Institution'} type={ERROR}></Message>
                }
            </div>
          </div>
    </div>
  )
}

export default InstitutionUpdate
