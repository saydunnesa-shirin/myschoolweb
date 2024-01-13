import React from 'react';
import InstitutionsList from './components/Institution/InstitutionsList';
import CountriesList from './components/Countries/CountriesList';

const App = () => {
  return (
    <div className='container mx-auto'>
      {/* <InstitutionsList></InstitutionsList> */}
      <CountriesList></CountriesList>
    </div>
  )
}

export default App