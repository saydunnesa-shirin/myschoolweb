import React from 'react';
import { useState } from "react";
import { useSelector } from "react-redux";

import { addEmployee } from "../../store";
import { useThunk } from "../../hooks/use-thunks";

import Button from '../Button';
import TextBox from '../TextBox';
import Dropdown from '../Dropdown';
import Label from '../Label';
import Message from '../Message';
import { SUCCESS, ERROR } from '../../constants';

const EmployeeAdd = ({onClose}) => {

const initialEmployeeState = {
  firstName: "",
  lastName: "",
  institutionId: null,
};

const institutions = useSelector((state) => state.institutions.data);

const [selection, setSelection] = useState(null);

const handleInstitutionSelect = (option) => {
  setSelection(option);
  setEmployee({ ...employee, institutionId: option.id });
};

//Add
const [doCreateEmployee, isCreatingEmployee, creatingEmployeeError] = useThunk(addEmployee);

const [employee, setEmployee] = useState(initialEmployeeState);
const [validationError, setValidationError] = useState(false);
const [isSubmitted, setIsSubmitted] = useState(false);

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

const handlEmployeeAdd = () => {
  const valid = isValid();
  if(valid)
  {
    setValidationError(false);
    doCreateEmployee(employee);
    setIsSubmitted(true);
    setEmployee(initialEmployeeState);
    setSelection(null);
  }
}                                       
  return (
    <div className='border shadow'>
      <div className='flex justify-between text-xl m-2'>
            <h1>Add Employee</h1>
            <Button onClick={onClose}>x</Button>
          </div>
      <div className="sm:flex sm:items-center sm:justify-between sm:m-2 md:justify-start">
        <div className='flex items-center m-2'>
          <Label className='w-20' htmlFor="firstName">
            First Name
          </Label>
          <TextBox autoFocus={true} id="firstName" value={employee.firstName} placeholder="XYZ" 
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
          <Dropdown options={institutions} value={selection} onChange={handleInstitutionSelect} mandatory={validationError && employee.institutionId === null && true} />
        </div>
        <div className='flex items-center m-2'>
          <Button primary={true} loding={isCreatingEmployee} onClick={handlEmployeeAdd} > 
            Add
          </Button>
          { validationError && <p className="m-2 text-s text-red-600 dark:text-red-400">Please enter required field(s).</p> }
        </div>
          { isSubmitted && !isCreatingEmployee && creatingEmployeeError && <Message message={'Error creating Employee'} type={ERROR}></Message>}
          { isSubmitted && !isCreatingEmployee && !creatingEmployeeError && <Message message={'Save successfull!'} type={SUCCESS}></Message>}
      </div>
    </div>
  )
}

export default EmployeeAdd
