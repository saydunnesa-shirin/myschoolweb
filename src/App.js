import React from 'react';
import Menubar from './components/Menubar';
import Route from './components/Route';
import InstitutionsList from './components/Institutions/InstitutionsList';
import CountriesList from './components/Countries/CountriesList';
import EmployeesList from './components/Employees/EmployeesList';
import EmployeeAdd from './components/Employees/EmployeeAdd';
import EmployeeUpdate from './components/Employees/EmployeeUpdate';

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
      <Route path="/employees">
        <EmployeesList />
      </Route>
      <Route path="/employeeadd">
        <EmployeeAdd />
      </Route>
      <Route path="/employeeupdate">
        <EmployeeUpdate />
      </Route>
    </div>
  </div>
  )
}

export default App