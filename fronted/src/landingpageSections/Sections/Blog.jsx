import React from "react";
import styled from "styled-components";
// Components
import BlogBox from "../Elements/BlogBox";
import FullButton from "../Buttons/FullButton";
import TestimonialSlider from "../Elements/TestimonialSlider";

export default function Blog() {
  return (
    <Wrapper id="blog">
<HeaderInfo style={{ marginLeft: "110px" }} >
            <h1 className="font40 extraBold">What They Say?</h1>
            <p className="font13">
            Our clients share their success stories and experiences working with RecruiteEz, highlighting our commitment to excellence and our innovative approach to recruitment.
            </p>
          </HeaderInfo>
      <div className="lightBg" style={{padding: '50px 0'}}>
        <div className="container">
          
          <TestimonialSlider />
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  padding-top: 20px;
`;
const HeaderInfo = styled.div`
  margin-bottom: 30px;
  @media (max-width: 860px) {
    text-align: center;
  }
`;