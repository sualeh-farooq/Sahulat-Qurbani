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
          // autoplay={
          //   {
          //     delay: 4000,
          //     disableOnInteraction: false,
          //   }
          // }
          autoplay={false}
          pagination={{
            clickable: false,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
        
            
          <SwiperSlide>
            {/* <div style={{paddingLeft: '20px'}} className="bg-dark  container-fluid">
              <div  className="row ">
                <div  className="banner_col col-lg-6 col-md-12 col-12 order-2 order-lg-1">
                  <div className="  hero-con h-100 ">
                  <h3 className=" hero-head">
                      Unlock Radiant Skin with{" "}
                      <span className="text-primary"> N Healthcare 's </span>{" "}
                      Expert{" "}
                      <span className="text-primary">Derma Solutions</span>
                    </h3>
                    <p className="text-white">
                      Elevate Your Brand with Customized Formulations and
                      Seamless Production Partnering for Radiant Results -
                      Nurturing Skincare, Crafting Success Your Vision, Our
                      Expertise - Where Innovation Meets Immaculate Execution
                    </p>
                    <div className="slider-content__btn mb-165"></div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-12 order-1 order-lg-2 mobile_col ">
                  <img className="skin_banner_img" src="/assets/img/slider/first.png" alt="first slider skin" />
                  <img className="skin_banner_img_mobile" src="/assets/img/slider/derma2.png" alt="first slider skin" />
                </div>
              </div>
            </div> */}


<div style={{paddingLeft: '20px'}} className="bg-dark  container-fluid">
              <div  className="row ">
                <div  className=" col-lg-6 col-md-12 col-12 order-2 order-lg-1 d-flex flex-column justify-content-center">
                <h1 className="hero_text text-white" >
         Experience Convenient 
                        and Shariah-Compliant {" "}
                       Qurbani with Sahulat Qurbani
                    </h1>
                    <p className="text-white support_text">
                    Join us in fulfilling the sacred tradition with ease, transparency, and compassion. Qurbani 2024 - A Gift for Allah and Humanity.
                    </p>
                    {/* <p>"Providing exceptional Qurbani services for over 5 years. Healthy animals, professional butchers, and meat distribution to the most deserving, all in the name of Allah."</p> */}
                    
                </div>
                <div className="col-lg-6 col-md-6 col-12 order-1 order-lg-2 mobile_col p-0 d-flex justify-content-center ">
                  <img style={{width: '70%'}} className="skin_banner_img" src="/assets/img/logo/goat-removebg.png" alt="first slider skin" />
                  <img style={{borderRadius: '100%' , width: '70%'}} className="skin_banner_img_mobile" src="/assets/img/logo/goat-removebg.png" alt="first slider skin" />
                </div>
              </div>
            </div>
          </SwiperSlide>

        </Swiper>
      </section>
    </>
  );
}
