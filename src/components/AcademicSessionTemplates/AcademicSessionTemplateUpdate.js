import React from 'react';
import { useState, useEffect  } from "react";
import { useSelector } from "react-redux";

import { updateAcademicSessionTemplate} from "../../store";
import Button from '../Button';
import TextBox from '../TextBox';
import Label from '../Label';
import { useThunk } from "../../hooks/use-thunks";
import Message from '../Message';
import { ERROR } from '../../helpers/constants';

const AcademicSessionTemplateUpdate = ({data, onClose, onUpdateSuccess}) => {

const user = useSelector((state) => state.employees.employee);
// //Update
const initialAcademicSessionTemplateState = {
  id: data.id,
  templateName: data.templateName,
  institutionId: user.institutionId
};

const [isSubmitted, setIsSubmitted] = useState(false);
const [academicSessionTemplate, setAcademicSessionTemplate] = useState(initialAcademicSessionTemplateState);
const [validationError, setValidationError] = useState(false);
const [doUpdateAcademicSessionTemplate, isUpdatingAcademicSessionTemplate, updatingAcademicSessionTemplateError] = useThunk(updateAcademicSessionTemplate);

useEffect(() => {
  if(isSubmitted && !isUpdatingAcademicSessionTemplate && !updatingAcademicSessionTemplateError){
    onUpdateSuccess();
  }
}, [isUpdatingAcademicSessionTemplate]);


const handleTemplateNameChange = (event) => {
  setAcademicSessionTemplate({ ...academicSessionTemplate, templateName: event.target.value });
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

const handlAcademicSessionTemplateUpdate = (event) => {
  event.preventDefault();
  const valid = isValid();
  
  if(valid)
  {
    setValidationError(false);
    doUpdateAcademicSessionTemplate(academicSessionTemplate);
    setIsSubmitted(true);
  }
}     
  return (
    <div>
      <form className="border shadow p-2" onSubmit={handlAcademicSessionTemplateUpdate}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className='flex justify-between'>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Update
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
                    className="templateName"
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
          loding={isUpdatingAcademicSessionTemplate} 
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
            && !isUpdatingAcademicSessionTemplate 
            && updatingAcademicSessionTemplateError 
            && <Message message={'Error creating academicSessionTemplate'} type={ERROR}></Message>
          }
        </div>
      </form>
    </div>
  )
}

export default AcademicSessionTemplateUpdate
