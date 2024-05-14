import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { AcademicSessionTemplatesAction } from "../../store/slices/academicSessionTemplatesSlice";
import TextBox from "../TextBox";

const AcademicSessionTemplatesSearch = () => {
  const dispatch = useDispatch();

  const searchTerm = useSelector((state)=>{
          return state.academicSessionTemplates.searchTerm;
  });
  const handleSearchTermChange = (event) => {
          dispatch(AcademicSessionTemplatesAction.changeAcademicSessionTemplatesSearchTerm(event.target.value));
  }
  return (
    <div className='pr-1 sm:w-1/3'>
      <TextBox optional={true} 
      id="templateName" 
      value={searchTerm && searchTerm} 
      placeholder={'Template'}
      onChange={handleSearchTermChange}
      />
    </div>
  )
}

export default AcademicSessionTemplatesSearch;
