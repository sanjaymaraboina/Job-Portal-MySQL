import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Appliedjobs.css";
import { Link } from "react-router-dom";
import logo from "../../../assets/bg1.png";

const Appliedjobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const empdata = localStorage.getItem("loginData");

    if (empdata) {
      const { token, id } = JSON.parse(empdata);

      axios
        .get("http://localhost:3000/api/employee/jobs/getappliedjobs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            empid: id,
          },
        })
        .then((response) => {
          setJobs(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    } else {
      setError("No login data found");
      setLoading(false);
    }
  }, []);

  const handleApply = (jobId) => {
    const empdata = localStorage.getItem("loginData");

    if (empdata) {
      const { token, id } = JSON.parse(empdata);

      axios
        .post(
          `http://localhost:3000/api/employee/jobs/apply/${jobId}`,
          {
            empid: id,
            isapply: "true",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          alert("Applied Successfully");
          setJobs((prevJobs) =>
            prevJobs.map((job) =>
              job.jobid === jobId ? { ...job, isapply: "true" } : job
            )
          );
        })
        .catch((error) => {
          setError("Failed to apply for the job");
        });
    }
  };

  return (



    <div><div className="navbar">
        <div className="nav-logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="nav-links">
          <Link style={{ textDecoration: "none" }} to="/employeemain">
            <button>Home</button>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/employeemain">
            <button>Posted Jobs</button>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/">
            <button>Signout</button>
          </Link>
        </div>
      </div>
    <div className="emp-jobs">
      

      {loading ? (
        <p className="loading">Loading...</p>
      ) : error ? (
        <p className="error">Error: {error}</p>
      ) : jobs.length > 0 ? (
        jobs.map((job) => (
          <div key={job.jobid} className="job-item">
            <h3>
              {job.jobrole} at {job.jobcompanyname}
            </h3>
            <p><strong>Technologies:</strong> {job.jobtechnologies}</p>
            <p><strong>Experience Required:</strong> {job.jobexperiencerequired}</p>
            <p><strong>Location:</strong> {job.joblocation}</p>
            <p><strong>Graduate:</strong> {job.jobgraduate}</p>
            <p><strong>Language:</strong> {job.joblanguage}</p>
            <p><strong>Notice Period:</strong> {job.jobnoticeperiod} days</p>
            <p><strong>Application Status:</strong> {job.isapply === "false" ? "Not Applied" : "Applied"}</p>
            <div className="apply-button-container">
              {job.isapply === "false" ? (
                <button
                  className="apply-button"
                  onClick={() => handleApply(job.jobid)}
                >
                  Apply
                </button>
              ) : (
                <button className="apply-button applied">Applied</button>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No jobs available to apply.</p>
      )}
    </div></div>
  );
};

export default Appliedjobs;
