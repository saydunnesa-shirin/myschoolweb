import React from 'react';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { addAcademicSession } from "../../store";
import { useThunk } from "../../hooks/use-thunks";

import Button from '../Button';
import TextBox from '../TextBox';
import TextArea from '../TextArea';
import Datepicker from '../Datepicker';
import Label from '../Label';
import Message from '../Message';
import { SUCCESS, ERROR } from '../../helpers/constants';
import AcademicClassesList from './AcademicClassesList';

const AcademicSessionCreate = ({onClose, isLoadingAcademicSessionTemplates, loadingAcademicSessionTemplatesError}) => {
const user = useSelector((state) => state.employees.employee);
const academicSessionTemplates = useSelector((state) => state.academicSessionTemplates.data);

const initialAcademicSessionState = {
  institutionId: user? user.institutionId: null,
  name: "",
  startDate: new Date(`${new Date().getFullYear()}-01-01`), //new Date(new Date().getFullYear(), 0, 1),
  endDate: new Date(`${new Date().getFullYear()}-12-31`),//new Date(new Date().getFullYear(), 11, 31),
  description: "",
  academicClasses: []
};
//Add
const [doCreateAcademicSession, isCreatingAcademicSession, creatingAcademicSessionError] = useThunk(addAcademicSession);

const [academicSession, setAcademicSession] = useState(initialAcademicSessionState);
const [validationError, setValidationError] = useState(false);
const [validationErrorMessage, setValidationErrorMessage] = useState('');
const [isSubmitted, setIsSubmitted] = useState(false);

const handleNameChange = (event) => {
  setAcademicSession({ 
      ...academicSession, 
      name: event.target.value
  });
}

const handleDescriptionChange = (event) => {
  setAcademicSession({ 
      ...academicSession, 
      description: event.target.value
  });
}

//DatePicker
const handleStartDateChange = (newValue) => setAcademicSession({ ...academicSession, startDate: newValue });
const handleEndDateChange = (newValue) => setAcademicSession({ ...academicSession, endDate: newValue});

function isValid(){
  if(academicSession.name.length === 0 
    || academicSession.startDate == null 
    || academicSession.endDate == null 
    ){
    setValidationErrorMessage('Please enter required field(s).');
    setValidationError(true);
    return false;
  }
  else if(academicSession.startDate != null 
          && academicSession.endDate != null 
          && academicSession.startDate > academicSession.endDate){
    setValidationErrorMessage('Invalid date! Start date can not be greater than end date.');
    setValidationError(true);
    return false;
  }
  else{
    setValidationError(false);
    return true;
  }
}

const handlAcademicSessionAdd = (event) => {
  event.preventDefault();
  
  const valid = isValid();

  if(valid)
  {
    setValidationError(false);
    doCreateAcademicSession(academicSession);
    setIsSubmitted(true);
    setAcademicSession(initialAcademicSessionState);
    addDetail();
  }
}   

//Set Details data
useEffect(() => {
  addDetail();
}, []);

function addDetail(){
  academicSessionTemplates.map(academicSessionTemplate => {

    setAcademicSession((preAcademicSession) => ({
      ...preAcademicSession,
      academicClasses: [...preAcademicSession.academicClasses, {
          institutionId: user? user.institutionId: null,
          teacherId: null,
          academicSessionTemplateId: academicSessionTemplate.id,
          name: academicSessionTemplate.templateName,
          isActive: false
        }
      ],
    }));
  });
}

const handleAcademicClassesCreate = (rowData) => {

    setAcademicSession((preAcademicSession) =>({ 
      ...preAcademicSession,
      academicClasses:
      academicSession.academicClasses.map(academicClass => {
      if (academicClass.academicSessionTemplateId === rowData.id) {
        // Create a *new* object with changes
        return { ...academicClass, 
                isActive: rowData.isActive,
                name: rowData.name,
                teacherId: rowData.teacherId
               };
      } else {
        // No changes
        return academicClass;
      }
    })
  
  }));   
}
  return (
    <form className="border shadow p-2" onSubmit={handlAcademicSessionAdd}>
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
                Session
              </Label>
              
              <div className="mt-2">
                <TextBox
                  autoFocus={true}
                  name="name"
                  id="name"
                  value={academicSession.name} 
                  placeholder="Class I" onChange={handleNameChange} 
                  mandatory={validationError && academicSession.name.length < 2 && true}
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <Label>
                Start Date
              </Label>
              
              <div className="mt-2">
                <Datepicker 
                  initialValue={academicSession.startDate ? academicSession.startDate : null}
                  changeDate={handleStartDateChange}
                  mandatory={validationError && academicSession.startDate === null && true}
                  reset={isCreatingAcademicSession}
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <Label>
                End Date
              </Label>
              
              <div className="mt-2">
                <Datepicker 
                  initialValue={academicSession.endDate ? academicSession.endDate : null}
                  changeDate={handleEndDateChange}
                  mandatory={validationError && academicSession.endDate === null && true}
                  reset={isCreatingAcademicSession}
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <Label>
                Description
              </Label>
              <div className="mt-2">
                <TextArea
                  name="description"
                  id="description"
                  value={academicSession.description} 
                  onChange={handleDescriptionChange} 
                  mandatory={validationError && academicSession.description.length > 200 && true}
                />
              </div>
            </div>
            
          </div>
          <br></br>
          <AcademicClassesList 
            institutionId={user? user.institutionId: null}
            detailList={academicSessionTemplates}
            isLoding={isLoadingAcademicSessionTemplates} 
            loadingError={loadingAcademicSessionTemplatesError} 
            handleAcademicClassesAdd={handleAcademicClassesCreate}
            isCreatingMaster={isCreatingAcademicSession}
          ></AcademicClassesList>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-center gap-x-6">
        { 
          validationError 
          && <p className="m-2 text-s text-red-600 dark:text-red-400">
              {validationErrorMessage}
            </p> 
        }
        { 
          isSubmitted 
          && !isCreatingAcademicSession 
          && creatingAcademicSessionError 
          && <Message message={'Error creating academic session template'} type={ERROR}></Message>
        }
        { 
          isSubmitted 
          && !isCreatingAcademicSession 
          && !creatingAcademicSessionError 
          && <Message message={'Save successfull!'} type={SUCCESS}></Message>
        }
      </div>
      <div className="mt-6 flex items-center justify-center gap-x-6">
        <Button onClick={onClose} type="button" secondary>
          Cancel
        </Button>
        <Button 
        type="submit" 
        primary
        loding={isCreatingAcademicSession} 
        >
          Save
        </Button>
      </div>
    </form>
  )
}

export default AcademicSessionCreate
