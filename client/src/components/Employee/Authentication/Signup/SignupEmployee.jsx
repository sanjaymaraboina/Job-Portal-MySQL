import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./SignupEmployee.css";
import logo from "../../../../assets/bg1.png";

const SignupEmployee = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [currentcompany, setCurrentcompany] = useState("");
  const [companytype, setCompanytype] = useState("");
  const [currenttechnologies, setCurrenttechnologies] = useState("");
  const [currentexperience, setCurrentexperience] = useState("");
  const [address, setAddress] = useState("");
  const [language, setLanguage] = useState("");
  const [noticeperiod, setNoticeperiod] = useState("");
  const [otpMessage, setOtpMessage] = useState("");
  const [otpcode, setOtpcode] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/employee/register",
        {
          fullname,
          email,
          mobile,
          password,
          currentcompany,
          companytype,
          currenttechnologies,
          currentexperience,
          address,
          language,
          noticeperiod,
        }
      );
      setOtpMessage(response.data);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const verifyHandler = async () => {
    try {
      const response = await axios.post("http://localhost:3000/verify-otp", {
        otp: otpcode,
      });
      setSuccess(response.data);
    } catch (error) {
      console.error("OTP verification failed:", error);
    }
  };

  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes in seconds
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="signup-employee">
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
      <div className="signup-pages">
        <div className="form-signup">
          <h1>Employee Signup</h1>
          <div>
            {" "}
            <div className="in-out">
              <div className="input">
                {" "}
                <label htmlFor="">Full Name</label>
                <input
                  type="text"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  placeholder="Full Name"
                />
              </div>
              <div className="input">
                {" "}
                <label htmlFor="">Email</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="in-out">
              {" "}
              <div className="input">
                <label htmlFor="">Mobile</label>
                <input
                  type="text"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Mobile"
                />
              </div>
              <div className="input">
                <label htmlFor="">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="in-out">
              <div className="input">
                <label htmlFor="">Current Company</label>
                <input
                  type="text"
                  value={currentcompany}
                  onChange={(e) => setCurrentcompany(e.target.value)}
                  placeholder="Current Company"
                />
              </div>
              <div className="input">
                <label htmlFor="">Company Type</label>
                <input
                  type="text"
                  value={companytype}
                  onChange={(e) => setCompanytype(e.target.value)}
                  placeholder="Company Type"
                />
              </div>
            </div>
            <div className="in-out">
              <div className="input">
                {" "}
                <label htmlFor="">Current Technologies</label>
                <input
                  type="text"
                  value={currenttechnologies}
                  onChange={(e) => setCurrenttechnologies(e.target.value)}
                  placeholder="Current Technologies"
                />
              </div>
              <div className="input">
                {" "}
                <label htmlFor="">Current Experience</label>
                <input
                  type="text"
                  value={currentexperience}
                  onChange={(e) => setCurrentexperience(e.target.value)}
                  placeholder="Current Experience"
                />
              </div>
            </div>
            <div className="in-out">
              {" "}
              <div className="input">
                {" "}
                <label htmlFor="">Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Address"
                />
              </div>
              <div className="input">
                <label htmlFor="">Language</label>
                <input
                  type="text"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  placeholder="Language"
                />
              </div>
            </div>
            <div className="in-out">
              {" "}
              <div className="input">
                <label htmlFor="">Notice Period</label>
                <input
                  type="text"
                  value={noticeperiod}
                  onChange={(e) => setNoticeperiod(e.target.value)}
                  placeholder="Notice Period"
                />
              </div>
            </div>
          </div>

          <div>
            <button onClick={handleRegister}>Register</button>

            {otpMessage && (
              <div className="otp">
                <p>{otpMessage}</p>
                <label htmlFor="">Enter OTP</label>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otpcode}
                  onChange={(e) => setOtpcode(e.target.value)}
                />
                <button onClick={verifyHandler}>Verify</button>
                <div className="resend">
                  <p>Resend OTP</p>
                  <p>
                    OTP valid for: {minutes}:
                    {seconds < 10 ? `0${seconds}` : seconds}
                  </p>
                </div>
                <Link to="/employeemain">
                  <h3>{success} !!!</h3>
                </Link>
              </div>
            )}
            <Link
              to="/employeelogin"
              style={{
                textDecoration: "none",
                color: "#0d7794",
                marginLeft: "10px",
              }}
            >
              Existing User? Login
            </Link>
          </div>
        </div>
        <div className="signup-right">
          <h1>Join and Start Your Career Journey</h1>
          <p>
            Embark on an exciting path toward your dream job by signing up with
            our platform. Creating your account is the first step in accessing a
            wide range of job opportunities tailored specifically to your
            skills, experience, and career aspirations. As a member, you'll gain
            access to an intuitive dashboard where you can easily manage your
            applications, receive personalized job recommendations, and connect
            with top employers looking for talent like yours. Our platform is
            designed to support your career growth at every stage, offering
            tools to enhance your profile, stay updated on industry trends, and
            receive alerts about new openings. Sign up today and take control of
            your career, knowing that every opportunity is just a click away.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupEmployee;
