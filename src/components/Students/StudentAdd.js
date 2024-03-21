import React from 'react';
import {useState} from "react";
import {useSelector} from "react-redux";

import {addStudent} from "../../store";
import {useThunk} from "../../hooks/use-thunks";

import Datepicker from '../Datepicker';

import TextBox from '../TextBox';
import Button from '../Button';
import Dropdown from '../Dropdown';
import Label from '../Label';
import Message from '../Message';
import {SUCCESS, ERROR} from '../../helpers/constants';

export default function StudentAdd({onClose}) {

const user = useSelector((state) => state.employees.employee);

const initialStudentState = {
studentId:"",
institutionId:  user? user.institutionId: null,
admissionDate: null,

firstName: "",
lastName: "",
email:"",
mobile:"",

fatherName:"",
motherName:"",
dateOfBirth:null,
genderId:null,
bloodGroupId:null,
countryId:null,
street: "",
city:"",
state:"",
postalCode:""
};

//Add
const [doCreateStudent, isCreatingStudent, creatingStudentError] = useThunk(addStudent);

const [student, setStudent] = useState(initialStudentState);
const [validationError, setValidationError] = useState(false);
const [isSubmitted, setIsSubmitted] = useState(false);

//DDL
const genders = useSelector((state) => state.settings.genders);
const bloodGroups = useSelector((state) => state.settings.bloodGroups);
const countries = useSelector((state) => state.countries.data);

const [genderSelection, setGenderSelection] = useState(null);
const [bloodGroupSelection, setBloodGroupSelection] = useState(null);
const [countrySelection, setCountrySelection] = useState(null);

const handleGenderSelect = (option) => {
setGenderSelection(option);
setStudent({ ...student, genderId: option.id });
};

const handleBloodGroupSelect = (option) => {
setBloodGroupSelection(option);
setStudent({ ...student, bloodGroupId: option.id });
};

const handleCountrySelect = (option) => {
  setCountrySelection(option);
  setStudent({ ...student, countryId: option.id });
};

//Textbox
const handleFirstNameChange = (event) => setStudent({ ...student, firstName: event.target.value.replace(/[0-9]/, '') });
const handleLastNameChange = (event) => setStudent({ ...student, lastName: event.target.value.replace(/[0-9]/, '') });
const handleStudentIdChange = (event) => setStudent({ ...student, studentId: event.target.value });
const handleMobileChange = (event) => setStudent({ ...student, mobile: event.target.value.replace(/[a-z]/, '') });
const handleEmailChange = (event) => setStudent({ ...student, email: event.target.value });
const handleFatherNameChange = (event) => setStudent({ ...student, fatherName: event.target.value.replace(/[0-9]/, '') });
const handleMotherNameChange = (event) => setStudent({ ...student, motherName: event.target.value.replace(/[0-9]/, '') });

const handleStreetChange = (event) => setStudent({ ...student, street: event.target.value });
const handleCityChange = (event) => setStudent({ ...student, city: event.target.value });
const handleStateChange = (event) => setStudent({ ...student, state: event.target.value });
const handlePostalCodeChange = (event) => setStudent({ ...student, postalCode: event.target.value });

//DatePicker
const handleAdmissionDateChange = (newValue) => setStudent({ ...student, admissionDate: newValue });
const handleDateOfBirthChange = (newValue) => setStudent({ ...student, dateOfBirth: newValue});

//Add
function isValid(){
  if(student.firstName.length < 2 
    || student.lastName.length < 2 
    || student.studentId.length < 2 
    // || student.institutionId == null
    || student.admissionDate == null
    || (student.mobile && student.mobile.length < 5)
    || (student.email && student.email.length < 5)
    ){
      setValidationError(true);
      return false;
  }else{
      setValidationError(false);
      return true;
  }
}

const handlStudentAdd = (event) => {
  event.preventDefault();
  const valid = isValid();
  console.log(student);

  if(valid)
  {
    setValidationError(false);
    doCreateStudent(student);
    setIsSubmitted(true);

    //initial setup
    // setStudent(initialStudentState);
    // setBloodGroupSelection(null);
    // setGenderSelection(null);
    // setCountrySelection(null);
  }
}
  return (
    <form className="border shadow p-2" onSubmit={handlStudentAdd}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className='flex justify-between'>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Student Add
            </h2>
            <Button onClick={onClose}>x</Button>
          </div>
          
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2 sm:col-start-1">
              <Label>
                Student ID
              </Label>
              
              <div className="mt-2">
                <TextBox
                  autoFocus={true}
                  name="studentId"
                  id="studentId"
                  value={student.studentId} 
                  placeholder="XYZ-101" onChange={handleStudentIdChange} 
                  mandatory={validationError && student.studentId.length < 2 && true}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <Label>
                Admission Date
              </Label>
              <div className="mt-2">
                <Datepicker 
                  initialValue={student.admissionDate ? student.admissionDate : null}
                  changeDate={handleAdmissionDateChange}
                  mandatory={validationError && student.admissionDate === null && true}
                />
              </div>
            </div>
            
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <Label>
                First name
              </Label>
              <div className="mt-2">
                <TextBox
                  id="firstName" 
                  value={student.firstName} 
                  placeholder="XYZ" 
                  onChange={handleFirstNameChange} 
                  mandatory={validationError && student.firstName.length < 2  && true}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <Label>
                Last name
              </Label>
              <div className="mt-2">
                <TextBox
                  id="lastName" value={student.lastName} 
                  placeholder="XYZ" onChange={handleLastNameChange} 
                  mandatory={validationError && student.lastName.length < 2 && true}
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <Label>
                Father name
              </Label>
              <div className="mt-2">
                <TextBox
                  id="fatherName" 
                  value={student.fatherName} 
                  placeholder="XYZ" 
                  onChange={handleFatherNameChange} 
                  mandatory={validationError && student.fatherName.length < 2 && true}
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <Label>
                Mother name
              </Label>
              <div className="mt-2">
                <TextBox
                  id="motherName" 
                  value={student.motherName} 
                  placeholder="XYZ" 
                  onChange={handleMotherNameChange} 
                  mandatory={validationError && student.motherName.length < 2 && true}

                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <Label>
               Email Address
              </Label>
              <div className="mt-2">
                <TextBox id="email"
                value={student.email} 
                placeholder="abc@exapmple.com" 
                onChange={handleEmailChange} 
                mandatory={validationError && student.email && student.email.length < 5  && true}
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <Label>
                Mobile
              </Label>
              <div className="mt-2">
                <TextBox id="mobile" 
                value={student.mobile} 
                placeholder="+8801711483333" 
                onChange={handleMobileChange} 
                mandatory={validationError && student.mobile && student.mobile.length < 5  && true}
                />
              </div>
            </div>
            
            <div className="sm:col-span-2">
              <Label>
                Date of Birth
              </Label>
              <div className="mt-2">
                <Datepicker 
                  initialValue={student.dateOfBirth}
                  changeDate={handleDateOfBirthChange}
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <Label>
                Gender
              </Label>
              <div className="mt-2">
                <Dropdown 
                options={genders} 
                value={genderSelection} 
                onChange={handleGenderSelect} 
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <Label>
                Blood Group
              </Label>
              <div className="mt-2">
                <Dropdown 
                options={bloodGroups} 
                value={bloodGroupSelection} 
                onChange={handleBloodGroupSelect} 
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <Label>
                Country
              </Label>
              <div className="mt-2">
                <Dropdown options={countries} 
                value={countrySelection} 
                onChange={handleCountrySelect} 
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <Label>
                Street address
              </Label>
              <div className="mt-2">
                <TextBox
                    name="street"
                    id="street"
                    value={student.street} 
                    placeholder="XYZ" onChange={handleStreetChange} 
                  />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <Label>
                City
              </Label>
              <div className="mt-2">
                <TextBox
                    name="city"
                    id="city"
                    value={student.city} 
                    placeholder="XYZ" onChange={handleCityChange} 
                  />
              </div>
            </div>

            <div className="sm:col-span-2">
              <Label>
                State / Province
              </Label>
              <div className="mt-2">
                  <TextBox
                    name="state"
                    id="state"
                    value={student.state} 
                    placeholder="XYZ" onChange={handleStateChange} 
                  />
              </div>
            </div>

            <div className="sm:col-span-2">
              <Label >
                ZIP / Postal code
              </Label>
              <div className="mt-2">
                  <TextBox
                    name="postalCode"
                    id="postalCode"
                    value={student.postalCode} 
                    placeholder="XYZ" onChange={handlePostalCodeChange} 
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
        loding={isCreatingStudent} 
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
          && !isCreatingStudent 
          && creatingStudentError 
          && <Message message={'Error creating Student'} type={ERROR}></Message>
        }
        { 
          isSubmitted 
          && !isCreatingStudent 
          && !creatingStudentError 
          && <Message message={'Save successfull!'} type={SUCCESS}></Message>
        }
      </div>
    </form>
  )
}
