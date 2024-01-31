import React from 'react';
import { useState, useEffect  } from "react";
import { useSelector } from "react-redux";

import { updateEmployee} from "../../store";
import Button from '../Button';
import TextBox from '../TextBox';
import Dropdown from '../Dropdown';
import Label from '../Label';
import { useThunk } from "../../hooks/use-thunks";
import Message from '../Message';
import { ERROR } from '../../constants';

const EmployeeUpdate = ({data, onClose, onUpdateSuccess}) => {

// //Update
const initialEmployeeState = {
  id: data.id,
  firstName: data.firstName,
  lastName: data.lastName,
  institutionId: data.institutionId
};

const [isSubmitted, setIsSubmitted] = useState(false);
const [employee, setEmployee] = useState(initialEmployeeState);
const [validationError, setValidationError] = useState(false);
const [doUpdateEmployee, isUpdatingEmployee, updatingEmployeeError] = useThunk(updateEmployee);

//institution dropdown
const institutions = useSelector((state) => state.institutions.data);
const [selection, setSelection] = useState(null);

useEffect(() => {
  if(isSubmitted && !isUpdatingEmployee && !updatingEmployeeError){
    onUpdateSuccess();
  }

  if( data.institutionId !== null && isUpdatingEmployee === false){
    const institution = institutions.filter((item) => item.id === data.institutionId);
    setSelection(institution[0]); 
  }
}, [isUpdatingEmployee]);

const handleSelect = (option) => {
  setSelection(option);
  setEmployee({ ...employee, institutionId: option.id });
};

const handleFirstNameChange = (event) => {
  setEmployee({ ...employee, firstName: event.target.value });
}

const handleLastNameChange = (event) => {
  setEmployee({ ...employee, lastName: event.target.value });
}

function isValid(){
  if(employee.firstName.length === 0 || employee.lastName.length === 0 || employee.institutionId == null){
    setValidationError(true);
    return false;
  }else{
    setValidationError(false);
    return true;
  }
}

const handlEmployeeUpdate = () => {

  const valid = isValid();
  if(valid)
  {
    setValidationError(false);
    doUpdateEmployee(employee);
    setIsSubmitted(true);
    setSelection(null);
  }
}     

const updateForm = (
  <div className='border shadow'>
      <div className='flex justify-between text-xl m-2'>
        <h1>Update Employee</h1>
        <Button onClick={onClose}>x</Button>
      </div>
      <div className="sm:flex sm:items-center sm:justify-between sm:m-2 md:justify-start">
        <div className='flex items-center m-2'>
          <Label className='w-20' htmlFor="firstName">
            First Name
          </Label>
          <TextBox id="firstName" value={employee.firstName} placeholder="XYZ" 
          onChange={handleFirstNameChange} mandatory={validationError && employee.firstName.length === 0 && true}/>
        </div>
        <div className='flex items-center m-2'>
          <Label className='w-20' htmlFor="lastName">
            Last Name
          </Label>
          <TextBox id="lastName" value={employee.lastName} 
          placeholder="XYZ" onChange={handleLastNameChange} mandatory={validationError && employee.lastName.length === 0 && true} />
        </div>
        <div className='flex items-center m-2'>
          <Label className='w-18' htmlFor="Country">
            Institution
          </Label>
          <Dropdown options={institutions} value={selection} onChange={handleSelect} 
            mandatory={validationError && employee.institutionId === null && true} />
        </div>
        <div className='flex items-center m-2'>
          <Button primary={true} loding={isUpdatingEmployee} onClick={handlEmployeeUpdate} > 
            Update
          </Button>
          { validationError && <p className="m-2 text-s text-red-600 dark:text-red-400">Please enter required field(s).</p> }
        </div>
        
        { 
          isSubmitted && !isUpdatingEmployee && updatingEmployeeError && 
          <Message message={'Error updating Employee'} type={ERROR}></Message>
        }
      </div>
  </div>
);

  return (
    <div>
      {updateForm}
    </div>
  )
}

export default EmployeeUpdate
