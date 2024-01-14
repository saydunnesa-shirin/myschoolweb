import React from 'react';
import Sidebar from './components/Sidebar';
import Route from './components/Route';
import InstitutionsList from './components/Institution/InstitutionsList';
import CountriesList from './components/Countries/CountriesList';


const App = () => {
  return (
  <div className="container mx-auto grid grid-cols-6 gap-4 mt-4">
  <Sidebar />
  <div className="col-span-5">
    <Route path="/countries">
      <CountriesList />
    </Route>
    <Route path="/">
      <InstitutionsList />
    </Route>
    {/* <Route path="/buttons">
      <ButtonPage />
    </Route> */}
  </div>
  </div>
  )
}

export default App