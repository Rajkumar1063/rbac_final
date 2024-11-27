import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import DataAnalyst from './Components/DataAnalyst';
import ComplianceOfficer from './Components/ComplianceOfficer';
import SystemAdmin from './Components/SystemAdmin';
import SalesData from './Components/SalesData';
import RoleManagement from './Components/RoleManagement';
import PermissionRequest from './Components/PermissionRequest';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/DataAnalyst" element={<DataAnalyst />} />
        <Route path="/ComplianceOfficer" element={<ComplianceOfficer />} />
        <Route path="/SystemAdmin" element={<SystemAdmin />} />
        <Route path="/SalesData" element={<SalesData />}/>
        <Route path="/RoleManagement" element={<RoleManagement />} />
        <Route path="/PermissionRequest" element={<PermissionRequest />} />
      </Routes>
    </Router>
  );
}

export default App;