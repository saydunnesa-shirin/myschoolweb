import React, { useState, useRef, useEffect } from 'react';
import className from 'classnames';
import { GoChevronDown } from 'react-icons/go';

function DDL({ options, value, onChange, mandatory }) {

 const [isOpen, setIsOpen] = useState(false);

 const dropdownRef = useRef(null);

 const handleClickOutside = (event) => {
   if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
     setIsOpen(false);
   }
 };

 useEffect(() => {
   document.addEventListener('mousedown', handleClickOutside);
   return () => {
     document.removeEventListener('mousedown', handleClickOutside);
   };
 }, []);

 const renderedOptions = options.map((option) => {
    return (
        <div
          className="hover:bg-sky-100 rounded cursor-pointer p-1"
          onClick={() => handleOptionClick(option)}
          key={option.id}>
          {option.name}
        </div>
    );
  });

  const handleOptionClick = (option) => {
    // CLOSE DROPDOWN
    setIsOpen(false);
    // WHAT OPTION DID THE USER CLICK ON???
    onChange(option);
  };

  const classes = className(
    'flex justify-between p-1 cursor-pointer w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-indigo-600',
    {
      'bg-red-50 text-gray-700 border border-red-500': mandatory,
    }
  );

  return (
    <div>
      <div className="relative" >
        <div className={classes}
          onClick={() => {setIsOpen(!isOpen)}}>
          {value?.name || 'Select...'}
          <GoChevronDown className="text-lg" />
        </div>
        {isOpen && (
          <div ref={dropdownRef} className="absolute top-full border rounded p-3 shadow bg-white w-full max-h-96 overflow-y-auto z-50">
            {renderedOptions}
          </div>
        )}
      </div>
    </div>
  );
}

export default DDL;
