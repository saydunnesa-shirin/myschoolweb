import React from 'react';

import Skeleton from "../Skeleton";
import Message from '../Message';
import { ERROR } from '../../constants';
import AcademicClassesListItem from './AcademicClassesListItem';

const AcademicClassesList = ({institutionId, academicSessionTemplates, isLoadingAcademicSessionTemplates, loadingAcademicSessionTemplatesError, handleAcademicClassesUpdate, isCreatingAcademicSession}) => {

const handleAcademicClassescChange = (rowData) => {
  handleAcademicClassesUpdate(rowData);
}

let detailContent;

  if(isLoadingAcademicSessionTemplates || isCreatingAcademicSession){
    detailContent = <Skeleton times={6} className="h-8 w-full"></Skeleton>;
  }
  else if(loadingAcademicSessionTemplatesError){
    detailContent = <div> <Message message={'Error fetching templates'} type={ERROR}></Message>  </div>
  }
  else{
    detailContent = academicSessionTemplates.map((academicSessionTemplate) => {
      return(
      <AcademicClassesListItem key={academicSessionTemplate.id}
        academicSessionTemplate={academicSessionTemplate} 
        institutionId={institutionId}
        handleAcademicClassescChange={(rowData) => handleAcademicClassesUpdate(rowData)}
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
