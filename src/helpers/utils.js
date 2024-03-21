//Date display-----
const options = { year: 'numeric', month: '2-digit', day: '2-digit' };

export const displayToLocaleDateString = (inputValue) => {
   // Output: DD/MM/YYYY
   return new Date(inputValue).toLocaleDateString('en-US', options);
};

export const displayErrorMessage = (inputValue, errorMessage) => {
   if(inputValue.includes('404'))
      return 'Not Found';
   if(inputValue.includes('500'))
      return 'Server Error';
   else
      return errorMessage;
};

