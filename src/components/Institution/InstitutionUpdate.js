import React from 'react';
import { useState, useEffect  } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateInstitution, changeInstitutionName, setInstitutionUpdateForm, resetInstitutionForm } from "../../store";
import Button from '../Button';
import TextBox from '../TextBox';
import Label from '../Label';
import { useThunk } from "../../hooks/use-thunks";
import Message from '../Message';
import { ERROR } from '../../constants';

const InstitutionUpdate = ({data, onUpdateSuccess, onUpdateFormClose}) => {
const dispatch = useDispatch();

const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);

const [doUpdateInstitution, isUpdatingInstitution, updatingInstitutionError] = useThunk(updateInstitution);
        
const { id, name } = useSelector((state)=>{
  return state.institutionForm;
});
// //Update
// const initialInstitutionState = {
//   id: data.id,
//   name: data.name
// };

// const [institution, setInstitution] = useState(initialInstitutionState);

const handleNameChange = (event) => {
  dispatch(changeInstitutionName(event.target.value));

  // setInstitution({ ...institution, name: event.target.value });
}

useEffect(() => {
  dispatch(setInstitutionUpdateForm(data));

  if(isUpdateSuccess && !isUpdatingInstitution && !updatingInstitutionError){
    dispatch(resetInstitutionForm());
    onUpdateSuccess();
  }
}, [isUpdatingInstitution]);

const handlInstitutionUpdate = () => {
  doUpdateInstitution({id, name});
  setIsUpdateSuccess(true);
}                                       
  return (
    <div>
          <div className="flex flex-rows justify items-center">
            <div className=" flex justify items-center m-3">
                <Label htmlFor="name">
                  Institution Name
                </Label>
                <TextBox mandatory={true} id="name" value={name} placeholder="XYZ" 
                onChange={handleNameChange} />

                <Button primary={true} loding={isUpdatingInstitution} onClick={handlInstitutionUpdate}> 
                  Update
                </Button>

                <Button secondary={true} className="ml-2" onClick={onUpdateFormClose}> 
                  Cancel
                </Button>
                { 
                  isUpdateSuccess && !isUpdatingInstitution && updatingInstitutionError && 
                  <Message message={'Error updating institution'} type={ERROR}></Message>
                }
            </div>
          </div>
    </div>
  )
}

export default InstitutionUpdate
