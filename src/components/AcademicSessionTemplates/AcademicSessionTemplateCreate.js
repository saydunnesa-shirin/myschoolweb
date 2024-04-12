import React from 'react';
import { useState } from "react";
import { useSelector } from "react-redux";

import { addAcademicSessionTemplate } from "../../store";
import { useThunk } from "../../hooks/use-thunks";

import Button from '../Button';
import TextBox from '../TextBox';
import Label from '../Label';
import Message from '../Message';
import { SUCCESS, ERROR } from '../../helpers/constants';

const AcademicSessionTemplateCreate = ({onClose}) => {
const user = useSelector((state) => state.employees.employee);

console.log(user);

const initialAcademicSessionTemplateState = {
  institutionId: user? user.institutionId: null,
  templateName: ""
};
//Add
const [doCreateAcademicSessionTemplate, isCreatingAcademicSessionTemplate, creatingAcademicSessionTemplateError] = useThunk(addAcademicSessionTemplate);

const [academicSessionTemplate, setAcademicSessionTemplate] = useState(initialAcademicSessionTemplateState);
const [validationError, setValidationError] = useState(false);
const [isSubmitted, setIsSubmitted] = useState(false);

const handleTemplateNameChange = (event) => {
  setAcademicSessionTemplate({ 
      ...academicSessionTemplate, 
      templateName: event.target.value
    });
}

function isValid(){
  if(academicSessionTemplate.templateName.length === 0){
    setValidationError(true);
    return false;
  }else{
    setValidationError(false);
    return true;
  }
}

const handlAcademicSessionTemplateAdd = (event) => {
  event.preventDefault();
  const valid = isValid();
  
  if(valid)
  {
    setValidationError(false);
    doCreateAcademicSessionTemplate(academicSessionTemplate);
    setIsSubmitted(true);
    setAcademicSessionTemplate(initialAcademicSessionTemplateState);
  }
}   

  return (
    <form className="border shadow p-2" onSubmit={handlAcademicSessionTemplateAdd}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className='flex justify-between'>
            <h2 className="text-gray-900">
              Add
            </h2>
            <Button onClick={onClose}>x</Button>
          </div>
          
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3 sm:col-start-1">
              <Label>
                Template
              </Label>
              
              <div className="mt-2">
                <TextBox
                  autoFocus={true}
                  name="templateName"
                  id="templateName"
                  value={academicSessionTemplate.templateName} 
                  placeholder="Class I" onChange={handleTemplateNameChange} 
                  mandatory={validationError && academicSessionTemplate.templateName.length < 2 && true}
                />
              </div>
            </div>
            
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-x-6">
        <Button onClick={onClose} type="button" secondary>
          Cancel
        </Button>
        <Button 
        type="submit" 
        primary
        loding={isCreatingAcademicSessionTemplate} 
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
          && !isCreatingAcademicSessionTemplate 
          && creatingAcademicSessionTemplateError 
          && <Message message={'Error creating academic session template'} type={ERROR}></Message>
        }
        { 
          isSubmitted 
          && !isCreatingAcademicSessionTemplate 
          && !creatingAcademicSessionTemplateError 
          && <Message message={'Save successfull!'} type={SUCCESS}></Message>
        }
      </div>
    </form>
    
  )
}

export default AcademicSessionTemplateCreate
