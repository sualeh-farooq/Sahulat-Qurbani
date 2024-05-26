import {Row , Col } from 'reactstrap'
import Image from 'next/image'
import tube from '../../public/assets/img/mufti.jpg'
const Packaging = () =>{
    return (
        <>
                {/* <div  style={{boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'}} id='about' className='container my-4 py-2 '  > */}
                <div  id='about' className='container my-4 py-2 '  >
        <Row  >
            <Col className='packing_responsive about-content-mobile' sm="12" md="6" lg="6" >
                 <div className=' d-flex flex-column h-100 justify-content-start pt-50 align-items-start  gap-4 wow fadeInLeft col-md-12 col-12 order-2 order-lg-1' data-wow-delay="0.7s"  >
                 <div className='about-content-mobile w-100' >
                 <h2 style={{color: '#000'}} >
              Our Introduction

                    </h2>
                 </div>
                    <p style={{fontSize: 'large'}} className='text-accent' >
                  
                    Sahulat Qurbani, an initiative by Ansar-e-Madina, has been providing exceptional collective Qurbani services for the past thirty five years under the visionary leadership of <b>Mufti Hamid Mehmood Kagani</b>. </p>

                    <p  style={{fontSize: 'large'}} className='text-accent'>
                    Our organization is dedicated to facilitating the sacred practice of Qurbani by offering a seamless and trustworthy online platform. With a commitment to upholding Islamic traditions and ensuring the welfare of our community, Sahulat Qurbani has become a reliable name in delivering hassle-free Qurbani services.
                    </p>

                    <p  style={{fontSize: 'large'}} className='text-accent'>

                   This service aims to provide support and resources to those in need, promoting social welfare and solidarity. Through its multifaceted approach, Jamia Ansar e Madinah strives to nurture a new generation of Islamic scholars, thinkers, and community leaders who are equipped to make a positive impact in the world.
                    </p>

                    <p  style={{fontSize: 'large'}} className='text-accent'>

                        {/* <h4 className='text-dark' >Leadership</h4> */}
                    
Under the shade of Ansar-e-Madina, Sahulat Qurbani is proudly led by <b><a target='_blank' href="https://www.facebook.com/hafizarsalan.janmemon.1">Hafiz Muhammad Arsalan Edhi</a></b>, a well-known naat khuwan and one of the active members of Ansar-e-Madina. His dedication and active involvement ensure that the values and mission of Sahulat Qurbani are upheld with integrity and compassion.
                    </p>

                 </div>
            </Col>
            <Col className='about-content-mobile' sm="12" md="6" lg="6" >
            {/* <div className="slider-content__bg second_slider_img  wow fadeInRight" data-wow-delay="0.3s"> */}

                    <img style={{width: '100%' , height: 700 , objectFit: 'cover'}} src="./assets/img/mufti2.jpg" />
                    {/* </div> */}
            </Col>
        </Row>
                </div>
        </>
    )
}

export default Packaging