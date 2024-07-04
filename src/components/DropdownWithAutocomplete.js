import { useState } from 'react';
import className from 'classnames';

import { GoChevronDown } from 'react-icons/go';

function DropdownWithAutocomplete({ options, value, onChange, mandatory=false }) {

  const classes = className(
    'flex justify-between items-center cursor-pointer border rounded p-3 shadow w-full h-12',
    {
      'bg-gray-200 text-gray-700 border border-red-500 focus:outline-none focus:bg-white': mandatory,
    }
  );

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(options.slice(0,3));

  let renderedOptions;

  renderedOptions = filteredData.map((option) => {
    return (
        <div
          className="hover:bg-sky-100 rounded cursor-pointer p-1 focus:hidden"
          onClick={() => handleOptionClick(option)}
          key={option.id}>
          {option.name}
        </div>
    );
  });
 

  const handleNameChange = (event) => {   
    setSearchTerm(event.target.value);

    if(event.target.value.length > 1){
      setFilteredData(options.filter((item) => item.name.toLowerCase().startsWith(event.target.value.toLowerCase()))); 
    }else if(event.target.value.length === 0){
      reset();
    }
  }

  const handleClick = () => setIsOpen(!isOpen);

  const reset = () => {
    setSearchTerm('');
    setFilteredData(options.slice(0,3));
  }


  const handleOptionClick = (option) => {
    // CLOSE DROPDOWN
    setIsOpen(false);
    onChange(option);
    reset();
  };

  return (
    <div>
      <div onMouseLeave={() =>setIsOpen(false)} className="relative" >
        
        <div className={classes}
          onClick={handleClick}>
          {value?.name || 'Select...'}
          <GoChevronDown className="text-lg" />
        </div>
        {isOpen && (
          <div className="absolute top-full border rounded p-3 shadow bg-white w-full max-h-96 overflow-y-auto z-50">
            { <div className='relative w-full'>
                <input autoFocus="true" type="text" value={searchTerm} className='rounded shadow w-full' onChange={handleNameChange} 
                placeholder='Write two letters' />
                <button type="button" 
                    className="shadow absolute inset-y-0 end-0 flex items-center p-3" 
                    onClick={reset}
                    >X</button>
              </div> 
            }
            {renderedOptions}
          </div>
        )}
      </div>
    </div>
    
  );
}

export default DropdownWithAutocomplete;
