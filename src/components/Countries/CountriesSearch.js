import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { CountriesAction } from "../../store/slices/countriesSlice";
import TextBox from "../TextBox";

const CountriesSearch = () => {
  const dispatch = useDispatch();

  const searchTerm = useSelector((state)=>{
          return state.countries.searchTerm;
  });
  const handleSearchTermChange = (event) => {
          dispatch(CountriesAction.changeCountriesSearchTerm(event.target.value));
  }
  return (
    <div>
          <TextBox optional={true} id="name" value={searchTerm && searchTerm} placeholder={'Country Name'}
          onChange={handleSearchTermChange}/>
    </div>
  )
}

export default CountriesSearch;
