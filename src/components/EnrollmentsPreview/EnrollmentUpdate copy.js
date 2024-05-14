import React from 'react';
import { useState, useEffect  } from "react";
import { useSelector } from "react-redux";

import { updateEnrollment, fetchAcademicClasses, } from "../../store";
import Button from '../Button';
import TextBox from '../TextBox';
import Dropdown from '../Dropdown';
import Label from '../Label';
import { useThunk } from "../../hooks/use-thunks";
import Message from '../Message';
import { ERROR } from '../../helpers/constants';
import Datepicker from '../Datepicker';
import { displayErrorMessage } from '../../helpers/utils';

const EnrollmentUpdate = ({data, onClose, onUpdateSuccess}) => {
const user = useSelector((state) => state.employees.employee);
 //Update
const initialEnrollmentState = {
  id: data.id,
  institutionId: user? user.institutionId : null,
  enrollmentDate:data.enrollmentDate,
  studentId: data.studentId,
  statusId: data.statusId, 
  statusReasonId: data.statusReasonId, 
  academicSessionId: data.academicSessionId,
  academicClassId: data.academicClassId,
  studentIdNumber: data.studentIdNumber,
  studentName: data.studentName
};

const [doFetchAcademicClasses, isLoadingAcademicClasses, loadingAcademicClassesError] = useThunk(fetchAcademicClasses);

const [isSubmitted, setIsSubmitted] = useState(false);
const [enrollment, setEnrollment] = useState(initialEnrollmentState);
const [validationError, setValidationError] = useState(false);
const [doUpdateEnrollment, isUpdatingEnrollment, updatingEnrollmentError] = useThunk(updateEnrollment);

//DDL
const { academicSessions } = useSelector(({ academicSessions: { data }}) => {
  const list = data.map((item) => {
    const id = item.id;
    const name = item.name;
    return ({id, name});
  });

  return {
    academicSessions: list
  }
});

const { academicClasses } = useSelector(({ academicClasses: { data }}) => {
  const list = data.map((item) => {
    const id = item.id;
    const name = item.name;
    return ({id, name});
  });

  return {
    academicClasses: list
  }
});
const studentStatus = useSelector((state) => state.settings.studentStatus);
const studentStatusReasons = useSelector((state) => state.settings.studentStatusReasons);

const [acdemicSessionSelection, setAcademicSessionSelection] = useState(null);
const [academicClassSelection, setAcademicClassSelection] = useState(null);
const [studentStatusSelection, setStudentStatusSelection] = useState(null);
const [studentStatusReasonSelection, setStudentStatusReasonSelection] = useState(null);

const handleStudentStatusSelect = (option) => {
setStudentStatusSelection(option);
setEnrollment({ ...enrollment, statusId: option.id });
};

const handleStudentStatusReasonSelect = (option) => {
setStudentStatusReasonSelection(option);
setEnrollment({ ...enrollment, statusReasonId: option.id });
};

const handleAcademicSessionSelect = (option) => {
  setAcademicSessionSelection(option);
  setEnrollment({ ...enrollment, academicSessionId: option.id });
  setAcademicClassSelection(null);
  
  if(user){
    doFetchAcademicClasses({academicSessionId: option.id, institutionId: user.institutionId, isActive: true});
  }
};

const handleAcademicClassSelect = (option) => {
  setAcademicClassSelection(option);
  setEnrollment({ ...enrollment, academicClassId: option.id });
};

//DatePicker
const handleEnrollmentDateChange = (newValue) => setEnrollment({ ...enrollment, enrollmentDate: newValue });

useEffect(() => {
  if(isSubmitted && !isUpdatingEnrollment && !updatingEnrollmentError){
    onUpdateSuccess();
  }
  //Set DDL
  if(isUpdatingEnrollment === false){

    if(data.statusId !== null){
      const status = studentStatus.filter((item) => item.id === data.statusId);
      setStudentStatusSelection(status[0]); 
    }

    if(data.statusReasonId !== null){
      const statusReason = studentStatusReasons.filter((item) => item.id === data.statusReasonId);
      setStudentStatusReasonSelection(statusReason[0]); 
    }

    if(data.academicSessionId !== null){
      const academicSession = academicSessions.filter((item) => item.id === data.academicSessionId);
      setAcademicSessionSelection(academicSession[0]); 
      if(user){
        doFetchAcademicClasses({academicSessionId: data.academicSessionId, institutionId: user.institutionId, isActive: true});
      }
    }

    if( data.academicClassId !== null){
      setAcademicClassSelection({id: data.academicClassId, name: data.academicClassName}); 
    }
  }
  
}, [isUpdatingEnrollment]);

function isValid(){
  if(
     enrollment.studentId == null
      || enrollment.institutionId == null
      || enrollment.academicClassId == null
      || enrollment.academicSessionId == null
      || enrollment.enrollmentDate == null
      || enrollment.statusId == null
    )
  {
    setValidationError(true);
    return false;
  }else{
    setValidationError(false);
    return true;
  }
}

const handlEnrollmentUpdate = (event) => {
  event.preventDefault();
  const valid = isValid();

  if(valid)
  {
    setValidationError(false);
    doUpdateEnrollment(enrollment);
    setIsSubmitted(true);
  }
}     

const updateForm = (

  <form className="border shadow p-2" onSubmit={handlEnrollmentUpdate}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className='flex justify-between'>
            <h2 className="text-gray-900">
              Enrollment Update
            </h2>
            <Button onClick={onClose}>x</Button>
          </div>
          
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3 sm:col-start-1">
              <Label>
                Student ID
              </Label>
              <div className="mt-2">
                <TextBox
                  autoFocus={true}
                  name="studentIdNumber"
                  id="studentIdNumber"
                  value={enrollment.studentIdNumber} 
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <Label>
                Student Name
              </Label>
              <div className="mt-2">
                <TextBox
                  name="studentName"
                  id="studentName"
                  value={enrollment.studentName} 
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <Label>
                Active Session <b className='text-red-600'>*</b>
              </Label>
              <div className="mt-2">
                <Dropdown 
                  options={academicSessions} 
                  value={acdemicSessionSelection} 
                  onChange={handleAcademicSessionSelect} 
                  mandatory={validationError && enrollment.academicSessionId === null && true}
                />
                
              </div>
            </div>
            <div className="sm:col-span-3">
              <Label>
                Active Class <b className='text-red-600'>*</b>
              </Label>
              <div className="mt-2">
                <Dropdown 
                  options={academicClasses} 
                  value={academicClassSelection} 
                  onChange={handleAcademicClassSelect} 
                  mandatory={validationError && enrollment.academicClassId === null && true}
                />
                
              </div>
            </div>
            <div className="sm:col-span-2">
              <Label>
                Enrollment Date <b className='text-red-600'>*</b>
              </Label>
              <div className="mt-2">
                <Datepicker 
                  initialValue={enrollment.enrollmentDate}
                  changeDate={handleEnrollmentDateChange}
                  mandatory={validationError && enrollment.enrollmentDate === null && true}
                  />
              </div>
            </div>
            <div className="sm:col-span-2">
              <Label>
                Status <b className='text-red-600'>*</b>
              </Label>
              <div className="mt-2">
                
                <Dropdown 
                  options={studentStatus} 
                  value={studentStatusSelection} 
                  onChange={handleStudentStatusSelect} 
                  mandatory={validationError && enrollment.statusId === null && true}
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <Label>
                Status Reasons
              </Label>
              <div className="mt-2">
                <Dropdown 
                  options={studentStatusReasons} 
                  value={studentStatusReasonSelection} 
                  onChange={handleStudentStatusReasonSelect} 
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
        loding={isUpdatingEnrollment} 
        >
          Update
        </Button>
        { 
          validationError &&
          <p className="m-2 text-s text-red-600 dark:text-red-400">
          Please enter required field(s).
          </p> 
        }
        { 
          isSubmitted 
          && !isUpdatingEnrollment 
          && updatingEnrollmentError 
          && <Message 
              message={displayErrorMessage(updatingEnrollmentError.message, 'Error updating Enrollment')} 
              type={ERROR}
            ></Message>
        }
      </div>
  </form>
);

  return (
    <div>
      {updateForm}
    </div>
  )
}

export default EnrollmentUpdate
