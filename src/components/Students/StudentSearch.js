import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { StudentsAction } from "../../store/slices/studentsSlice";
import TextBox from "../TextBox";

const StudentsSearch = () => {
  const dispatch = useDispatch();

  const searchTerm = useSelector((state)=>{
          return state.students.searchTerm;
  });
  const handleSearchTermChange = (event) => {
          dispatch(StudentsAction.changeStudentsSearchTerm(event.target.value));
  }
  return (
    <div className='pr-1 w-1/3'>
          <TextBox optional={true} 
          id="name" 
          value={searchTerm && searchTerm} 
          placeholder={'First Name'}
          onChange={handleSearchTermChange}
          />
    </div>
  )
}

export default StudentsSearch;
