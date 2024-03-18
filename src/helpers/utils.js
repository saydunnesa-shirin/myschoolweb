//Date display-----
const options = { year: 'numeric', month: '2-digit', day: '2-digit' };

export const displayToLocaleDateString = (inputValue) => {
   // Output: DD/MM/YYYY
   return new Date(inputValue).toLocaleDateString('en-US', options);
};