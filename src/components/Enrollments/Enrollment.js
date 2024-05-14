import React from 'react';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getEmployeeById, fetchAcademicSessions, fetchAcademicClasses, fetchStudents, addEnrollment } from "../../store";
import { useThunk } from "../../hooks/use-thunks";
import Button from '../Button';
import TextBox from '../TextBox';
import Dropdown from '../Dropdown';
import Label from '../Label';
import Message from '../Message';
import { SUCCESS, ERROR, LOGGED_IN_USER_ID, STUDENT_STATUS_IDS } from '../../helpers/constants';
import { GoSearch, GoPencil } from 'react-icons/go';
import StudentList from './StudentList';

const Enrollment = () => {

const [doFetchUser, isLoadingUser, loadingUserError] = useThunk(getEmployeeById);
const [showStudentForm, setShowStudentForm] = useState(false);

const user = useSelector((state) => state.employees.employee);
const students = useSelector((state) => state.students.data);

const initialEnrollmentState = {
  institutionId: user? user.institutionId: null,
  academicSessionId: null,
  academicClassId: null,
  enrollmentDate: new Date(),
  studentIds: []
};

const [doCreateEnrollment, isCreatingEnrollment, creatingEnrollmentError] = useThunk(addEnrollment);

const [doFetchAcademicSessions, isLoadingAcademicSessions, loadingAcademicSessionsError] = useThunk(fetchAcademicSessions);
const [doFetchAcademicClasses, isLoadingAcademicClasses, loadingAcademicClassesError] = useThunk(fetchAcademicClasses);
const [doFetchStudents, isLoadingStudents, loadingStudentsError] = useThunk(fetchStudents);

const [enrollment, setEnrollment] = useState(initialEnrollmentState);
const [searchValidationError, setSearchValidationError] = useState(false);
const [searchValidationErrorMessage, setSearchValidationErrorMessage] = useState('');

const [validationError, setValidationError] = useState(false);
const [validationErrorMessage, setValidationErrorMessage] = useState('');
const [isSubmitted, setIsSubmitted] = useState(false);

//Fetch data
const getDataByInstitution = async () => {
  doFetchUser(LOGGED_IN_USER_ID);
  if(user != null){
    doFetchAcademicSessions({institutionId: user.institutionId, isActive: true});
  }
}

useEffect(() => {
  if(user != null){
    doFetchAcademicSessions({institutionId: user.institutionId, isActive: true});
  }
  else{
    getDataByInstitution();
  }

  addDetail();

}, [user, doFetchAcademicSessions, students]);

const [studentName, setStudentName] = useState('');

//DDL
const [activeSessionSelection, setActiveSessionSelection] = useState(null);
const [activeClassSelection, setActiveClassSelection] = useState(null);

const { activeSessions } = useSelector(({ academicSessions: { data }}) => {
  const list = data.map((item) => {
    const id = item.id;
    const name = item.name;
    return ({id, name});
  });

  return {
    activeSessions: list
  }
});

const { activeClasses } = useSelector(({ academicClasses: { data }}) => {
  const list = data.map((item) => {
    const id = item.id;
    const name = item.name;
    return ({id, name});
  });

  return {
    activeClasses: list
  }
});

const handleActiveSessionSelect = (option) => {
  setActiveSessionSelection(option);
  setEnrollment({ ...enrollment, academicSessionId: option.id });
  setActiveClassSelection(null);
  
  if(user){
    doFetchAcademicClasses({academicSessionId: option.id, institutionId: user.institutionId, isActive: true});
  }
};

const handleActiveClassSelect = (option) => {
  setActiveClassSelection(option);
  setEnrollment({ ...enrollment, academicClassId: option.id });
};

const handleStudentNameChange = (event) => setStudentName(event.target.value.replace(/[0-9]/, ''));

//Get students
const loadStudents = () => {

  if(user.institutionId === null
    || enrollment.academicSessionId === null 
    || enrollment.academicClassId === null 
    ){
      setSearchValidationErrorMessage('Please enter required field(s).');
      setSearchValidationError(true);
      return false;
  }else{
    setSearchValidationErrorMessage('');
    setSearchValidationError(false);
    setValidationErrorMessage('');
    setValidationError(false);
  }
  
  doFetchStudents({institutionId: user.institutionId, 
    activeSessionIds: [enrollment.academicSessionId], 
    activeClassIds: [enrollment.academicClassId],
    statusIds: STUDENT_STATUS_IDS,

    isActive: true,
    firstName: studentName});

  setShowStudentForm(true);

  setEnrollment({ ...enrollment, institutionId: user.institutionId });
}

const reset = () => {
  setActiveSessionSelection(null);
  setActiveClassSelection(null);
  setStudentName('');
  setSearchValidationErrorMessage('');
  setSearchValidationError(false);
  setValidationErrorMessage('');
  setValidationError(false);
  setEnrollment(initialEnrollmentState);
  setShowStudentForm(false);
}

function addDetail(){
  const studentIdsToAdd = students.map(student => {
    return student.id;
  });

  setEnrollment((preData) =>({ 
    ...preData,
    studentIds: studentIdsToAdd
  }));
}

const handleStudentsAdd = (rowData) => {

  if(enrollment.studentIds.length === 0) {

    var filteredArray = students.map(student => {
      if(student.id !== rowData.id)
        return student.id;
    });

    setEnrollment((preData) =>({ 
      ...preData,
      studentIds: filteredArray
    }));

    return;
  }
  const exists = enrollment.studentIds.find((item) => item === rowData.id);

  if(exists){

    const filteredArray = enrollment.studentIds.filter((item) => item !== rowData.id);
    setEnrollment((preData) =>({ 
      ...preData,
      studentIds: filteredArray
    }));
  }else{
    setEnrollment((preData) =>({ 
      ...preData,
      studentIds: ([...enrollment.studentIds, rowData.id])
    }));
  }
}

// Add Enrollment
function isValid(){
  if(enrollment.studentIds === null){
    setValidationErrorMessage('No stuents to enroll.');
    setValidationError(true);
    return false;
  }
  else if(enrollment.institutionId === null
    || enrollment.enrollmentDate === null 
    || enrollment.academicSessionId === null 
    || enrollment.academicClassId === null 
    ){
    setValidationErrorMessage('Please enter required field(s).');
    setValidationError(true);
    return false;
  }
  else if(enrollment.studentIds.length === 0 || students.length === 0){
    setValidationErrorMessage('Invalid enrollment data!');
    setValidationError(true);
    return false;
  }
  else{
    setValidationError(false);
    return true;
  }
}

const handlEnrollment = (event) => {
  event.preventDefault();
 
  const valid = isValid();

  if(valid)
  {
    setValidationError(false);
    doCreateEnrollment(enrollment);
    setIsSubmitted(true);
    setValidationErrorMessage('');
    setValidationError(false);
    setEnrollment(initialEnrollmentState); 
    reset();
  }
} 

const studentForm = <form onSubmit={handlEnrollment}>
    <StudentList 
        isLoding={isLoadingStudents} 
        loadingError={loadingStudentsError} 
        handleStudentsAdd={handleStudentsAdd}
    ></StudentList>
    <div className="mt-6 flex items-center justify-center gap-x-6">
      <Button type="button" secondary>
        Cancel
      </Button>
      <Button 
      type="submit" 
      primary
      loding={isCreatingEnrollment} 
      >
        Enroll
      </Button>
    </div>
  </form>

  return (
    <div className="border shadow p-2">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className='flex justify-between'>
            <h2 className="text-gray-900">
              Enrollment
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3 sm:col-start-1">
              <Label>
                Active Session <b className='text-red-600'>*</b>
              </Label>
              <div className="mt-2">
                <Dropdown 
                  options={activeSessions} 
                  value={activeSessionSelection} 
                  onChange={handleActiveSessionSelect} 
                  mandatory={searchValidationError && activeSessionSelection === null && true}
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <Label>
                Active Class <b className='text-red-600'>*</b>
              </Label>
              <div className="mt-2">
                <Dropdown 
                  options={activeClasses} 
                  value={activeClassSelection} 
                  onChange={handleActiveClassSelect} 
                  mandatory={searchValidationError && activeClassSelection === null && true}
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
                  value={studentName} 
                  onChange={handleStudentNameChange} 
                  placeholder={'First Name'}
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <div className="sm:mt-8 flex items-start justify-start gap-x-4">
                <Button secondary loding={isLoadingStudents} onClick={loadStudents}><GoSearch /></Button>
                <Button secondary onClick={reset}><GoPencil /></Button>
                { 
                  searchValidationError 
                  && <p className="text-s text-red-600 dark:text-red-400">
                      {searchValidationErrorMessage}
                    </p> 
                }
              </div>
            </div>
          </div>
          <br></br>
        </div>
      </div>
      {showStudentForm && studentForm}
      <div className="mt-6 flex items-center justify-center gap-x-6">
      { 
        validationError 
        && <p className="text-s text-red-600 dark:text-red-400">
            {validationErrorMessage}
          </p> 
      }
      { 
        isSubmitted 
        && !isCreatingEnrollment 
        && creatingEnrollmentError 
        && <Message message={'Error creating enrollment'} type={ERROR}></Message>
      }
      { 
        isSubmitted 
        && !isCreatingEnrollment 
        && !creatingEnrollmentError 
        && <Message message={'Save successfull!'} type={SUCCESS}></Message>
      }
    </div>
    </div>
  )
}

export default Enrollment
