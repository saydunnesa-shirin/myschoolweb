import React from 'react';
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { addInstitution, resetInstitutionForm, changeInstitutionName } from "../../store";
import Button from '../Button';
import TextBox from '../TextBox';
import Label from '../Label';
import { useThunk } from "../../hooks/use-thunks";
import Message from '../Message';
import { SUCCESS, ERROR } from '../../constants';

const InstitutionAdd = () => {

const dispatch = useDispatch();

const [doCreateInstitution, isCreatingInstitution, creatingInstitutionError] = useThunk(addInstitution);
//Add

// const initialInstitutionState = {
//   name: ""
// };

const { name } = useSelector((state)=>{
  return state.institutionForm;
});

// const [institution, setInstitution] = useState(initialInstitutionState);


const [validationError, setValidationError] = useState(false);
const [isSubmitted, setIsSubmitted] = useState(false);



const handleNameChange = (event) => {
  dispatch(changeInstitutionName(event.target.value));
  //setInstitution({ ...institution, name: event.target.value });
}

const handlInstitutionAdd = () => {

  if(name.length === 0)
    setValidationError(true);
  else{
    setValidationError(false);
    doCreateInstitution({name});
    setIsSubmitted(true);
    dispatch(resetInstitutionForm());

    // setInstitution(initialInstitutionState);
  }
}                                       
  return (
    <div>
          <h1 className="text-xl mb-2">Add Institution</h1>

          <div className="flex flex-row justify items-center">
            <div className="flex flex-row justify items-center m-3">
                <Label htmlFor="name">
                  Institution Name
                </Label>
                <TextBox mandatory={true} id="name" value={name} placeholder="XYZ" 
                onChange={handleNameChange} />
                
                <Button primary={true} loding={isCreatingInstitution} onClick={handlInstitutionAdd}> 
                  Add
                </Button>
                { 
                  isSubmitted && !isCreatingInstitution && creatingInstitutionError && <Message message={'Error creating institution'} type={ERROR}></Message>
                }

                { validationError && name.length === 0  && 
                  <p  className="m-2 text-s text-red-600 dark:text-red-400">
                    Institution Name can not be empty.
                  </p>
                }
                { isSubmitted && !isCreatingInstitution && !creatingInstitutionError && <Message message={'Save successfull!'} type={SUCCESS}></Message>}
            </div>
          </div>
    </div>
  )
}

export default InstitutionAdd
