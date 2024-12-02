import React, { useState, useEffect } from 'react'

function AllJobsTable({ refresh }) {
    const [jobs, setJobs] = new useState([]);
    // Fetch jobs from the backend
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch("http://localhost:3000/jobs");
                if (!response.ok) throw new Error("Failed to fetch jobs");
                const data = await response.json();
                setJobs(data);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };

        fetchJobs();
    }, [refresh]);
    return (
        <div className="jobs-container">
            <h1 className="title">Available Jobs</h1>
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
    )
}

export default AllJobsTable