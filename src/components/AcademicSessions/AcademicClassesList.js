import React from 'react';

import Skeleton from "../Skeleton";
import Message from '../Message';
import { ERROR } from '../../helpers/constants';
import AcademicClassesListItem from './AcademicClassesListItem';

const AcademicClassesList = ({isUpdate = false, institutionId, detailList, isLoding, loadingError, handleAcademicClassesAdd, isCreatingMaster}) => {

const handleAcademicClassescChange = (rowData) => {
  handleAcademicClassesAdd(rowData);
}

let detailContent;

  if(isLoding || isCreatingMaster){
    detailContent = <Skeleton times={6} className="h-8 w-full"></Skeleton>;
  }
  else if(loadingError){
    detailContent = <div> <Message message={'Error fetching templates'} type={ERROR}></Message>  </div>
  }
  else{
    detailContent = detailList.map((detail) => {
      return(
      <AcademicClassesListItem 
        isUpdate={isUpdate}
        key={detail.id}
        detail={detail} 
        institutionId={institutionId}
        handleAcademicClassescChange={(rowData) => handleAcademicClassescChange(rowData)}
      ></AcademicClassesListItem>
      )
    });
  }
  return (
    <div>
      <h1 className="text-xl m-2">Templates</h1>
      <div className='border shadow'>
        {detailContent}
      </div>
    </div>
  )
}

export default AcademicClassesList
