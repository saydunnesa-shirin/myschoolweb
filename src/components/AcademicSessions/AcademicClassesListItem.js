import React from 'react';
import { useState, useEffect  } from "react";
import { useSelector } from "react-redux";
import Panel from '../Panel';
import Dropdown from '../Dropdown';
import TextBox from '../TextBox';

const AcademicClassesListItem = ({isUpdate = false, detail, institutionId, handleAcademicClassescChange}) => {

const initialAcademicClassState = {
id: isUpdate ? detail.id : 0,
institutionId: institutionId,
teacherId: isUpdate ? detail.teacherId : null,
academicSessionTemplateId: detail.id,
name: isUpdate ? detail.name : detail.templateName,
isActive: isUpdate ? detail.isActive : false
};

const [validationError, setValidationError] = useState(false);
const [academicClass, setAcademicClass] = useState(initialAcademicClassState);

const handleChange = () => {
  if(academicClass.name !== null && academicClass.name.length > 0  && academicClass.institutionId !== null && academicClass.teacherId !== null)
  {
    setAcademicClass({ ...academicClass, isActive: !academicClass.isActive });

    handleAcademicClassescChange(academicClass, true);
    setValidationError(false);
  }
  else{
    setValidationError(true);
    setAcademicClass({ ...academicClass, isActive: false });
  }
}

const { teachers } = useSelector(({ employees: { data }}) => {
  const list = data.map((item) => {
    const id = item.id;
    const name = item.firstName;
    return ({id, name});
  });

  return {
    teachers: list
  }
});

const [teacherSelection, setTeacherSelection] = useState(null);

const handleTeacherSelect = (option) => {
  setTeacherSelection(option);
  setAcademicClass({ ...academicClass, teacherId: option.id });
  handleAcademicClassescChange(academicClass, false);
};

const handleNameChange = (event) => {
  setAcademicClass({ ...academicClass, name: event.target.value });
  handleAcademicClassescChange(academicClass, false);
}

useEffect(() => {
  if( detail.teacherId !== null && teachers != null){
    const teacher = teachers.filter((item) => item.id === detail.teacherId);
    setTeacherSelection(teacher[0]); 
  }
}, []);

return(
      <div>
          <Panel key={detail.id}> 
            <div className='space-y-12'>
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-0.5 sm:col-start-1">
                    <div className="mt-2">
                      <input 
                        type='checkbox' 
                        className='p-2 mr-2 text-xl'
                        checked={academicClass.isActive}
                        onChange={handleChange}
                        ></input>
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <div className="mt-2">
                      <TextBox
                        name="name"
                        id="name"
                        value={academicClass.name} 
                        placeholder="Class I" 
                        onChange={handleNameChange} 
                        mandatory={validationError && academicClass.name.length < 2 && true}
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <div className="mt-2">
                      <Dropdown options={teachers} 
                        value={teacherSelection} 
                        onChange={handleTeacherSelect} 
                        mandatory={validationError && academicClass.teacherId === null && true} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Panel>  
      </div>
   )
}

export default AcademicClassesListItem;
