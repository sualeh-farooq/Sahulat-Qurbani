import Link from "next/link";
import React from "react";
// import ContactUs from "../forms/contact-us";
// import ContactUs from "./contact-us";
import Qurbani from "./qurbani";

// contact_info
const contact_info = {
  address: (
    <>
  St 9th , Siddeeqabad F.B. Area Block 3, Karimabad, Gulberg Town, Karachi
    </>
  ),
  phone_1: "Sahulatqurbani1@gmail.com",
  phone_2: "+92-327-2738989",
  open: (
    <>
      Monday - Saturday <br />
      09:00 AM - 05:00 PM
    </>
  ),
};

const { address, phone_1, phone_2, open } = contact_info;
const QurbaniForm = () => {
  return (
    <>
      <section
        style={{ paddingTop: "9rem" }}
        className="contact-area mt-6  pb-20">
        <section style={{ paddingTop: "2rem"  ,  marginBottom: '2rem' , marginTop: '-20px'  , backgroundColor: '#383838'}}  >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-12 col-md-7 col-12">
                <div className="text-center " >  
                  <h2 className="text-white " >Online Qurbani Booking Form</h2>
                  <p className="text-white" >
                  Please fill out the Online Qurbani form provided below with the required information, and our dedicated team will promptly reach out to you for confirmation. We understand the importance of ensuring a smooth and seamless experience for you </p>
                    {/* Feel free to reach out to us for questions, feedback, or support. We value your input and look forward to hearing from you</p> */}
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="container mt-30">
          <div className="row">
            
            <div className="col-12">
              <div className="contactform ">
                {/* <h4 className="contactform__title mb-35">
                  Send us Your Inquiry :
                </h4> */}
                <Qurbani />

            
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default QurbaniForm;
