import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../../../assets/bg1.png";
import "./EmployeeMain.css";
import { Link } from "react-router-dom";

const EmployeeMain = () => {
  const [data, setData] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]); // State to track applied jobs
  const [error, setError] = useState(null);

  useEffect(() => {
    let empdata = localStorage.getItem("loginData");

    if (empdata) {
      const { token, id: empid } = JSON.parse(empdata);

      // Fetch all jobs
      axios
        .get("http://localhost:3000/api/employee/jobs/getjobs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching job data:", error);
          setError("Failed to fetch job data");
        });

      // Fetch applied jobs
      axios
        .get(`http://localhost:3000/api/employee/jobs/getappliedjobs`, {
          params: { empid },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const appliedJobIds = response.data.map((job) => job.jobid);
          setAppliedJobs(appliedJobIds); // Set applied jobs state
        })
        .catch((error) => {
          console.error("Error fetching applied jobs:", error);
          setError("Failed to fetch applied jobs");
        });
    } else {
      setError("No login data found");
    }
  }, []);

  const handleApply = (jobId) => {
    let empdata = localStorage.getItem("loginData");

    if (empdata) {
      const { token, id: empid } = JSON.parse(empdata);

      axios
        .post(
          `http://localhost:3000/api/employee/jobs/apply/${jobId}`,
          {
            empid,
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
          setAppliedJobs([...appliedJobs, jobId]); // Update applied jobs state
        })
        .catch((error) => {
          console.error("Error applying for the job:", error);
          setError("Failed to apply for the job");
        });
    }
  };

  return (
    <div className="employee-main">
      <div className="navbar-menu">
        <div className="nav-logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="nav-links">
          <Link style={{ textDecoration: "none" }} to="/">
            <button> Home </button>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/appliedjobs">
            <button> Applied Jobs</button>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/">
            <button> Sign Out</button>
          </Link>
        </div>
      </div>

      <div className="emp-jobs">
        <h1 className="jobs-head">Jobs</h1>
        {error && <p className="error">{error}</p>}
        {data.length > 0 ? (
          data.map((job) => (
            <div key={job.id} className="job-item">
              <div className="job-item-flex">
                <div className="item-flex">
                  {" "}
                  <p>
                    <strong>Job Role:</strong> {job.jobrole}
                  </p>
                  <p>
                    <strong>Company Name:</strong> {job.jobcompanyname}
                  </p>
                </div>
                <div className="item-flex">
                  {" "}
                  <p>
                    <strong>Technologies:</strong> {job.jobtechnologies}
                  </p>
                  <p>
                    <strong>Experience Required:</strong>{" "}
                    {job.jobexperiencerequired}
                  </p>
                </div>
              </div>
              <div className="job-item-flex">
                {" "}
                <div className="item-flex">
                  <p>
                    <strong>Location:</strong> {job.joblocation}
                  </p>
                  <p>
                    <strong>Graduate:</strong> {job.jobgraduate}
                  </p>
                </div>
                <div className="item-flex">
                  {" "}
                  <p>
                    <strong>Language:</strong> {job.joblanguage}
                  </p>
                  <p>
                    <strong>Notice Period:</strong> {job.jobnoticeperiod} days
                  </p>
                </div>
              </div>
              <div className="apply-button-container">
                {appliedJobs.includes(job.id) ? (
                  <button className="applied-status">Already Applied</button>
                ) : (
                  <button
                    className={`apply-button ${
                      appliedJobs.includes(job.id) ? "applied" : ""
                    }`}
                    onClick={() => handleApply(job.id)}
                  >
                    Apply
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No jobs available to apply.</p>
        )}
      </div>
    </div>
  );
};

export default EmployeeMain;
