import React from "react";
import styled from "styled-components";
import FeatureCarousel from "../components/FeatureCarousel";
import AnimatedBackground from "../components/AnimatedBackground";

const Hero = styled.div`
  background: linear-gradient(135deg,rgb(194, 228, 198),rgb(207, 226, 230));
  padding: 2rem 1rem;
  text-align: center;
  font-family: 'Josefin Sans', sans-serif;
  border-radius: 8px;
  width: 80%;
  margin: 2rem auto;
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const HeroTitle = styled.h1`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const CarouselContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  align-items: center;
  margin: 0 auto;
  padding: 0;
  width: 80%;
`

const AboutText = styled.p`
  max-width: 600px;
  text-align: center;
  margin: 1rem auto;
  font-size: 1.2rem;
  font-family: 'Josefin Sans', sans-serif;
  color: black;
`

const AboutDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: linear-gradient(135deg,rgb(194, 228, 198),rgb(207, 226, 230));
  border-radius: 12px;
  width: 50%;
  margin: 2rem auto;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: black;
  border-radius: 4px;
  border: none;
  text-decoration: none;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 1.1rem;
  underline: none;
  cursor: pointer;
  background-color:rgba(226, 237, 227, 0.73);
  margin-bottom: 1rem;
  padding: 1rem 1.5rem;
  transition: background-color 0.3s ease;


  &:hover {
    background-color: #ddeedf;
  }

  &:visited {
    color: white;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

`

function HomePage() {
  return (
    <>
     <AnimatedBackground />
    <br></br>
        <Hero>
          <HeroTitle>Reflect. Analyze. Grow.</HeroTitle>
          <HeroSubtitle>
            Uncover the emotional trends in your journal with the power of NLP.
          </HeroSubtitle>
        </Hero>
        <CarouselContainer>
          <AboutDiv>
            <AboutText>
              Mood Tracker is a personal journaling tool that uses natural language processing to analyze your journal entries, 
              helping you understand your mood patterns and reflect with intention.
            </AboutText>
            <br></br>
            <br></br>
            <Button>
              <a href="/journal">Start Journaling!</a>
            </Button>
          </AboutDiv>
          <FeatureCarousel />
        </CarouselContainer>


    </>
  );
}

export default HomePage;
