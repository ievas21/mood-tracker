// src/components/FeatureCarousel.jsx

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from 'swiper/modules';
import styled from "styled-components";

const SquareSwiper = styled.div`
  width: 400px;
  height: 300px;
  margin: 0 auto;
  margin-bottom: 2rem;
  

  .swiper {
    width: 100%;
    height: 100%;
    border-radius: 16px;
    margin-bottom: 2rem;
    
  }

  .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    

    }   
`;


function FeatureCarousel() {
  return (
    <SquareSwiper>
        <Swiper
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{
                delay: 3000,
                disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        style={{
            width: "400px",       
            height: "300px",
            margin: "1rem auto",
            borderRadius: "12px", 
            overflow: "hidden"
            }}
        >
        <SwiperSlide>
            <div style={{ padding: "2rem", background: "linear-gradient(135deg,rgb(194, 228, 198),rgb(207, 226, 230))", borderRadius: "10px" }}>
            <h3>☀️ Sentiment Analysis</h3>
            <br></br>
            <p>Analyze how your journal entry feels using advanced NLP models.</p>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div style={{ padding: "2rem", background: "linear-gradient(135deg,rgb(194, 228, 198),rgb(207, 226, 230))", borderRadius: "10px" }}>
            <h3>📈 Mood Trends</h3>
            <br></br>
            <p>Track your emotional trends over time and gain insight into patterns.</p>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div style={{ padding: "2rem", background: "linear-gradient(135deg,rgb(194, 228, 198),rgb(207, 226, 230))", borderRadius: "10px" }}>
            <h3>🔒 Privacy First</h3>
            <br></br>
            <p>Your journal entries are saved safely — just for you, and only you.</p>
            </div>
        </SwiperSlide>
        </Swiper>
    </SquareSwiper>
  );
}

export default FeatureCarousel;
