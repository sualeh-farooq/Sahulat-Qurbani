import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Link from "next/link";

import { Autoplay, Pagination, Navigation } from "swiper";

export default function App() {
  const hero_slider = [
    {
      id: 1,
      title: (
        <>
          Our Passion is to <br /> Give you Better <br /> Service
        </>
      ),
      des: (
        <>
          Your full service lab for clinical trials. Our mission is to ensure
          the <br /> generation of accurate and precise findings
        </>
      ),
      appointment: "Appointment",
      about: "About us",
      // img_1: "/assets/img/slider/manufacture.jpg",
      img_1: "/assets/img/slider/derma.png",


      img_2: "/assets/img/slider/bg-gold.png",
    },
    {
      id: 2,
      title: (
        <>
          Our Passion is to <br /> Give you Better <br /> Service
        </>
      ),
      des: (
        <>
          Your full service lab for clinical trials. Our mission is to ensure
          the <br /> generation of accurate and precise findings
        </>
      ),
      appointment: "Appointment",
      about: "About us",
      // img_1: "/assets/img/slider/custom.jpg",
      img_1: "/assets/img/slider/derma.png",

      img_2: "/assets/img/slider/formulation.jpg",
    },
  ];
  return (
    <>
      <section className="slider-area slider-tp-top  p-relative   ">
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          centeredSlides={false}
          loop={false}
         
          autoplay={false}
          pagination={{
            clickable: false,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
        
            
          <SwiperSlide>
      


<div style={{padding: '50px 20px'}} className="bg-dark  container-fluid">
              <div  className="row ">
                <div  className=" col-lg-6 col-md-12 col-12 order-2 order-lg-1 d-flex flex-column justify-content-center">
                <h1 className="hero_text text-white" >
         Experience Simplest
                        and Shariah-Compliant {" "}
                       Qurbani with Sahulat Qurbani
                    </h1>
                    <p className="text-white support_text">
                    Sahulat Qurbani has strict Shariah compliance and complete transparency, we handle every aspect of your Qurbani with the respect and care it deserves.
                    {/* Join us in fulfilling the sacred tradition with ease, transparency, and compassion. Qurbani 2025 - A Gift for Allah and Humanity. */}
                    </p>
                    {/* <p>"Providing exceptional Qurbani services for over 5 years. Healthy animals, professional butchers, and meat distribution to the most deserving, all in the name of Allah."</p> */}
                    
                </div>
                
              </div>
            </div>
          </SwiperSlide>

        </Swiper>
      </section>
    </>
  );
}
