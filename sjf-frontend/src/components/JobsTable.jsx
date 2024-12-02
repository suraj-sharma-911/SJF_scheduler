import React, { useState, useEffect } from "react";
import "./../styles/JobsTable.css";
import { io } from "socket.io-client";
const socket = io("http://localhost:3000");


const JobsTable = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    socket.onopen = () => {
      console.log('webSocket Connected');
    }
    socket.on("jobUpdate", (updatedJobs) => {
      setJobs(updatedJobs);
    });

    socket.onclose = () => {
      console.log('WebSocket is closed');
    }

  }, []);
  return (
    <div className="jobs-container">
      <h1 className="title">Processed Jobs</h1>
      <div className="table-wrapper">
        <table className="jobs-table">
          <thead>
            <tr>
              <th>Job Name</th>
              <th>Duration (ms)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length > 0 ? (
              jobs.map((job, index) => (
                <tr key={index} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                  <td>{job.name}</td>
                  <td>{job.duration}</td>
                  <td>{job.status || "Pending"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="no-jobs">No jobs available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobsTable;
