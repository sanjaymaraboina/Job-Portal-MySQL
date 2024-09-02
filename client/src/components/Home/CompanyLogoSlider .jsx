import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";
import image1 from "../../assets/1.webp";
import image2 from "../../assets/2.webp";
import image3 from "../../assets/3.webp";
import image4 from "../../assets/4.webp";
import image5 from "../../assets/5.webp";
import image6 from "../../assets/6.webp";
import image7 from "../../assets/7.webp";
import image8 from "../../assets/8.webp";
import image9 from "../../assets/9.webp";
import image10 from "../../assets/10.webp";
import image11 from "../../assets/11.webp";
import image12 from "../../assets/12.webp";
import image13 from "../../assets/13.webp";
import image14 from "../../assets/14.webp";
import image15 from "../../assets/15.webp";
import image16 from "../../assets/16.webp";
import image17 from "../../assets/17.png";
import image18 from "../../assets/18.webp";
import image19 from "../../assets/19.webp";
import image20 from "../../assets/20.webp";

const CompanyLogoSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 5, 
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "ease-in-out",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,

        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow:3,
          slidesToScroll: 3,
          infinite: true,

        },
      },
    ],
  };

  const logos = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
    image11,
    image12,
    image13,
    image14,
    image15,
    image16,
    image17,
    image18,
    image19,
    image20,
  ];

  return (
    <div className="company-logo-slider">
      <Slider {...settings}>
        {logos.map((logo, index) => (
          <div key={index}>
            <img
              src={logo}
              alt={`Company Logo ${index + 1}`}
              
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CompanyLogoSlider;
