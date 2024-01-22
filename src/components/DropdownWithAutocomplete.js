import { useState, useEffect } from 'react';
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

  let renderedOptions;

  renderedOptions = options.map((option) => {
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
  }

  const handleClick = () => {
    setIsOpen(!isOpen);
    setSearchTerm('');
  };

  const handleOptionClick = (option) => {
    // CLOSE DROPDOWN
    setIsOpen(false);
    // WHAT OPTION DID THE USER CLICK ON???
    onChange(option);
  };

  return (
    <div>
      <div onMouseLeave={() =>setIsOpen(false)} className="w-48 relative" >
        
        <div className={classes}
          onClick={handleClick}>
          {value?.name || 'Select...'}
          <GoChevronDown className="text-lg" />
        </div>
        {isOpen && (
          <div className="absolute top-full border rounded p-3 shadow bg-white w-full">
            {<input value={searchTerm} className='rounded shadow w-full' onChange={handleNameChange}></input>}
            {renderedOptions}
          </div>
        )}
      </div>
    </div>
    
  );
}

export default DropdownWithAutocomplete;
