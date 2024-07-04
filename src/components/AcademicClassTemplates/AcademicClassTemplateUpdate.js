import React from 'react';
import { useState, useEffect  } from "react";
import { useSelector } from "react-redux";

import { updateAcademicClassTemplate} from "../../store";
import Button from '../Button';
import TextBox from '../TextBox';
import Label from '../Label';
import { useThunk } from "../../hooks/use-thunks";
import Message from '../Message';
import { ERROR } from '../../helpers/constants';
import { displayErrorMessage } from '../../helpers/utils';

const AcademicClassTemplateUpdate = ({data, onClose, onUpdateSuccess}) => {

const user = useSelector((state) => state.employees.employee);
// //Update
const initialAcademicClassTemplateState = {
  id: data.id,
  templateName: data.templateName,
  institutionId: user? user.institutionId: null,
  serialNo:data.serialNo
};

const [isSubmitted, setIsSubmitted] = useState(false);
const [academicClassTemplate, setAcademicClassTemplate] = useState(initialAcademicClassTemplateState);
const [validationError, setValidationError] = useState(false);
const [doUpdateAcademicClassTemplate, isUpdatingAcademicClassTemplate, updatingAcademicClassTemplateError] = useThunk(updateAcademicClassTemplate);

useEffect(() => {
  if(isSubmitted && !isUpdatingAcademicClassTemplate && !updatingAcademicClassTemplateError){
    onUpdateSuccess();
  }
}, [isUpdatingAcademicClassTemplate]);


const handleTemplateNameChange = (event) => {
  setAcademicClassTemplate({ ...academicClassTemplate, templateName: event.target.value });
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

const handlAcademicClassTemplateUpdate = (event) => {
  event.preventDefault();
  const valid = isValid();
  
  if(valid)
  {
    setValidationError(false);
    doUpdateAcademicClassTemplate(academicClassTemplate);
    setIsSubmitted(true);
  }
}     
  return (
    <div>
      <form className="border shadow p-2" onSubmit={handlAcademicClassTemplateUpdate}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className='flex justify-between'>
              <h2 className="text-gray-900">
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
          loding={isUpdatingAcademicClassTemplate} 
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
            && !isUpdatingAcademicClassTemplate 
            && updatingAcademicClassTemplateError 
            && <Message 
                  message={displayErrorMessage(updatingAcademicClassTemplateError.message, 'Error updating Academic Session Template')} 
                  type={ERROR}
                ></Message>
          }
        </div>
      </form>
    </div>
  )
}

export default AcademicClassTemplateUpdate
