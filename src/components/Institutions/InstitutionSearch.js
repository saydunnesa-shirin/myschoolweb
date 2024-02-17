import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { InstitutionsAction } from "../../store/slices/institutionsSlice";
import TextBox from "../TextBox";

const InstitutionsSearch = () => {
  const dispatch = useDispatch();

  const searchTerm = useSelector((state)=>{
          return state.institutions.searchTerm;
  });
  const handleSearchTermChange = (event) => {
          dispatch(InstitutionsAction.changeInstitutionsSearchTerm(event.target.value));
  }
  return (
    <div className='pr-1 w-1/3'>
      <TextBox optional={true} 
      id="name" 
      value={searchTerm && searchTerm} 
      placeholder={'Country Name'}
      onChange={handleSearchTermChange}
      />
    </div>
  )
}

export default InstitutionsSearch;
