import { Fragment, useState } from 'react';
import Button from './Button';
import { GoTrashcan, GoPencil } from 'react-icons/go';

function Table({ 
  data, config, keyFn, onDeleteClick, isRemovingRecord, onUpdateClick,  onSelectClick = null }) {

  const [recordId, setRecordId] = useState(null);

  const [skippedStudentIds, setSkippedStudentIds] = useState([]);

  //Delete
  const handleDeleteClick = (rowData) => {
    setRecordId(rowData.id);
    onDeleteClick(rowData);
  }

   //Select checkbox
  const handleCheckboxClick = (rowData) => {
    setRecordId(rowData.id);

    const exists = skippedStudentIds.find((item) => item === rowData.id);

    if(exists){
  
      const updatedArray = skippedStudentIds.filter((item) => item !== rowData.id);
      setSkippedStudentIds(updatedArray);
  
    }else{
      setSkippedStudentIds([...skippedStudentIds, rowData.id]);
    }
    
    onSelectClick(rowData);
  }
  
  //Header
  const renderedHeaders = config.map((column) => {
    if (column.header) {
      return <Fragment key={column.label}>{column.header()}</Fragment>;
    }
    return <th key={column.label}>{column.label}</th>;
  });

  const renderedRows = data.map((rowData) => {
  
    const renderedCells = config.map((column) => {
      return (
        <td className="p-2" key={column.label}>
          {column.render(rowData)}
        </td>
      );
    });

    return (
      <tr className="border-b" key={keyFn(rowData)}>
        {!onSelectClick && <td className='flex m-5'>
            <Button className='mr-2' loding={isRemovingRecord && recordId===rowData.id} 
              onClick={() => handleDeleteClick(rowData)}>
              <GoTrashcan></GoTrashcan>
            </Button>
            <Button className='mr-2' onClick={() => onUpdateClick(rowData)}>
              <GoPencil></GoPencil>
            </Button>
        </td>}
        {onSelectClick && <td className='flex m-5'>
            <input 
              type='checkbox' 
              checked= {skippedStudentIds.find((item) => item === rowData.id)? false : true}
              onChange={() => handleCheckboxClick(rowData)}
            ></input>
        </td> }

        {renderedCells}
      </tr>
    );
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-spacing-2">
        <thead>
          <tr className="border-b-2">
            <th className='w-10'></th>
            {renderedHeaders}
          </tr>
        </thead>
        <tbody>{renderedRows}</tbody>
      </table>
    </div>
  );
}

export default Table;
