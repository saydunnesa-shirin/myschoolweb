import React from 'react';
import { useEffect } from "react";

import { useThunk } from "./hooks/use-thunks";
import { fetchGenders, fetchBloodGroups, fetchCountries } from './store';

import Menubar from './components/Menubar';
import Route from './components/Route';
import InstitutionsList from './components/Institutions/InstitutionsList';
import CountriesList from './components/Countries/CountriesList';
import EmployeesList from './components/Employees/EmployeesList';
import Home from './components/Home';

const App = () => {

  const [doFetchGenders] = useThunk(fetchGenders);
  const [doFetchBloodGroups] = useThunk(fetchBloodGroups);
  const [doFetchCountries] = useThunk(fetchCountries);

  //Fetch data
  useEffect(() => {
    doFetchGenders();
    doFetchBloodGroups();
    doFetchCountries();
  }, [doFetchGenders, doFetchBloodGroups, doFetchCountries]);


  return (
  <div>
    <Menubar />
    <div>
      <Route path="/">
        <Home />
      </Route>
      <Route path="/countries">
        <CountriesList />
      </Route>
      <Route path="/institutions">
        <InstitutionsList />
      </Route>
      <Route path="/employees">
        <EmployeesList />
      </Route>
      
    </div>
  </div>
  )
}

export default App