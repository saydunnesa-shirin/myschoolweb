import React from 'react';

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchCountries } from "../../store";
import { CountriesAction } from "../../store/slices/countriesSlice";

import { useThunk } from "../../hooks/use-thunks";
import Skeleton from "../Skeleton";
import CountriesListItem from "./CountriesListItem";
import CountryAdd from "./CountryAdd";
import CountriesSearch from "./CountriesSearch";
import Message from "../Message";
import { SUCCESS, ERROR } from '../../constants';
import Paging from "../Paging";

const CountriesList = () => {
  const dispatch = useDispatch();

  const [isRemoveSuccess, setIsRemoveSuccess] = useState(false);
  const [doFetchCountries, isLoadingCountries, loadingCountriesError] = useThunk(fetchCountries);

  ///Fetch data
  useEffect(() => {
    doFetchCountries();
  }, [doFetchCountries]);

  const { countries } = useSelector(({ countries: { data, searchTerm }}) => {
    let dataList = data;
    
    if(searchTerm.length !== 0){
      dataList = data.filter((item) => item.name.toLowerCase().startsWith(searchTerm.toLowerCase())); 
    }
    return {
      countries: dataList
    }

  }); 
  
  const dataPerPage = useSelector((state) => state.countries.dataPerPage);
  const currentPage = useSelector((state) => state.countries.currentPage);

  const totalPages = Math.ceil(countries.length / dataPerPage);
  const pages = [...Array(totalPages + 1).keys()].slice(1);
  const indexOfLastPage = currentPage * dataPerPage;
  const indexofFirstPage = indexOfLastPage - dataPerPage;

  const visibleCountries = countries.slice(indexofFirstPage, indexOfLastPage);

  const navigatePrev = () => {
    if (currentPage !== 1) {
      dispatch(CountriesAction.onNavigatePrev());
    }
  };

  const navigateNext = () => {
    if (currentPage !== totalPages) {
      dispatch(CountriesAction.onNavigateNext());
    }
  };

  const handleCurrentPage = (_p) => dispatch(CountriesAction.onClickCurrentPage(_p));

  const handleChangeDataPerpage = (e) => dispatch(CountriesAction.onChangeTodosPerpage(e));

  ////Panel
  let content;

  if(isLoadingCountries){
    content = <Skeleton times={6} className="h-10 w-full"></Skeleton>;
  }
  else if(loadingCountriesError){

    content = <div> <Message message={'Error fetching countries'} type={ERROR}></Message>  </div>
  }
  else{
    content = visibleCountries.map((country) => {
      return <CountriesListItem key={country.id} country={country} setIsRemoveSuccess={setIsRemoveSuccess} ></CountriesListItem>
    });
  }

/////Paging
let paging = <Paging currentPage={currentPage} pages={pages} navigatePrev={navigatePrev} navigateNext={navigateNext} 
                handleCurrentPage={handleCurrentPage} handleChangeDataPerpage={handleChangeDataPerpage}>
            </Paging>

  return (
    <div className="m-2">
       <CountryAdd></CountryAdd>
       <div className="flex flex-row justify-between items-center mb-2">
          <h1 className="text-xl">Countries</h1>
          <CountriesSearch></CountriesSearch>
      </div>
        {content}
        {paging}
        {isRemoveSuccess && <Message message={'Delete successfull!'} type={SUCCESS}></Message>}
    </div>
  )
}

export default CountriesList;
