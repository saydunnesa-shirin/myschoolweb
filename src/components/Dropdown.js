import { useState } from 'react';
import className from 'classnames';
import { GoChevronDown } from 'react-icons/go';

function Dropdown({ options, value, onChange, mandatory }) {

  const classes = className(
    'flex justify-between items-center cursor-pointer border rounded p-3 shadow w-full h-12',
    {
      'bg-gray-200 text-gray-700 border border-red-500 focus:outline-none focus:bg-white': mandatory,
    }
  );

 const [isOpen, setIsOpen] = useState(false);

 const renderedOptions = options.map((option) => {
    return (
        <div
          className="hover:bg-sky-100 rounded cursor-pointer p-1 focus:hidden"
          onClick={() => handleOptionClick(option)}
          key={option.id}>
          {option.name}
        </div>
    );
  });

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    // CLOSE DROPDOWN
    setIsOpen(false);
    // WHAT OPTION DID THE USER CLICK ON???
    onChange(option);
  };

  return (
    <div className='w-96 md:w-48'>
      <div onMouseLeave={() =>setIsOpen(false)} className="relative h-12" >
        
        <div className={classes}
          onClick={handleClick}>
          {value?.name || 'Select...'}
          <GoChevronDown className="text-lg" />
        </div>
        {isOpen && (
          <div className="absolute top-full border rounded p-3 shadow bg-white w-full max-h-96 overflow-y-auto">
            {renderedOptions}
          </div>
        )}
      </div>
    </div>
    
  );
}

export default Dropdown;
