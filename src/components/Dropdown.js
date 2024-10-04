import React, { useState, useRef, useEffect } from 'react';
import className from 'classnames';
import { GoChevronDown } from 'react-icons/go';

function Dropdown({ options, value, onChange, mandatory }) {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const divElement = useRef();

  // Set up the event listener
  useEffect(() => {
   // Function to handle clicks outside the component
    const handleClickOutside = (event) => {
      if(!divElement.current)
        return;

      if(!divElement.current.contains(event.target)){
        setIsOpen(false);
      }
    }
    document.addEventListener('click', handleClickOutside, true);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('click', handleClickOutside);
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
    <div ref={divElement} className="relative" >
      <div className={classes} onClick={toggle}>
        {value?.name || 'Select...'}
        <GoChevronDown className="text-lg" />
      </div>
      {isOpen && (
        <div className="absolute top-full border rounded p-3 shadow bg-white w-full max-h-96 overflow-y-auto z-50">
          {renderedOptions}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
