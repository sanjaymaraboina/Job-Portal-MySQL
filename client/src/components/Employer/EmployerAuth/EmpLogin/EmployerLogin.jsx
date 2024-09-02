import React, { useState } from "react";
import "./EmployerLogin.css";
import axios from "axios";
import logo from "../../../../assets/bg1.png";
import { Link, useNavigate } from "react-router-dom";

const EmployerLogin = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let navigate = useNavigate();
  const [msg, setMsg] = useState("");

  let handleLogin = async () => {
    try {
      let response = await axios.post(
        "http://localhost:3000/api/employer/login",
        { email, password }
      );
      console.log(response.data);

      // Store the full response.data as a string in localStorage
      localStorage.setItem("Employer", JSON.stringify(response.data));

      if (response.data) {
        navigate("/employermain");
      } else {
        setMsg("Invalid login credentials. Please try again.");
      }
    } catch (error) {
      setMsg("Login failed. Please check your credentials and try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="employer-login">
      <div className="navbar-menu">
        <div className="nav-logo">
          <img src={logo} alt="" />
        </div>
        <div className="nav-links">
          <Link style={{ textDecoration: "none" }} to="/employeelogin">
            <button> Employee </button>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/employerlogin">
            {" "}
            <button> Employer</button>
          </Link>
        </div>
      </div>
      <div className="login-page">
        <div className="form-emp">
          <h1>Employer Login</h1>
          <div className="input">
            <label htmlFor="">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div className="input">
            {" "}
            <label htmlFor="">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              
            />
          </div>
          <div>
            <div>
              <button onClick={handleLogin}>Login</button>
              <Link
                style={{ textDecoration: "none", color: "#0d7794" }}
                to="/empsignup"
              >
                Don't have an Account? Signup
              </Link>
              {msg && <p style={{ marginTop: "10px" }}>{msg}</p>}
            </div>
          </div>
        </div>
        <div className="loginpage-right">
          <h1>Efficient Access to Your Recruitment Hub</h1>
          <p>
            Welcome to your exclusive login portal, designed for employers to
            manage and optimize their recruitment efforts with ease. By signing
            in, you gain secure access to your recruitment dashboard, where you
            can post job openings, review candidate applications, and monitor
            the hiring process in real-time. Our platform ensures that your
            company’s data and job postings are kept confidential while
            providing a seamless experience in attracting top talent. With
            powerful tools at your fingertips, you can streamline your hiring
            process, target the right candidates, and build a team that drives
            your business forward. Sign in now to take full control of your
            recruitment strategy and connect with the best candidates for your
            organization.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmployerLogin;
