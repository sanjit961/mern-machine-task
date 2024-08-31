import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; // Import the CSS file
import Navbar from './Navbar';
import Home from './Components/Home';
import About from './Components/Contact';
import Contact from './Components/Employee';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Employee from './Components/Employee';
import CreateEmployee from './Components/CreateEmployee';
import EditEmployee from './Components/EditEmployee';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/create-employee" element={<CreateEmployee />} />
          <Route path="/edit-employee/:id" element={<EditEmployee />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
