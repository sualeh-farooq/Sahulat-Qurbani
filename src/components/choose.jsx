import Link from "next/link";
import React from "react";


// choose data
const choose = [
  {
    id: 1,
    color: "",
    icon: "fa fa-badge-check",
    title: (
      <>
      Effortless and Transparent Service
      </>
    ),
    des: (
      
      <>
      Our streamlined process ensures smooth experience, from selecting animal to the final distribution, with complete transparency at every step.
      </>
    ),
  },
  {
    id: 2,
    // color: "pink-icon",
    icon: "fa fa-cow",
    title: (
      <>
      Healthy and Robust Animals
      </>
    ),
    des: (
      <>
      We prioritize selecting animals that are in prime health and condition, ensuring your Qurbani is performed with the best.
      </>
    ),
  },
  {
    id: 3,
    // color: "green-icon",
    icon: "fa fa-mosque",
    title: (
      <>
      Adherence to Shariah Principles
      </>
    ),
    des: (
      <>

Every step of our process is conducted in strict accordance with Islamic guidelines, ensuring your Qurbani is Shariah-compliant.
      </>
    ),
  },
  {
    id: 4,
    // color: "sky-icon",
    icon: "fa fa-users",
    title: (
      <>

Prioritizing the Needy Families
      </>
    ),
    des: (
      <>
     We ensure that the meat reaches the most deserving individuals, fulfilling the essence of Qurbani.
      </>
    ),
  },
];


const Specialists = () => {
  return (
    <>
      <section id="choose" style={{backgroundColor: '#000'}} className="choose-area  pt-40  mb-4 " >
        <div className="container wow fadeInUp"  data-wow-delay=".8s">
          <div className="row">
            <div className="col-lg-12">
              <div className=" text-center">
                <h3 className="tp-section__title text-white mb-50">
                Why Choose Sahulat Qurbani?
                </h3>
              </div>
            </div>
          </div>
          <div className="row">
            {choose.map((item) => (
              <div key={item.id} className="col-xl-3 col-md-6">
                <div
                  className="choose_text tp-choose__item  mb-100 "
                 
                >
                  <div className={`tp-choose__icon choose_icon ${item.color} mb-40`}>
                    <i className={item.icon}></i>
                  </div>
                  <div className="tp-choose__content">
                    <h5 className="tp-choose__title mb-20">{item.title}</h5>
                    <p style={{fontSize : 'large'}} >{item.des}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </section>
    </>
  );
};

export default Specialists;
