import React, { useEffect, useState } from "react";
import logo from "../../../assets/bg1.png";
import "./EmpMain.css";
import axios from "axios";
import { Link } from "react-router-dom";

const EmpMain = () => {
  const empUser = JSON.parse(localStorage.getItem("Employer"));
  const token = empUser?.token;
  const empid = empUser?.id;

  const [data, setData] = useState(null);
  const [editJob, setEditJob] = useState(null); // State for the job being edited

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/employer/jobs/getjobsemployer",
          {
            params: { empid: empid },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (token && empid) {
      fetchData();
    }
  }, [empid, token]);

  let deleteHandler = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/employer/jobs/deletejob/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setData((prevData) => ({
        ...prevData,
        jobs: prevData.jobs.filter((job) => job.id !== id),
      }));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  let handleEdit = (job) => {
    setEditJob(job); // Set the job that needs to be edited
  };

  let handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/employer/jobs/updateJob/${editJob.id}`,
        editJob,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setData((prevData) => ({
        ...prevData,
        jobs: prevData.jobs.map((job) =>
          job.id === editJob.id ? { ...job, ...editJob } : job
        ),
      }));

      setEditJob(null); // Clear the edit job state after updating
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  const handleChange = (e) => {
    setEditJob({
      ...editJob,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="emp-main">
      <div className="navbar-menu">
        <div className="nav-logo">
          <img src={logo} alt="" />
        </div>
        <div className="nav-links">
          <Link style={{ textDecoration: "none" }} to="/employermain">
            <button> Home </button>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/postjob">
            {" "}
            <button> Post a Job</button>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/">
            {" "}
            <button> Sign Out</button>
          </Link>
        </div>
      </div>

      <div className="content">
        <h1>{editJob ? "Edit Jobs" : "Jobs Posted"}</h1>
        {data ? (
          <div className="mantren">
            {data.jobs.map((job) => (
              <div key={job.id} className="jobs">
                {editJob && editJob.id === job.id ? (
                  <div className="edit-form-container edit-form-active">
                    <div>
                      <div className="input">
                        <label htmlFor="">Job Role</label>
                        <input
                          type="text"
                          name="jobrole"
                          value={editJob.jobrole}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="input">
                        <label htmlFor="">Company Name</label>
                        <input
                          type="text"
                          name="jobcompanyname"
                          value={editJob.jobcompanyname}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="input">
                        <label htmlFor="">Experience Required</label>
                        <input
                          type="text"
                          name="jobexperiencerequired"
                          value={editJob.jobexperiencerequired}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="input">
                        {" "}
                        <label htmlFor="">Job Technologies</label>
                        <input
                          type="text"
                          name="jobtechnologies"
                          value={editJob.jobtechnologies}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="input">
                        {" "}
                        <label htmlFor="">Job Location</label>
                        <input
                          type="text"
                          name="joblocation"
                          value={editJob.joblocation}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="input">
                        <label htmlFor="">Job Graduate</label>
                        <input
                          type="text"
                          name="jobgraduate"
                          value={editJob.jobgraduate}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="input">
                        <label htmlFor="">Language</label>
                        <input
                          type="text"
                          name="joblanguage"
                          value={editJob.joblanguage}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="input">
                        <label htmlFor="">Notice Period</label>
                        <input
                          type="text"
                          name="jobnoticeperiod"
                          value={editJob.jobnoticeperiod}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="buttons">
                      <button onClick={handleUpdate}>Save</button>
                      <button onClick={() => setEditJob(null)}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="job-card-horizontal">
                    <h2 className="job-title">Job Details</h2>
                    <div className="job-content">
                      <div className="job-info-horizontal">
                        <div className="job-detail-horizontal">
                          <label>Role:</label>
                          <p>{job.jobrole}</p>
                        </div>
                        <div className="job-detail-horizontal">
                          <label>Company:</label>
                          <p>{job.jobcompanyname}</p>
                        </div>
                        <div className="job-detail-horizontal">
                          <label>Experience Required:</label>
                          <p>{job.jobexperiencerequired}</p>
                        </div>
                        <div className="job-detail-horizontal">
                          <label>Technologies:</label>
                          <p>{job.jobtechnologies}</p>
                        </div>
                        <div className="job-detail-horizontal">
                          <label>Location:</label>
                          <p>{job.joblocation}</p>
                        </div>
                        <div className="job-detail-horizontal">
                          <label>Graduate:</label>
                          <p>{job.jobgraduate}</p>
                        </div>
                        <div className="job-detail-horizontal">
                          <label>Languages:</label>
                          <p>{job.joblanguage}</p>
                        </div>
                        <div className="job-detail-horizontal">
                          <label>Notice Period:</label>
                          <p>{job.jobnoticeperiod}</p>
                        </div>
                      </div>
                      <div className="job-buttons-horizontal">
                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(job)}
                        >
                          Edit Job
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => deleteHandler(job.id)}
                        >
                          Delete Job
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No jobs found.</p>
        )}
      </div>
    </div>
  );
};

export default EmpMain;
