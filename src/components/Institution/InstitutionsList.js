import React from 'react';

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchInstitutions } from "../../store";
import { InstitutionsAction } from "../../store/slices/institutionsSlice";

import { useThunk } from "../../hooks/use-thunks";
import Skeleton from "../Skeleton";
import InstitutionsListItem from "./InstitutionsListItem";
import InstitutionAdd from "./InstitutionAdd";
import InstitutionSearch from "./InstitutionSearch";
import Message from "../Message";
import { SUCCESS, ERROR } from '../../constants';
import Paging from "../Paging";

const InstitutionsList = () => {
  const dispatch = useDispatch();

  const [isRemoveSuccess, setIsRemoveSuccess] = useState(false);
  const [doFetchInstitutions, isLoadingInstitutions, loadingInstitutionsError] = useThunk(fetchInstitutions);

  ///Fetch data
  useEffect(() => {
    doFetchInstitutions();
  }, [doFetchInstitutions]);

  const { institutions } = useSelector(({ institutions: { data, searchTerm }}) => {
    let dataList = data;
    
    if(searchTerm.length !== 0){
      dataList = data.filter((item) => item.name.toLowerCase().startsWith(searchTerm.toLowerCase())); 
    }

    const sortedData = [...dataList].sort((a, b) => {
      const valueA = a.name;
      const valueB = b.name;
      // const reverseOrder = sortOrder === 'asc' ? 1 : -1;

      if (typeof valueA === 'string') {
        return valueA.localeCompare(valueB);
      } else {
        return (valueA - valueB);
      }
    });

    return {
      institutions: sortedData
    }

  }); 
  
  const dataPerPage = useSelector((state) => state.institutions.dataPerPage);
  const currentPage = useSelector((state) => state.institutions.currentPage);

  const totalPages = Math.ceil(institutions.length / dataPerPage);
  const pages = [...Array(totalPages + 1).keys()].slice(1);
  const indexOfLastPage = currentPage * dataPerPage;
  const indexofFirstPage = indexOfLastPage - dataPerPage;

  const visibleInstitutions = institutions.slice(indexofFirstPage, indexOfLastPage);

  const navigatePrev = () => {
    if (currentPage !== 1) {
      dispatch(InstitutionsAction.onNavigatePrev());
    }
  };

  const navigateNext = () => {
    if (currentPage !== totalPages) {
      dispatch(InstitutionsAction.onNavigateNext());
    }
  };

  const handleCurrentPage = (_p) => dispatch(InstitutionsAction.onClickCurrentPage(_p));

  const handleChangeDataPerpage = (e) => dispatch(InstitutionsAction.onChangeTodosPerpage(e));

  ////Panel
  let content;

  if(isLoadingInstitutions){
    content = <Skeleton times={6} className="h-10 w-full"></Skeleton>;
  }
  else if(loadingInstitutionsError){

    content = <div> <Message message={'Error fetching institutions'} type={ERROR}></Message>  </div>
  }
  else{
    content = visibleInstitutions.map((institution) => {
      return <InstitutionsListItem key={institution.id} institution={institution} setIsRemoveSuccess={setIsRemoveSuccess} ></InstitutionsListItem>
    });
  }

/////Paging
let paging = <Paging currentPage={currentPage} pages={pages} navigatePrev={navigatePrev} navigateNext={navigateNext} 
                handleCurrentPage={handleCurrentPage} handleChangeDataPerpage={handleChangeDataPerpage}>
            </Paging>

  return (
    <div className="m-2">
       <InstitutionAdd></InstitutionAdd>
       <div className="flex flex-row justify-between items-center mb-2">
          <h1 className="text-xl">Institutions</h1>
          <InstitutionSearch></InstitutionSearch>
      </div>
        {content}
        {paging}
        {isRemoveSuccess && <Message message={'Delete successfull!'} type={SUCCESS}></Message>}
    </div>
  )
}

export default InstitutionsList;
