import React, { useState } from "react";
import "./../styles/AddJobForm.css";
import AllJobsTable from "./AllJobsTable";

const AddJobForm = () => {
    const [newJob, setNewJob] = useState({ name: '', duration: '' });
    const [refresh, setRefresh] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newJob.name || !newJob.duration) {
            alert("Please fill out all fields.");
            return;
        }

        try {

            const response = await fetch('http://localhost:3000/jobs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newJob),
            });
            if (response.ok) setNewJob({ name: '', duration: '' });
            setRefresh((prev) => !prev);
        } catch (error) {
            console.error("Error adding job:", error);
        }
    };

    // let jobList = [];
    // const addJobToList = (e) => {
    //     e.preventDefault();
    //     if (!newJob.name || !newJob.duration) {
    //         alert("Please fill out all fields.");
    //         return;
    //     }
    //     jobList.push(newJob);
    //     console.log('jl----', jobList);

    // }

    return (
        <div className="form-container">
            <h2 className="form-title">Add a Job</h2>
            <form onSubmit={handleSubmit} className="add-job-form">
                <label htmlFor="name">Job Name</label>
                <input
                    type="text"
                    id="name"
                    value={newJob.name}
                    onChange={(e) => setNewJob({ ...newJob, name: e.target.value })}
                    placeholder="Enter job name"
                />

                <label htmlFor="duration">Duration (ms)</label>
                <input
                    type="number"
                    id="duration"
                    value={newJob.duration}
                    onChange={(e) => setNewJob({ ...newJob, duration: e.target.value })}
                    placeholder="Enter duration in milliseconds"
                />
                {/* <button type="button" className="submit-button" onClick={addJobToList}>Add</button> */}
                <button type="submit" className="submit-button">Submit Job</button>
            </form>
            {/* <div className="table-section">
                <AllJobsTable refresh={refresh} />
            </div> */}
        </div>
    );
};

export default AddJobForm;
