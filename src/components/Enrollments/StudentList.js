import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { StudentsAction } from "../../store/slices/studentsSlice";
import SortableTable from '../SortableTable';
import Paging from "../Paging";

import Skeleton from "../Skeleton";
import Message from '../Message';
import { ERROR } from '../../helpers/constants';
import { displayToLocaleDateString } from '../../helpers/utils';

const StudentList = ({isLoding, loadingError, handleStudentsAdd, isCreatingMaster}) => {
const dispatch = useDispatch();
const students = useSelector((state) => state.students.data);

const handleSelectClick = (rowData) => {
  handleStudentsAdd(rowData);
}

//Paging
const dataPerPage = useSelector((state) => state.students.dataPerPage);
const currentPage = useSelector((state) => state.students.currentPage);

const totalPages = Math.ceil(students.length / dataPerPage);
const pages = [...Array(totalPages + 1).keys()].slice(1);
const indexOfLastPage = currentPage * dataPerPage;
const indexofFirstPage = indexOfLastPage - dataPerPage;

const visibleStudents = students.slice(indexofFirstPage, indexOfLastPage);

const navigatePrev = () => {
  if (currentPage !== 1) {
    dispatch(StudentsAction.onNavigatePrev());
  }
};

const navigateNext = () => {
  if (currentPage !== totalPages) {
    dispatch(StudentsAction.onNavigateNext());
  }
};

const handleCurrentPage = (_p) => dispatch(StudentsAction.onClickCurrentPage(_p));

const handleChangeDataPerpage = (e) => dispatch(StudentsAction.onChangeTodosPerpage(e));

 //Table
 const config = [
  {
    label: '',
    render: (student) => (student.isActive),
  },
  {
    label: 'Student Name',
    render: (student) => (student.firstName + ' ' + student.lastName),
    sortValue: (student) => student.firstName,
  },
  {
    label: 'Admission Date',
    render: (student) => displayToLocaleDateString(student.admissionDate),
    sortValue: (student) => student.admissionDate,
  },
  {
    label: 'Session',
    render: (student) => student.activeSessionName
  },
  {
    label: 'Class',
    render: (student) => student.activeClassName
  }
];

const keyFn = (student) => {
  return student.id;
};

  let content;

  if(isLoding){
    content = <Skeleton times={6} className="h-8 w-full"></Skeleton>;
  }
  else if(loadingError){
    content = <div> <Message message={'Error fetching academic sessions'} type={ERROR}></Message>  </div>
  }
  else{
    content = <div>
      <SortableTable 
        data={visibleStudents} 
        config={config} 
        keyFn={keyFn} 
        onSelectClick = {handleSelectClick}
      />
      <Paging currentPage={currentPage} pages={pages} navigatePrev={navigatePrev} navigateNext={navigateNext} 
          handleCurrentPage={handleCurrentPage} handleChangeDataPerpage={handleChangeDataPerpage}>
      </Paging>
    </div>
  }

  return (
    <div>
      <h2 className="m-2">Students</h2>
      <div className='border shadow'>
        {content}
      </div>
    </div>
  )
}

export default StudentList
