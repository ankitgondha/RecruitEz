import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
// Components
import TestimonialBox from "../Elements/TestimonialBox";

export default function TestimonialSlider() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div>
      <Slider {...settings}>
        <LogoWrapper className="flexCenter">
          <TestimonialBox
            text="RecruiteEz has revolutionized the way I recruit. Their platform is intuitive, and I've found exceptional talent for my clients with ease."
            author="Rajesh Patel"
          />
        </LogoWrapper>
        <LogoWrapper className="flexCenter">
          <TestimonialBox
            text="ATS tool is a game-changer. It's simplified my workflow and allowed me to focus more on building relationships with candidates."
            author="Priya Sharma"
          />
        </LogoWrapper>
        <LogoWrapper className="flexCenter">
          <TestimonialBox
            text="I can't imagine recruiting without RecruiteEz. Their platform is comprehensive, and their customer support is top-notch and best exeperince."
            author="Amit Singh"
          />
        </LogoWrapper>
        <LogoWrapper className="flexCenter">
          <TestimonialBox
            text="RecruiteEz has made my job so much easier. The candidate management features are fantastic, and I've seen a significant improvement in my recruitment process."
            author="Anjali Gupta"
          />
        </LogoWrapper>
        <LogoWrapper className="flexCenter">
          <TestimonialBox
            text="Scheduling and interview management tools have saved me countless hours. I highly recommend it to any recruiter looking to streamline their process."
            author="Ravi Kumar"
          />
        </LogoWrapper>
        <LogoWrapper className="flexCenter">
          <TestimonialBox
            text="RecruiteEz has helped me find the perfect candidates for my clients. Their platform is efficient, and their support team is always there to assist me"
            author="Deepika Mishra"
          />
        </LogoWrapper>
      </Slider>
    </div>
  );
}

const LogoWrapper = styled.div`
  width: 90%;
  padding: 0 5%;
  cursor: pointer;
  :focus-visible {
    outline: none;
    border: 0px;
  }
`;
