import Count from "@/common/count";
import Link from "next/link";
import React from "react";

const AboutArea = () => {
  return (
    <>
      <section className="about-area pt-200">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-4 col-12">
              {/* <div className="tp-about-thumb mb-60 ">
                <div className="tp-ab-img d-flex">
                  <div className="tp-ab-main-img p-relative">
                    <img 
                      src="/assets/img/about/about3.jpeg"
                      alt="about-thumb"
                    />
                    
                    {/* <div className="about__exprience tp-ab-counter">
                      <h3 className="counter">

                        <Count add_style={true} number={12} />
                      </h3>
                      <i>
                        Years of <br />
                        Experience
                      </i>
                    </div> 
                  </div>
                  <div className="tp-ab-shape ">
                  
                    <img 
                      className="ab-shape-two"
                      src="/assets/img/about/about1.jpeg"
                      alt=""
                    />
                  </div>

                </div>
                <div className="derma_img" >
                <img 
                      className="ab-shape-one"
                      src="/assets/img/about/about-bg.jpg"
                      alt="about-shape"
                    />
                </div>
              </div> */}

<img className="mt-10" style={{width: '100%' , height: '100%' , objectFit: 'cover' , }} src="https://w0.peakpx.com/wallpaper/348/38/HD-wallpaper-nelore-barretos-bull-bulls-cow-cows-gado-ox-palin-vaca.jpg" />
{/* <img  style={{width: '100%' , height: '100%' , objectFit: 'cover'}} src="https://cdn.britannica.com/48/144348-050-FBB629CB/Madrasah-Jami-Masjid-Shrirangapattana-India-Karnataka.jpg" /> */}

            </div>
            <div className="col-xl-6 col-lg-8 col-12">
              <div
                className="about-content about-align mb-60 wow "
                
              >
                <div className="tp-section about-content-mobile">
                  <h3 className="tp-section__title ab-title mb-25 text-primary who_we_head">
                 Who We Are !
                  </h3>

                  <p className=" mr-20 mb-40 text-dark">
                  Jamia Ansar e Madinah, a renowned educational, welfare, and religious institute, is dedicated to imparting Quranic education and promoting Islamic values. With a strong emphasis on spiritual growth and community development, the institute offers a comprehensive curriculum that fosters a deep understanding of Islamic teachings and practices. In addition to its academic pursuits, Jamia Ansar e Madinah is committed to serving the community through various initiatives.
                  </p>

                 
                 
                  <p className=" mr-20 mb-40 text-dark">
                 
                  Sahulat Qurbani is one such initiative by Ansar-e-Madina, providing exceptional collective Qurbani services for the past five years under the visionary leadership of Mufti Hamid Mehmood Kagani. The organization is dedicated to facilitating the sacred practice of Qurbani by offering a seamless and trustworthy online platform. With a commitment to upholding Islamic traditions and ensuring the welfare of our community, Sahulat Qurbani has become a reliable name in delivering hassle-free Qurbani services.


                 </p>


                 <p className=" mr-20 mb-40 text-dark">

                 This service aims to provide support and resources to those in need, promoting social welfare and solidarity. Through its multifaceted approach, Jamia Ansar e Madinah strives to nurture a new generation of Islamic scholars, thinkers, and community leaders who are equipped to make a positive impact in the world.






            </p>
                </div>
                <div className="tp-about__info-list ab-check-list mb-55">
                  <ul>
                    <li className="text-dark" >
                      <i className="fa-solid fa-check text-primary"></i>
                      Visionary Leadership of Mufti Hamid Mehmood Kagani
                    </li>
                    <li className="text-dark">
                      <i className="fa-solid fa-check text-primary"></i>
                      Hassle-Free and Trustworthy Online Platform

                    </li>
                    <li className="text-dark">
                      <i className="fa-solid fa-check text-primary"></i>
                      100% Shariah Complaint
                    </li>
                    <li className="text-dark">
                      <i className="fa-solid fa-check text-primary"></i>
                      Commitment to Community Welfare
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutArea;
