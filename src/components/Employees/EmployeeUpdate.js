import React from 'react';
import { useState, useEffect  } from "react";
import { useSelector } from "react-redux";

import { updateEmployee} from "../../store";
import Button from '../Button';
import TextBox from '../TextBox';
import Dropdown from '../Dropdown';
import Label from '../Label';
import { useThunk } from "../../hooks/use-thunks";
import Message from '../Message';
import { ERROR } from '../../helpers/constants';
import Datepicker from '../Datepicker';
import { displayErrorMessage } from '../../helpers/utils';

const EmployeeUpdate = ({data, onClose, onUpdateSuccess}) => {

 //Update
const initialEmployeeState = {
id: data.id,
employeeId:data.employeeId,
institutionId: data.institutionId,
joinDate:data.joinDate,
designationId:data.designationId,
employeeTypeId:data.employeeTypeId,

firstName: data.firstName,
lastName: data.lastName,
email:data.email,
mobile:data.mobile,

fatherName:data.fatherName,
motherName:data.motherName,
dateOfBirth:data.dateOfBirth,
genderId:data.genderId,
bloodGroupId:data.bloodGroupId,
countryId:data.countryId,
street: data.street,
city:data.city,
state:data.state,
postalCode:data.postalCode
};

const [isSubmitted, setIsSubmitted] = useState(false);
const [employee, setEmployee] = useState(initialEmployeeState);
const [validationError, setValidationError] = useState(false);
const [doUpdateEmployee, isUpdatingEmployee, updatingEmployeeError] = useThunk(updateEmployee);

//DDL

const institutions = useSelector((state) => state.institutions.data);
const employeeTypes = useSelector((state) => state.settings.employeeTypes);
const designations = useSelector((state) => state.settings.designations);
const genders = useSelector((state) => state.settings.genders);
const bloodGroups = useSelector((state) => state.settings.bloodGroups);
const countries = useSelector((state) => state.countries.data);

const [institutionSelection, setInstitutionSelection] = useState(null);
const [genderSelection, setGenderSelection] = useState(null);
const [bloodGroupSelection, setBloodGroupSelection] = useState(null);
const [employeeTypeSelection, setEmployeeTypeSelection] = useState(null);
const [designationSelection, setDesignationSelection] = useState(null);
const [countrySelection, setCountrySelection] = useState(null);

const handleInstitutionSelect = (option) => {
setInstitutionSelection(option);
setEmployee({ ...employee, institutionId: option.id });
};

const handleGenderSelect = (option) => {
setGenderSelection(option);
setEmployee({ ...employee, genderId: option.id });
};

const handleBloodGroupSelect = (option) => {
setBloodGroupSelection(option);
setEmployee({ ...employee, bloodGroupId: option.id });
};

const handleEmployeeTypeSelect = (option) => {
setEmployeeTypeSelection(option);
setEmployee({ ...employee, employeeTypeId: option.id });
};

const handleDesignationSelect = (option) => {
setDesignationSelection(option);
setEmployee({ ...employee, designationId: option.id });
};

const handleCountrySelect = (option) => {
  setCountrySelection(option);
  setEmployee({ ...employee, countryId: option.id });
};

//Textbox
const handleFirstNameChange = (event) => setEmployee({ ...employee, firstName: event.target.value.replace(/[0-9]/, '') });
const handleLastNameChange = (event) => setEmployee({ ...employee, lastName: event.target.value.replace(/[0-9]/, '') });
const handleEmployeeIdChange = (event) => setEmployee({ ...employee, employeeId: event.target.value });
const handleMobileChange = (event) => setEmployee({ ...employee, mobile: event.target.value.replace(/[a-z]/, '') });
const handleEmailChange = (event) => setEmployee({ ...employee, email: event.target.value });
const handleFatherNameChange = (event) => setEmployee({ ...employee, fatherName: event.target.value.replace(/[0-9]/, '') });
const handleMotherNameChange = (event) => setEmployee({ ...employee, motherName: event.target.value.replace(/[0-9]/, '') });
const handleStreetChange = (event) => setEmployee({ ...employee, street: event.target.value });
const handleCityChange = (event) => setEmployee({ ...employee, city: event.target.value });
const handleStateChange = (event) => setEmployee({ ...employee, state: event.target.value });
const handlePostalCodeChange = (event) => setEmployee({ ...employee, postalCode: event.target.value });

//DatePicker
const handleJoinDateChange = (newValue) => setEmployee({ ...employee, joinDate: newValue });
const handleDateOfBirthChange = (newValue) => setEmployee({ ...employee, dateOfBirth: newValue});

useEffect(() => {
  if(isSubmitted && !isUpdatingEmployee && !updatingEmployeeError){
    onUpdateSuccess();
  }

  //Set DDL
  if(isUpdatingEmployee === false){
    if( data.institutionId !== null){
      const institution = institutions.filter((item) => item.id === data.institutionId);
      setInstitutionSelection(institution[0]); 
    }

    if( data.designationId !== null){
      const designation = designations.filter((item) => item.id === data.designationId);
      setDesignationSelection(designation[0]); 
    }

    if( data.employeeTypeId !== null){
      const employeeType = employeeTypes.filter((item) => item.id === data.employeeTypeId);
      setEmployeeTypeSelection(employeeType[0]); 
    }

    if( data.genderId !== null){
      const gender = genders.filter((item) => item.id === data.genderId);
      setGenderSelection(gender[0]); 
    }

    if( data.countryId !== null){
      const country = countries.filter((item) => item.id === data.countryId);
      setCountrySelection(country[0]); 
    }

    if( data.bloodGroupId !== null){
      const bloodGroup = bloodGroups.filter((item) => item.id === data.bloodGroupId);
      setBloodGroupSelection(bloodGroup[0]); 
    }
  }
  
}, [isUpdatingEmployee]);

function isValid(){
  if(
    employee.firstName.length < 2 
    || employee.lastName.length < 2 
    || employee.employeeId.length < 2 
    || employee.institutionId == null
    || employee.joinDate == null
    || employee.designationId == null
    || employee.employeeTypeId == null
    || employee.mobile.length < 5
    || employee.email.length < 5
    )
  {
    setValidationError(true);
    return false;
  }else{
    setValidationError(false);
    return true;
  }
}

const handlEmployeeUpdate = (event) => {
  event.preventDefault();
  const valid = isValid();
  if(valid)
  {
    setValidationError(false);
    doUpdateEmployee(employee);
    setIsSubmitted(true);
    //initial setup
    setInstitutionSelection(null);
    setEmployeeTypeSelection(null);
    setDesignationSelection(null);
    setBloodGroupSelection(null);
    setGenderSelection(null);
    setCountrySelection(null);
  }
}     

const updateForm = (

  <form className="border shadow p-2" onSubmit={handlEmployeeUpdate}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className='flex justify-between'>
            <h2 className="text-gray-900">
              Employee Update
            </h2>
            <Button onClick={onClose}>x</Button>
          </div>
          
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2 sm:col-start-1">
              <Label>
                Employee ID
              </Label>
              
              <div className="mt-2">
                <TextBox
                  autoFocus={true}
                  name="employeeId"
                  id="employeeId"
                  value={employee.employeeId} 
                  placeholder="XYZ-101" onChange={handleEmployeeIdChange} 
                  mandatory={validationError && employee.employeeId.length < 2 && true}
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <Label>
                Institution
              </Label>
              <div className="mt-2">
                <Dropdown options={institutions} 
                  value={institutionSelection} 
                  onChange={handleInstitutionSelect} 
                  mandatory={validationError && employee.institutionId === null && true} 
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <Label>
                Joining Date
              </Label>
              <div className="mt-2">
                <Datepicker 
                  initialValue={employee.joinDate}
                  changeDate={handleJoinDateChange}
                  mandatory={validationError && employee.joinDate === null && true}
                  />
              </div>
            </div>
            <div className="sm:col-span-2">
              <Label>
                Designation
              </Label>
              <div className="mt-2">
                <Dropdown options={designations} 
                value={designationSelection} 
                onChange={handleDesignationSelect} 
                mandatory={validationError && employee.designationId === null && true} 
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <Label>
                Employee Type
              </Label>
              <div className="mt-2">
                <Dropdown options={employeeTypes} 
                value={employeeTypeSelection} 
                onChange={handleEmployeeTypeSelect} 
                mandatory={validationError && employee.employeeTypeId === null && true} 
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className=" text-gray-900">Personal Information</h2>
          <p className="mt-1 text-gray-600">Use a permanent address where you can receive mail.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <Label>
                First name
              </Label>
              <div className="mt-2">
                <TextBox
                  id="firstName" 
                  value={employee.firstName} 
                  placeholder="XYZ" 
                  onChange={handleFirstNameChange} 
                  mandatory={validationError && employee.firstName.length < 2  && true}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <Label>
                Last name
              </Label>
              <div className="mt-2">
                <TextBox
                  id="lastName" value={employee.lastName} 
                  placeholder="XYZ" onChange={handleLastNameChange} 
                  mandatory={validationError && employee.lastName.length < 2 && true}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <Label>
               Email Address
              </Label>
              <div className="mt-2">
                <TextBox id="email"
                value={employee.email} 
                placeholder="abc@exapmple.com" 
                onChange={handleEmailChange} 
                mandatory={validationError && employee.email.length < 5  && true}
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <Label>
                Mobile
              </Label>
              <div className="mt-2">
                <TextBox id="mobile" 
                value={employee.mobile} 
                placeholder="+8801711483333" 
                onChange={handleMobileChange} 
                mandatory={validationError && employee.mobile.length < 5  && true}
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
                  value={employee.fatherName} 
                  placeholder="XYZ" 
                  onChange={handleFatherNameChange} 
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
                  value={employee.motherName} 
                  placeholder="XYZ" 
                  onChange={handleMotherNameChange} 
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <Label>
                Date of Birth
              </Label>
              <div className="mt-2">
                <Datepicker 
                  initialValue={employee.dateOfBirth}
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
                    value={employee.street} 
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
                    value={employee.city} 
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
                    value={employee.state} 
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
                    value={employee.postalCode} 
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
        loding={isUpdatingEmployee} 
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
          && !isUpdatingEmployee 
          && updatingEmployeeError 
          && <Message 
              message={displayErrorMessage(updatingEmployeeError.message, 'Error updating Employee')} 
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

export default EmployeeUpdate
