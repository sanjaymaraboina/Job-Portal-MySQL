import React, { useState } from "react";
import "./Post.css";
import logo from "../../../assets/bg1.png";

import axios from "axios";
import { Link } from "react-router-dom";
const Post = () => {
  const empUser = JSON.parse(localStorage.getItem("Employer"));
  const token = empUser?.token;
  const empid = empUser?.id;
  const [jobcompanyname, setJobcompanyname] = useState("");
  const [jobrole, setJobrole] = useState("");
  const [jobTechnologies, setJobtechnologies] = useState("");
  const [jobexperiencerequired, setJobexperiencerequired] = useState("");
  const [joblocation, setJoblocation] = useState("");
  const [jobgraduate, setJobgraduate] = useState("");
  const [joblanguage, setJoblanguage] = useState("");
  const [jobnoticeperiod, setJobnoticePeriod] = useState(null);
  const [createmsg, setcreatemsg] = useState("");

  const handleCreateJob = async () => {
    try {
      let response = await axios.post(
        "http://localhost:3000/api/employer/jobs/createjob",
        {
          jobcompanyname: jobcompanyname,
          jobrole: jobrole,
          jobtechnologies: jobTechnologies,
          jobexperiencerequired: jobexperiencerequired,
          joblocation: joblocation,
          jobgraduate: jobgraduate,
          joblanguage: joblanguage,
          jobnoticeperiod: jobnoticeperiod,
          empid: empid,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data) {
        setJobcompanyname("");
        setJobexperiencerequired("");
        setJobgraduate("");
        setJoblanguage("");
        setJoblocation("");
        setJobnoticePeriod("");
        setJobrole("");
        setJobtechnologies("");
        setcreatemsg(response.data);
        console.log(createmsg);
      }
    } catch (error) {
      console.error("Error creating job:", error);
      setcreatemsg("Error while creating a job");
    }
  };
  return (
    <div className="post">
      <div className="navbar-menu">
        <div className="nav-logo">
          <img src={logo} alt="" />
        </div>
        <div className="nav-links">
          <Link style={{ textDecoration: "none" }} to="/employermain">
            <button> Home </button>
          </Link>

          <Link style={{ textDecoration: "none" }} to="/">
            {" "}
            <button> Sign Out</button>
          </Link>
        </div>
      </div>
      <div className="createjobs">
        <h1>Fill Job Details </h1>
        <div className="raster">
          <div className="in-out">
            {" "}
            <div className="input">
              <label htmlFor="">Company Name</label>
              <input
                type="text"
                placeholder="company name"
                value={jobcompanyname}
                onChange={(e) => setJobcompanyname(e.target.value)}
              />
            </div>
            <div className="input">
              {" "}
              <label htmlFor="">Job Role</label>
              <input
                type="text"
                placeholder="Job role"
                value={jobrole}
                onChange={(e) => setJobrole(e.target.value)}
              />
            </div>
          </div>
          <div className="in-out">
            {" "}
            <div className="input">
              {" "}
              <label htmlFor="">Job Technologies</label>
              <input
                type="text"
                placeholder="Job technologies"
                value={jobTechnologies}
                onChange={(e) => setJobtechnologies(e.target.value)}
              />
            </div>
            <div className="input">
              <label htmlFor=""> Experience Required</label>
              <input
                type="text"
                placeholder="Job experience required"
                value={jobexperiencerequired}
                onChange={(e) => setJobexperiencerequired(e.target.value)}
              />
            </div>
          </div>
          <div className="in-out">
            {" "}
            <div className="input">
              {" "}
              <label htmlFor="">Job Location</label>
              <input
                type="text"
                placeholder="Job Location"
                value={joblocation}
                onChange={(e) => setJoblocation(e.target.value)}
              />
            </div>
            <div className="input">
              <label htmlFor="">Job Graduation</label>
              <input
                type="text"
                placeholder="Job graduation"
                value={jobgraduate}
                onChange={(e) => setJobgraduate(e.target.value)}
              />
            </div>
          </div>
          <div className="in-out">
            <div className="input">
              {" "}
              <label htmlFor="">Language</label>
              <input
                type="text"
                placeholder=" Language"
                value={joblanguage}
                onChange={(e) => setJoblanguage(e.target.value)}
              />
            </div>
            <div className="input">
              {" "}
              <label htmlFor="">Job Notice Period</label>
              <input
                type="text"
                placeholder="Job Notice Period"
                value={jobnoticeperiod}
                onChange={(e) => setJobnoticePeriod(e.target.value)}
              />
            </div>
          </div>
        </div>
        <button id="bttn" onClick={handleCreateJob}>
          Create Job
        </button>

        <p id="sucmsg">{createmsg}</p>
      </div>
    </div>
  );
};

export default Post;
