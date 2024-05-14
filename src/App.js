import React from 'react';
import { useEffect } from "react";

import { useThunk } from "./hooks/use-thunks";
import { fetchGenders, fetchBloodGroups, fetchCountries, getEmployeeById } from './store';

import Menubar from './components/Menubar';
import Navbar from "./components/Navbar";
import Route from './components/Route';
import InstitutionsList from './components/Institutions/InstitutionsList';
import CountriesList from './components/Countries/CountriesList';
import EmployeesList from './components/Employees/EmployeesList';
import StudentsList from './components/Students/StudentsList';
import Home from './components/Home';
import AcademicSessionTemplatesList from './components/AcademicSessionTemplates/AcademicSessionTemplatesList';
import AcademicSessionsList from './components/AcademicSessions/AcademicSessionsList';
import Enrollment from './components/Enrollments/Enrollment';
import EnrollmentsPreview from './components/EnrollmentsPreview/EnrollmentsPreviewList';
import { LOGGED_IN_USER_ID } from './helpers/constants';


const App = () => {

  const [doFetchUser] = useThunk(getEmployeeById);
  const [doFetchGenders] = useThunk(fetchGenders);
  const [doFetchBloodGroups] = useThunk(fetchBloodGroups);
  const [doFetchCountries] = useThunk(fetchCountries);

  //Fetch data
  useEffect(() => {
    doFetchUser(LOGGED_IN_USER_ID);
    doFetchGenders();
    doFetchBloodGroups();
    doFetchCountries();
  }, [doFetchGenders, doFetchBloodGroups, doFetchCountries, doFetchUser]);


  return (
  <div className='text-2xl border border-blue-900'>
    {/* <Menubar /> */}
    <Navbar />
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
      <Route path="/students">
        <StudentsList />
      </Route>
      <Route path="/enrollments">
        <Enrollment />
      </Route>
      <Route path="/enrollmentsPreview">
        <EnrollmentsPreview />
      </Route>
    </div>
  </div>
  )
}

export default App