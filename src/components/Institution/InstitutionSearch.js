import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { changeSearchTerm } from "../../store";
import TextBox from "../TextBox";

const InstitutionSearch = () => {
  const dispatch = useDispatch();

  const searchTerm = useSelector((state)=>{
          return state.institutions.searchTerm;
  });
  const handleSearchTermChange = (event) => {
          dispatch(changeSearchTerm(event.target.value));
  }
  return (
    <div>
          <TextBox optional={true} id="name" value={searchTerm && searchTerm} placeholder="Institution Name" 
          onChange={handleSearchTermChange}/>
    </div>
  )
}

export default InstitutionSearch;
