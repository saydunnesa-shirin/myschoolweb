import React from 'react';
import Menubar from './components/Menubar';
import Route from './components/Route';
import InstitutionsList from './components/Institution/InstitutionsList';
import CountriesList from './components/Countries/CountriesList';


const App = () => {
  return (
  <div>
    <Menubar />
    <div>
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