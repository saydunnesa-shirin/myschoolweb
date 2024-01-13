import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { fetchInstitutions } from "../../store";
import { useThunk } from "../../hooks/use-thunks";
import Skeleton from "../Skeleton";
import InstitutionsListItem from "./InstitutionsListItem";
import InstitutionAdd from "./InstitutionAdd";
import InstitutionSearch from "./InstitutionSearch";
import Message from "../Message";
import { SUCCESS, ERROR } from '../../constants';

const InstitutionsList = () => {

  const [isRemoveSuccess, setIsRemoveSuccess] = useState(false);

  const [doFetchInstitutions, isLoadingInstitutions, loadingInstitutionsError] = useThunk(fetchInstitutions);

  const { institutions } = useSelector(({ institutions: { data, searchTerm }}) => {
      const filteredInstitutions = data.filter((item) => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      ); 
      
      return {
        institutions: filteredInstitutions
      }
  }); 

  //Fetch data
  useEffect(() => {
    doFetchInstitutions();
  }, [doFetchInstitutions]);

  let content;

  if(isLoadingInstitutions){
    content = <Skeleton times={6} className="h-10 w-full"></Skeleton>;
  }
  else if(loadingInstitutionsError){

    content = <div> <Message message={'Error fetching institutions'} type={ERROR}></Message>  </div>
  }
  else{
    content = institutions.map((institution) => {
      return <InstitutionsListItem key={institution.id} institution={institution} setIsRemoveSuccess={setIsRemoveSuccess} ></InstitutionsListItem>
    });
  }

  return (
    <div className="m-2">
       <InstitutionAdd></InstitutionAdd>
       <div className="flex flex-row justify-between items-center mb-2">
          <h1 className="text-xl">Institutions</h1>
          <InstitutionSearch></InstitutionSearch>
      </div>
        {content}
        { isRemoveSuccess && <Message message={'Delete successfull!'} type={SUCCESS}></Message>}
    </div>
  )
}

export default InstitutionsList;
