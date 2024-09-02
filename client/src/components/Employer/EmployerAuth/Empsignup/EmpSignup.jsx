import React, { useEffect, useState } from "react";
import "./EmpSignup.css";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "../../../../assets/bg1.png";

const EmpSignup = () => {
  let [companyname, setCmpanyname] = useState("");
  let [email, setEmail] = useState("");
  let [mobile, setMobile] = useState("");
  let [companytype, setCompanytype] = useState("");
  let [password, setPassword] = useState("");
  let [address, setAddress] = useState("");
  let [p, setP] = useState("");
  let [otpcode, setOtpcode] = useState();
  let [success, setSuccess] = useState("");
  let registerHandler = async () => {
    let responce = await axios.post(
      "http://localhost:3000/api/employer/register",
      {
        companyname: companyname,
        email: email,
        mobile: mobile,
        companytype: companytype,
        password: password,
        address: address,
      }
    );
    setP(responce.data);
  };

  let verifyHandler = async () => {
    let response = await axios.post("http://localhost:3000/verify-otp", {
      otp: otpcode,
    });
    setSuccess(response.data);
  };

  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes in seconds
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  useEffect(() => {
    // Update the time left every second
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="employer-signup">
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
      <div className="signup-page">
        <div className="employerr-signup">
          <h1>Employer Signup</h1>
          <div className="in-out">
            {" "}
            <div className="input">
              <label htmlFor="">Company Name</label>
              <input
                type="text"
                value={companyname}
                onChange={(e) => setCmpanyname(e.target.value)}
                placeholder="Companyname"
              />
            </div>
            <div className="input">
              {" "}
              <label htmlFor="">Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
              />
            </div>
          </div>
          <div className="in-out">
            <div className="input">
              <label htmlFor="">Mobile</label>
              <input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="mobile"
              />
            </div>
            <div className="input">
              <label htmlFor="">Company Type</label>
              <input
                type="text"
                value={companytype}
                onChange={(e) => setCompanytype(e.target.value)}
                placeholder="companytype"
              />
            </div>
          </div>
          <div className="in-out">
            {" "}
            <div className="input">
              {" "}
              <label htmlFor="">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
              />
            </div>
            <div className="input">
              {" "}
              <label htmlFor="">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="address"
              />
            </div>
          </div>
          <div>
            {" "}
            <button onClick={registerHandler}>Register</button>
            {p ? (
              <div className="otp">
                <p>{p}</p>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otpcode}
                  onChange={(e) => setOtpcode(e.target.value)}
                />
                <button onClick={verifyHandler}>Verify</button>
                <div className="resend">
                  <p>ResendOtp</p>
                  <p>
                    OTP valid for : {minutes}:
                    {seconds < 10 ? `0${seconds}` : seconds}
                  </p>
                </div>
                <Link to="/">
                  {" "}
                  <h3> Email {success} :-) !!! </h3>{" "}
                </Link>
              </div>
            ) : (
              ""
            )}
            <Link
              to="/employerlogin"
              style={{
                textDecoration: "none",
                color: "#0d7794",
                marginLeft: "10px",
              }}
            >
              {" "}
              Existing User ? Login{" "}
            </Link>
          </div>
        </div>
        <div className="signup-rightt">
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

export default EmpSignup;
