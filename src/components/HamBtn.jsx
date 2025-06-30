import React from "react";
import styled from "styled-components";

const HamBtn = () => {
  return (
    <StyledWrapper>
      <label className="toggle">
        <input id="checkbox" type="checkbox" />
        <div id="bar1" className="bars" />
        <div id="bar2" className="bars" />
        <div id="bar3" className="bars" />
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .toggle input {
    display: none;
  }

  .toggle {
    position: relative;
    width: 40px;
    height: 40px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition-duration: 0.3s;
  }

  .bars {
    width: 100%;
    height: 4px;
    background-color: black;
    border-radius: 5px;
    transition-duration: 0.3s;
  }

  .toggle input:checked ~ #bar1 {
    transform: rotate(45deg) translate(10px, 10px);
  }

  .toggle input:checked ~ #bar2 {
    opacity: 0;
  }

  .toggle input:checked ~ #bar3 {
    transform: rotate(-45deg) translate(10px, -10px);
  }
`;

export default HamBtn;
