import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { AcademicSessionsAction } from "../../store/slices/academicSessionsSlice";
import TextBox from "../TextBox";

const AcademicSessionsSearch = () => {
  const dispatch = useDispatch();

  const searchTerm = useSelector((state)=>{
          return state.academicSessions.searchTerm;
  });
  const handleSearchTermChange = (event) => {
          dispatch(AcademicSessionsAction.changeAcademicSessionsSearchTerm(event.target.value));
  }
  return (
    <div className='pr-1 w-1/3'>
      <TextBox optional={true} 
      id="name" 
      value={searchTerm && searchTerm} 
      placeholder={'Session'}
      onChange={handleSearchTermChange}
      />
    </div>
  )
}

export default AcademicSessionsSearch;
