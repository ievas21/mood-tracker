// src/components/AnimatedBackground.jsx

import styled, { keyframes } from "styled-components";

const gradient = keyframes`
  0% { background-position: 0%; }
  100% { background-position: 100%; }
`;

const Background = styled.div`
  background: linear-gradient(90deg, #A4BAF5,rgb(175, 212, 171),rgb(229, 230, 201));
  background-size: 300% 300%;
  animation: ${gradient} 4s alternate infinite;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
`;

export default Background;
