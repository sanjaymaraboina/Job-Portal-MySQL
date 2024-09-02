import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import logo from "../../assets/bg1.png";
import CompanyLogoSlider from "./CompanyLogoSlider ";
const Home = () => {
  return (
    <div className="home-main">
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
      <div className="herosection">
        <div className="heroLeft">
          <h1>Unlock Your Potential with New Opportunities</h1>
          <p>
            Begin your journey to success by finding the perfect job tailored to
            your skills and ambitions. Our platform provides a curated selection
            of opportunities that match your unique expertise and career goals.
            With advanced search features and personalized recommendations, you
            can easily discover roles that align with your professional
            aspirations. Unlock new possibilities and advance your career with
            confidence, knowing you're connected to top employers who value your
            talents.
          </p>
          <Link style={{ textDecoration: "none" }} to="/employeelogin">
            <span>Click here for Apply Job &#8594;</span>
          </Link>
        </div>
        <div className="heroRight">
          <h1>Streamlining Your Recruitment Efforts</h1>
          <p>
            Elevate your recruitment process by posting job opportunities that
            attract top talent. Our platform allows you to showcase your
            company's roles with precision, ensuring they reach qualified
            candidates who fit your needs. Benefit from advanced targeting and
            detailed job listings that highlight your organization's strengths
            and values. Streamline your hiring process  and contribute to your team's success, all while
            enhancing your employer brand in the competitive job market.
          </p>
          <Link style={{ textDecoration: "none" }} to="/employerlogin">
          {" "}
          <span>Click here for Post Job  &#8594;</span>
        </Link>
        </div>
      </div>
      <div className="slider-cont">
        <h1>Leading businesses</h1>
        <CompanyLogoSlider />
      </div>
    </div>
  );
};

export default Home;
