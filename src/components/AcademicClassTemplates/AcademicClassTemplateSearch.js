import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { AcademicClassTemplatesAction } from "../../store/slices/academicClassTemplatesSlice";
import TextBox from "../TextBox";

const AcademicClassTemplatesSearch = () => {
  const dispatch = useDispatch();

  const searchTerm = useSelector((state)=>{
          return state.academicClassTemplates.searchTerm;
  });
  const handleSearchTermChange = (event) => {
          dispatch(AcademicClassTemplatesAction.changeAcademicClassTemplatesSearchTerm(event.target.value));
  }
  return (
    <div className='pr-1 sm:w-1/3'>
      <TextBox optional={true} 
      id="templateName" 
      value={searchTerm && searchTerm} 
      placeholder={'Template'}
      onChange={handleSearchTermChange}
      />
    </div>
  )
}

export default AcademicClassTemplatesSearch;
