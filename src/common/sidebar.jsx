import MobileMenus from '@/layout/header/mobile-menus';
import Link from 'next/link';
import React, { useState } from "react";
import SocialLinks from './social-links';


const images = [
  {
    img: "/assets/img/blog/blog-in-01.jpg",
  },
  {
    img: "/assets/img/blog/blog-in-02.jpg",
  },
  {
    img: "/assets/img/blog/blog-in-03.jpg",
  }
];


const Sidebar = ({ isActive, setIsActive }) => {

 
  // photoIndex
  const [photoIndex, setPhotoIndex] = useState(null);
  // image open state
  const [isOpen, setIsOpen] = useState(false);
  //  images
  const img = images.map((item) => item.img);

 
  return (
    <>
      <div
        className={`tpsideinfo tp-side-info-area ${
          isActive ? "tp-sidebar-opened" : ""
        }`}
      >
        <button
          onClick={() => setIsActive(false)}
          className="tpsideinfo__close"
        >
          <i className="fal fa-times"></i>
        </button>
        <div className="tpsideinfo__logo mb-40">
          <Link href="/">
            <img src="/assets/img/logo/logo_white.png" alt="logo" />
          </Link>
        </div>

        <div className="mobile-menu mean-container d-block d-lg-none">
          <div className="mean-bar">
            <MobileMenus />
          </div>
        </div>

        <div className="tpsideinfo__content mb-60">
          <p className=" d-none d-xl-block">
          Sahulat Qurbani is dedicated to facilitating the sacred practice of Qurbani by offering a seamless and trustworthy online platform. 

          </p>
          <span>Contact Us</span>
          <a  href="#">
            <i className="fa-solid fa-location-dot"></i>
            St 9th , Siddeeqabad F.B. Area Block 3, Karimabad, Gulberg Town, Karachi
          </a>
          <a href="tel:+923272738989">
            <i className="fa-solid fa-phone"></i>+92-327-2738989

            
          </a>
          <a href="mailto:Sahulatqurbani1@gmail.com">
            <i className="fa-solid fa-envelope"></i>Sahulatqurbani1@gmail.com
          </a>
        </div>
       
        
        <div className="tpsideinfo__socialicon">

        <a href="https://web.facebook.com/profile.php?id=61559403995091">
            <i className="fa-brands fa-facebook-f"></i>
          </a>


          <a target='_blank' href="https://www.instagram.com/sahulatqurbani//">
            <i className="fa-brands fa-instagram"></i>
          </a>
        
        
        </div>
      </div>

      <div
        onClick={() => setIsActive(false)}
        className={`body-overlay ${isActive ? "opened" : ""}`}
      ></div>

      
    </>
  );
};

export default Sidebar;