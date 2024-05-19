import Image from "next/image";
import Contract from "../../public/assets/img/banner/contract.png";
import Custom from "../../public/assets/img/banner/custom.jpg";
// import Label from "../../public/assets/img/banner/label.jpg";
import Delivery from '../../public/assets/img/delivery.jpg'
import Charity from '../../public/assets/img/charity.jpg'
import Label from "../../public/assets/img/banner/label.jpeg";
import Selection from '../../public/assets/img/selection.jpg'

export default function Services() {
  return (
    <>
      <section>
        <div id="our_services" className="container mt-100 wow fadeInUp" data-wow-delay="0.8s" >
          <div className="row">
            <div className="col-lg-12">
              <div className=" text-center">
                <h2  className="mb-30 text-gray">
                  {/* POWERED BY EXPERIENCE. DRIVEN BY INNOVATION. */}
                  {/* Powered By Experience. Driven By Innovation. */}
                  Powered by Tradition. Driven by Compassion.
                </h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="service_sec col-xl-4 col-lg-4 col-md-6 col-sm-12">
              <div
                className="tp-choose__item  mb-100 "
              >
                <div>
                  <Image
                    src={Selection}
                    alt="Quality Manufacturing"
                    width={350}
                    style={{width: '100%' , objectFit: 'cover'}}
                  />
                </div>
                <div>
                  <h4  className="my-4 text-gray"> Selection of Animals</h4>
                  <p className="text-accent" style={{fontSize : 'large'}} >

                  Our team carefully selects healthy and fit animals, ensuring that your Qurbani is performed with the best livestock. We prioritize the well-being and quality of the animals.



                  </p>
                </div>
              </div>
            </div>
            <div className="service_sec col-xl-4 col-lg-4 col-md-6 col-sm-12">
              <div
                className="tp-choose__item  mb-100 wow fadeInUp"
                data-wow-delay=".8s"
              >
                <div>
                  <Image style={{width: '100%' , objectFit: 'cover'}} src={Delivery} alt="Custom Formulation" width={350} />
                </div>
                <div>
                  <h4  className="my-4 text-gray">Delivery to the Needy</h4>
                  <p className="text-accent" style={{fontSize : 'large'}} >
                  With our Waqf Qurbani service, the meat is directly delivered to the most deserving individuals, ensuring that your Qurbani reaches those who need it most.</p>
                </div>
              </div>
            </div>
            <div className="service_sec col-xl-4 col-lg-4 col-md-6 col-sm-12">
              <div
                className="tp-choose__item  mb-100 wow fadeInUp"
                data-wow-delay=".8s"
              >
                <div>
                  <Image  src={Charity} style={{width: '100%' , objectFit: 'cover'}} alt="Private Labelling" width={350} height={230} />
                </div>
                <div>
                  <h4  className="my-4 text-gray">Charity and Donations</h4>
                  <p className="text-accent" style={{fontSize : 'large'}} >
                  By choosing Sahulat Qurbani, you extend a helping hand to those in need, as a significant portion of the meat is distributed to the most deserving, embodying the true essence of Qurbani.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
