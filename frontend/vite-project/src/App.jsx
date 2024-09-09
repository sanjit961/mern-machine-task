import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import Contact from './Components/Employee';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Employee from './Components/Employee';
import CreateEmployee from './Components/CreateEmployee';
import EditEmployee from './Components/EditEmployee';
import ProtectedRoute from './ProtectedRoute'; 

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          {/* Public route */}
          <Route path="/" element={<Login />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employee"
            element={
              <ProtectedRoute>
                <Employee />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-employee"
            element={
              <ProtectedRoute>
                <CreateEmployee />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-employee/:id"
            element={
              <ProtectedRoute>
                <EditEmployee />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <ProtectedRoute>
                <Contact />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
