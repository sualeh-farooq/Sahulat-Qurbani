import ServiceDataHomeThree from "@/data/service-data-home-3";
import Link from "next/link";
import React from "react";

const Categories = () => {
  return (
    <>
      <section
        className="services-area tp-common-area  grey-bg mt-100"
        style={{ backgroundImage: `url(/assets/img/shape/shape-bg-01.png)` }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12 col-md-12 col-12">
              <div className="tp-section pt-0  pb-0 tp-section-center text-center">
              
                <h3 className="tp-section__title mb-75 text-gray">Glimpse of Qurbani 2023</h3>
              </div>
            </div>
         
          </div>
          <div className="row">
            {ServiceDataHomeThree.map((item) => (
              <div
                key={item.id}
                className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-12"
              >
                <Link target="_blank" href={item.link} >
                <div
                  className={`services-thumb-box ${item.color} mb-30 wow fadeInUp`}
                  data-wow-delay=".6s"
                >
                  <div className="services-thumb-box__thumb fix">
                    <img style={{objectFit: 'cover'}} src={item.img} alt="services-thumb" />
                  </div>
                 
                </div>
                </Link>
              </div>
            ))}
          </div>
         
        </div>
      </section>
    </>
  );
};

export default Categories;