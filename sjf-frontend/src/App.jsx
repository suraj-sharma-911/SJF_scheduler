import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import './App.css';
import JobsTable from './components/JobsTable';
import AddJobForm from './components/AddJobForm';

const socket = io('http://localhost:3000');


function App() {
  // useEffect(() => {
  //   socket.on('jobUpdate', (updatedJobs) => {
  //     setJobs(updatedJobs);
  //   });
  //   return () => {
  //     socket.off('jobUpdate');
  //   };
  // }, []);

  return (
    <div className="app-container">
      <div className="form-section">
        <AddJobForm />
      </div>
      <div className="table-section">
        <JobsTable />
      </div>
    </div>
  );
}

export default App;
