import React, { useState } from "react";
import "./LoginEmployee.css";
import logo from "../../../../assets/bg1.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LoginEmployee = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/employee/login",
        { email, password }
      );
      if (response.data) {
        localStorage.setItem("loginData", JSON.stringify(response.data));
        navigate("/employeemain");
      } else {
        setMsg("Invalid login credentials. Please try again.");
      }
    } catch (error) {
      setMsg("Login failed. Please check your credentials and try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-employee">
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
          <h1>Employee Login</h1>
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
            <button onClick={handleLogin}>Login</button>
            <Link
              style={{ textDecoration: "none", color: "#0d7794" }}
              to="/registerEmployee"
            >
              Haven't registered yet? Sign up!
            </Link>
            {msg && <p style={{marginTop:"10px"}}>{msg}</p>}
          </div>
        </div>
        <div className="loginpage-right">
          <h1>Secure Access to Your Career Dashboard</h1>
          <p>
            Welcome to your dedicated login portal, designed for secure and
            efficient access to your career management tools. By signing in,
            employees can effortlessly navigate their personalized dashboard to
            manage job applications, update professional profiles, and monitor
            career progress. Our platform prioritizes your privacy and security,
            ensuring that all personal information remains confidential. With
            intuitive features and easy access to job opportunities tailored to
            your skills and preferences, you can stay connected to the latest
            openings and take proactive steps in your career development. Sign
            in now to unlock a streamlined job search experience and stay at the
            forefront of your professional journey.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginEmployee;
