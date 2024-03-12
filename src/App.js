import React from 'react';
import { useEffect } from "react";

import { useThunk } from "./hooks/use-thunks";
import { fetchGenders, fetchBloodGroups, fetchCountries, getEmployeeById } from './store';

import Menubar from './components/Menubar';
import Route from './components/Route';
import InstitutionsList from './components/Institutions/InstitutionsList';
import CountriesList from './components/Countries/CountriesList';
import EmployeesList from './components/Employees/EmployeesList';
import Home from './components/Home';
import AcademicSessionTemplatesList from './components/AcademicSessionTemplates/AcademicSessionTemplatesList';
import AcademicSessionsList from './components/AcademicSessions/AcademicSessionsList';

const App = () => {

  const [doFetchUser] = useThunk(getEmployeeById);
  const [doFetchGenders] = useThunk(fetchGenders);
  const [doFetchBloodGroups] = useThunk(fetchBloodGroups);
  const [doFetchCountries] = useThunk(fetchCountries);

  //Fetch data
  useEffect(() => {
    doFetchUser(3);
    doFetchGenders();
    doFetchBloodGroups();
    doFetchCountries();
  }, [doFetchGenders, doFetchBloodGroups, doFetchCountries, doFetchUser]);


  return (
  <div>
    <Menubar />
    <div>
      <Route path="/">
        <Home />
      </Route>
      <Route path="/institutions">
        <InstitutionsList />
      </Route>
      <Route path="/academicSessionTemplates">
        <AcademicSessionTemplatesList />
      </Route>
      <Route path="/academicSessions">
        <AcademicSessionsList />
      </Route>
      <Route path="/countries">
        <CountriesList />
      </Route>
      <Route path="/employees">
        <EmployeesList />
      </Route>
    </div>
  </div>
  )
}

export default App