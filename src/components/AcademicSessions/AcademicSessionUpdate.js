import React from 'react';
import { useState, useEffect  } from "react";
import { useSelector } from "react-redux";

import { updateAcademicSession} from "../../store";
import Button from '../Button';
import TextBox from '../TextBox';
import Datepicker from '../Datepicker';
import TextArea from '../TextArea';

import Label from '../Label';
import { useThunk } from "../../hooks/use-thunks";
import Message from '../Message';
import { ERROR } from '../../helpers/constants';
import AcademicClassesList from './AcademicClassesList';
import { displayErrorMessage } from '../../helpers/utils';

const AcademicSessionUpdate = ({onClose, onUpdateSuccess, isLoading, loadingError}) => {

const data = useSelector((state) => state.academicSessions.academicSession);

const user = useSelector((state) => state.employees.employee);
console.log(user);
// Update
const initialAcademicSessionState = {
  id: data.id,
  institutionId: user? user.institutionId : null,
  name: data.name,
  startDate: data.startDate,
  endDate: data.endDate,
  description: data.description,
  academicClasses: data.academicClasses
};
const [doUpdateAcademicSession, isUpdatingAcademicSession, updatingAcademicSessionError] = useThunk(updateAcademicSession);

const [isSubmitted, setIsSubmitted] = useState(false);
const [academicSession, setAcademicSession] = useState(initialAcademicSessionState);
const [validationError, setValidationError] = useState(false);
const [validationErrorMessage, setValidationErrorMessage] = useState('');

useEffect(() => {
  if(isSubmitted && !isUpdatingAcademicSession && !updatingAcademicSessionError){
    onUpdateSuccess();
  }
}, [isUpdatingAcademicSession]);

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

const handlAcademicSessionUpdate = (event) => {
  event.preventDefault();
  const valid = isValid();
  console.log(academicSession)

  if(valid)
  {
    setValidationError(false);
    doUpdateAcademicSession(academicSession);
    setIsSubmitted(true);
  }
}  

const handleAcademicClassesUpdate = (rowData) => {
    setAcademicSession((preAcademicSession) =>({ 
      ...preAcademicSession,
      academicClasses:
      academicSession.academicClasses.map(academicClass => {
      if (academicClass.id === rowData.id) {
        // update a object with changes
        return { ...academicClass, 
                isActive: rowData.isActive, 
                name: rowData.name,
                teacherId: rowData.teacherId,
                templateId: rowData.templateId

              };
      } else {
        // No changes
        return academicClass;
      }
    })

  }));   
}

  return (
    <div>
      <form className="border shadow p-2" onSubmit={handlAcademicSessionUpdate}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className='flex justify-between'>
              <h2 className="text-gray-900">
                Update
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
                      placeholder="Class I" 
                      onChange={handleNameChange}
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
              isUpdate={true}
              institutionId={user.institutionId}
              detailList={data.academicClasses}
              isLoding={isLoading} 
              loadingError={loadingError} 
              handleAcademicClassesAdd={handleAcademicClassesUpdate}
              isCreatingMaster={isUpdatingAcademicSession}
            ></AcademicClassesList>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-center gap-x-6">
          <Button onClick={onClose} type="button" secondary>
            Cancel
          </Button>
          <Button 
          type="submit" 
          primary
          loding={isUpdatingAcademicSession} 
          >
            Save
          </Button>
          { 
            validationError
            && <p className="m-2 text-s text-red-600 dark:text-red-400">
                {validationErrorMessage}
              </p> 
          }
          { 
            isSubmitted 
            && !isUpdatingAcademicSession 
            && updatingAcademicSessionError 
            && <Message 
                  message={displayErrorMessage(updatingAcademicSessionError.message, 'Error updating Academic Session')} 
                  type={ERROR}
               ></Message>
          }
        </div>
      </form>
    </div>
  )
}

export default AcademicSessionUpdate
