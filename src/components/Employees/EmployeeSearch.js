import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { EmployeesAction } from "../../store/slices/employeesSlice";
import TextBox from "../TextBox";

const EmployeesSearch = () => {
  const dispatch = useDispatch();

  const searchTerm = useSelector((state)=>{
          return state.employees.searchTerm;
  });
  const handleSearchTermChange = (event) => {
          dispatch(EmployeesAction.changeEmployeesSearchTerm(event.target.value));
  }
  return (
    <div>
          <TextBox optional={true} id="name" value={searchTerm && searchTerm} placeholder={'First Name'}
          onChange={handleSearchTermChange}/>
    </div>
  )
}

export default EmployeesSearch;
