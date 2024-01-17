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
    <div>
          <TextBox optional={true} id="name" value={searchTerm && searchTerm} placeholder={'Institution Name'}
          onChange={handleSearchTermChange}/>
    </div>
  )
}

export default InstitutionsSearch;
