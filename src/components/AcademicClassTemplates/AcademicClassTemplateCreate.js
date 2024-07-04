import React from 'react';
import { useState } from "react";
import { useSelector } from "react-redux";

import { addAcademicClassTemplate } from "../../store";
import { useThunk } from "../../hooks/use-thunks";

import Button from '../Button';
import TextBox from '../TextBox';
import Label from '../Label';
import Message from '../Message';
import { SUCCESS, ERROR } from '../../helpers/constants';

const AcademicClassTemplateCreate = ({onClose}) => {
const user = useSelector((state) => state.employees.employee);

const initialAcademicClassTemplateState = {
  institutionId: user? user.institutionId: null,
  templateName: "",
  serialNo:0
};
//Add
const [doCreateAcademicClassTemplate, isCreatingAcademicClassTemplate, creatingAcademicClassTemplateError] = useThunk(addAcademicClassTemplate);

const [academicClassTemplate, setAcademicClassTemplate] = useState(initialAcademicClassTemplateState);
const [validationError, setValidationError] = useState(false);
const [isSubmitted, setIsSubmitted] = useState(false);

const handleTemplateNameChange = (event) => {
  setAcademicClassTemplate({ 
      ...academicClassTemplate, 
      templateName: event.target.value
    });
}

const handleSerialNoChange = (event) => {
  setAcademicClassTemplate({ 
      ...academicClassTemplate, 
      serialNo: event.target.value
    });
}

function isValid(){
  if(academicClassTemplate.templateName.length === 0){
    setValidationError(true);
    return false;
  }
  else if(academicClassTemplate.serialNo < 1){
    setValidationError(true);
    return false;
  }
  else{
    setValidationError(false);
    return true;
  }
}

const handlAcademicClassTemplateAdd = (event) => {
  event.preventDefault();
  const valid = isValid();
  
  if(valid)
  {
    setValidationError(false);
    doCreateAcademicClassTemplate(academicClassTemplate);
    setIsSubmitted(true);
    setAcademicClassTemplate(initialAcademicClassTemplateState);
  }
}   

  return (
    <form className="border shadow p-2" onSubmit={handlAcademicClassTemplateAdd}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className='flex justify-between'>
            <h2 className="text-gray-900">
              Add
            </h2>
            <Button onClick={onClose}>x</Button>
          </div>
          
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2 sm:col-start-1">
              <Label>
                Template
              </Label>
              
              <div className="mt-2">
                <TextBox
                  autoFocus={true}
                  name="templateName"
                  id="templateName"
                  value={academicClassTemplate.templateName} 
                  placeholder="Class I" onChange={handleTemplateNameChange} 
                  mandatory={validationError && academicClassTemplate.templateName.length < 2 && true}
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <Label>
                Serial No.
              </Label>
              
              <div className="mt-2">
                <TextBox
                  type="number"
                  name="serialNo"
                  id="serialNo"
                  value={academicClassTemplate.serialNo} 
                  placeholder="1" onChange={handleSerialNoChange} 
                  min={0}
                  mandatory={validationError && academicClassTemplate.serialNo < 1 && true}
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
        loding={isCreatingAcademicClassTemplate} 
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
          && !isCreatingAcademicClassTemplate 
          && creatingAcademicClassTemplateError 
          && <Message message={'Error creating academic session template'} type={ERROR}></Message>
        }
        { 
          isSubmitted 
          && !isCreatingAcademicClassTemplate 
          && !creatingAcademicClassTemplateError 
          && <Message message={'Save successfull!'} type={SUCCESS}></Message>
        }
      </div>
    </form>
    
  )
}

export default AcademicClassTemplateCreate
