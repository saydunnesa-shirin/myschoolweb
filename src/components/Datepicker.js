import React, {useState} from 'react';
import DatePicker from "react-tailwindcss-datepicker"; 
import className from 'classnames';

const Datepicker = ({
  initialValue,
  changeDate,
  mandatory = false,
  asSingleDate = true,
  ...rest
}) => {

const classes = className(
  rest.className,
  'justify justify-between cursor-pointer w-full pl-1 rounded-md border border-gray-100 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
  {
    'bg-red-50 text-gray-700 border focus:outline-none focus:bg-white': mandatory,
  }
);

const [dateValue, setDateValue] = useState({
  startDate : initialValue === null? new Date() :  initialValue,
  endDate: initialValue === null? new Date() :  initialValue,
});

//DatePicker
const handleDateChange = (newValue) => {
    setDateValue(newValue);
    if(asSingleDate)
      changeDate(newValue.startDate);
    else
      changeDate(newValue);

}

  return (
    <div>
        <DatePicker 
        inputClassName={classes}
        placeholder={"DD/MM/YYYY"} 
        popoverDirection="down" 
        startWeekOn="mon"
        containerClassName="relative"
        asSingle={asSingleDate} 
        useRange={!asSingleDate} 
        value={dateValue} 
        onChange={handleDateChange} 
        displayFormat={"DD/MM/YYYY"} 
        />
    </div>
  )
}

export default Datepicker;
