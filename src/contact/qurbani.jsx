import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Swal from 'sweetalert2'


const Qurbani = () => {


  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [number, setNumber] = useState('')
  const [subject, setSubject] = useState('')
  const [checkbox, setCheckbox] = useState(false);
  const [paymentMode, setpaymentMode] = useState('');
  const [qurbaniPurpose, setqurbaniPurpose] = useState('');
  const [qurbaniDay, setqurbaniDay] = useState('');
  const [Camel, setCamel] = useState(false);
  const [cowShare, setCowShare] = useState(false);
  const [fullCow, setFullCow] = useState(false);
  const [CamelQuantity, setCamelQuantity] = useState(null)
  const [cowShareQuantity, setCowShareQuantity] = useState(null)
  const [cowFullQuantity, setCowFullQuantity] = useState(null)
  const [CamelTotal, setCamelTotal] = useState(null)
  const [shareCowTotal, setShareCowTotal] = useState(null)
  const [fullCowTotal, setFullCowTotal] = useState(null)
  const [grandTotal, setGrandTotal] = useState(0);
  const [alternatePhone, setAlternatePhone] = useState('')
  const [address, setAddress] = useState('')
  const [area, setArea] = useState('')
  const [CamelNames , setCamelNames] = useState('')
  const [shareCowNames , setShareCowNames] = useState('')
  const [fullCowNames , setFullCowNames] = useState('')


  function calculateGrandTotal(CamelTotal, shareCowTotal, fullCowTotal) {
    const total = CamelTotal + shareCowTotal + fullCowTotal;
    setGrandTotal(total);
  }

  function calculateCamelTotal(e) {
    const quantity = Number(e.target.value);
    const total = quantity * 42000;
    setCamelQuantity(quantity);
    setCamelTotal(total);
    calculateGrandTotal(total, shareCowTotal, fullCowTotal);
  }

  function calculateShareCow(e) {
    const quantity = Number(e.target.value);
    const total = quantity * 25500;
    setCowShareQuantity(quantity);
    setShareCowTotal(total);
    calculateGrandTotal(CamelTotal, total, fullCowTotal);
  }

  function calculateFullCow(e) {
    const quantity = Number(e.target.value);
    const total = quantity * 178500;
    setCowFullQuantity(quantity);
    setFullCowTotal(total);
    calculateGrandTotal(CamelTotal, shareCowTotal, total);
  }
  const handleSubmit = async (e) => {
    let emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  
    if (name.trim() !== "") {
      if (emailReg.test(email) && email.trim() !== "") {
        if (number.length > 7 && number.trim() !== "") {
          if (address.trim() !== "") {
            if (area.trim() !== '') {
              if (paymentMode.trim() !== "") {
                if (qurbaniPurpose.trim() !== '') {
                  if (qurbaniDay.trim() !== "") {
                    if (checkbox) {
                      if (Camel || cowShare || fullCow) {
                        if (Camel && CamelQuantity <= 0) {
                          toast.error("Please enter a  quantity for Camel", {
                            position: "top-center",
                            autoClose: 1500,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                          });
                          return;
                        }

                        if (Camel && CamelNames.trim() === '') {
                          toast.error("Please enter the names for Camel qurbani", {
                            position: "top-center",
                            autoClose: 1500,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                          });
                          return;
                        }
  
                        if (cowShare && cowShareQuantity <= 0) {
                          toast.error("Please enter a  quantity for Cow Share", {
                            position: "top-center",
                            autoClose: 1500,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                          });
                          return;
                        }

                        if (cowShare && shareCowNames.trim() === '') {
                          toast.error("Please enter the names for share cow qurbani", {
                            position: "top-center",
                            autoClose: 1500,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                          });
                          return;
                        }
  
                        if (fullCow && cowFullQuantity <= 0) {
                          toast.error("Please enter a  quantity for Full Cow", {
                            position: "top-center",
                            autoClose: 1500,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                          });
                          return;
                        }
                        if (fullCow && fullCowNames.trim() === '') {
                          toast.error("Please enter the names for Full Cow qurbani", {
                            position: "top-center",
                            autoClose: 1500,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                          });
                          return;
                        }

                        ///



                        setIsLoading(true)
                        e.preventDefault();
                        const response = await fetch("/api/sendQurbani", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({ 
                            name , email , number , address , area , paymentMode , 


                            qurbaniPurpose , 
                            qurbaniDay,
                            Camel , CamelQuantity , CamelNames,
                            cowShare , cowShareQuantity , shareCowNames,
                            fullCow , cowFullQuantity , fullCowNames ,
                            CamelTotal , fullCowTotal , shareCowTotal , grandTotal
                           }),
                        });
          
                        if (response.ok) {
                          Swal.fire(
                            "Your Online Qurbani Booked Succesfully",
                            "Thanks for Book your Qurbani with us - Check Your Email -  Our team will get back to you soon",
                            "success"
                          );
                        setIsLoading(false)
                          setName("");
                          setEmail("");
                         setNumber("")
                         setAddress("")
                         setArea("")
                         setpaymentMode("")
                         setqurbaniPurpose("")
                         setqurbaniDay("")
                         setCheckbox(false)
                         setCamel(false)
                         setCamelQuantity('')
                         setCamelNames("")
                         setCowShare(false)
                         setCowShareQuantity('')
                         setShareCowNames("")
                         setFullCow(false)
                         setCowFullQuantity('')
                        setFullCowNames("")
                        setAlternatePhone("")


                        } else {
                        setIsLoading(false)
                          setName("");
                          setEmail("");
                         setNumber("")
                         setAddress("")
                         setArea("")
                         setpaymentMode("")
                         setqurbaniPurpose("")
                         setqurbaniDay("")
                         setCheckbox(false)
                         setCamel(false)
                         setCamelQuantity('')
                         setCamelNames("")
                         setCowShare(false)
                         setCowShareQuantity('')
                         setShareCowNames("")
                         setFullCow(false)
                         setCowFullQuantity('')
                          setFullCowNames("")
                        setAlternatePhone("")

                        }


                        



                      } else {
                        toast.error("Please Select Your Qurbani", {
                          position: "top-center",
                          autoClose: 1500,
                          hideProgressBar: true,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "colored",
                        });
                      }
                    } else {
                      toast.error("Please agree hide donation", {
                        position: "top-center",
                        autoClose: 1500,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                      });
                    }
                  } else {
                    toast.error("Please Select Qurbani Day", {
                      position: "top-center",
                      autoClose: 1500,
                      hideProgressBar: true,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "colored",
                    });
                  }
                } else {
                  toast.error("Please Select Purpose of Qurbani", {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  });
                }
              } else {
                toast.error("Please Select Payment Method", {
                  position: "top-center",
                  autoClose: 1500,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                });
              }
            } else {
              toast.error("Please Select Area", {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
            }
          } else {
            toast.error("Please Enter Your Address", {
              position: "top-center",
              autoClose: 1500,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
        } else {
          toast.error("Please Provide a Valid Contact Number", {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      } else {
        toast.error("Please Provide a Valid Email Address", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } else {
      toast.error("Please Enter your Name", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  


  return (
    <>
      <div className="contactform__list mb-60 ">
        <form onSubmit={e => e.preventDefault()} id="contact-form" method="post">
          <div className="row" >
            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">
              <label className="mt-2 mb-1 fw-semibold text-md fs-large" >Full Name</label>

              <div className="contactform__input mb-30">
                <input disabled={isLoading ? true : false} value={name} onChange={(e) => setName(e.target.value)} name="name" type="text" placeholder="Enter your Name" />
              </div>
            </div>

            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">
              <div className="contactform__input mb-30">
                <label className="mt-2 mb-1 fw-semibold text-md fs-large" >Email Address</label>

                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  type="email"
                  disabled={isLoading ? true : false}
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">
              <div className="contactform__input mb-30">
                <label className="mt-2 mb-1 fw-semibold text-md fs-large" >Phone Number</label>

                <input
                  name="number"
                  type="number"
                  value={number}
                  disabled={isLoading ? true : false}

                  onChange={(e) => setNumber(e.target.value)}
                  placeholder="Enter your number"
                />
              </div>
            </div>

            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">
              <div className="contactform__input mb-30">
                <label className="mt-2 mb-1 fw-semibold text-md fs-large" >Alternate Phone Number</label>

                <input
                  name="number"
                  type="text"
                  disabled={isLoading ? true : false}
                  value={alternatePhone}
                  onChange={(e) => setAlternatePhone(e.target.value)}
                  placeholder="Alternate Phone Number"
                />
              </div>
            </div>
          </div>
          <div className="row">

            <div className="col-12 col-sm-12 col-md-6 col-lg-6">
              <div className="contactform__input mb-30">
                <label className="mt-2 mb-1 fw-semibold text-md fs-large" >Address</label>

                <input
                  name="text"
                  type="text"
                  disabled={isLoading ? true : false}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Residential Address"
                />
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6">
              <div className="contactform__input mb-30">
                <label className="mt-2 mb-1 fw-semibold text-md fs-large" >Select Area</label>


                <select onChange={(e) => setArea(e.target.value)} value={area} className="form-select area_select" >
                  <option value="">Select Your Area</option>
                  <option value="Aohs">Aohs</option>
                  <option value="Askari 4">Askari 4</option>
                  <option value="Airport">Airport</option>
                  <option value="Bahadurabad">Bahadurabad</option>
                  <option value="Bahria Town Main Gate">Bahria Town Main Gate</option>
                  <option value="Bahria Town Door Step - DC Rs.1000">Bahria Town Door Step - DC Rs.1000</option>
                  <option value="Baldia">Baldia</option>
                  <option value="Boat Basin">Boat Basin</option>
                  <option value="Buffer Zone">Buffer Zone</option>
                  <option value="CANTT">CANTT</option>
                  <option value="Clifton">Clifton</option>
                  <option value="Civil lines">Civil lines</option>
                  <option value="Defence">Defence</option>
                  <option value="DoHS">DoHS</option>
                  <option value="Falcon Society">Falcon Society</option>
                  <option value="Federal B Area">Federal B Area</option>
                  <option value="Garden">Garden</option>
                  <option value="Gulshan e Iqbal">Gulshan e Iqbal</option>
                  <option value="Gulistan e Johar">Gulistan e Johar</option>
                  <option value="Gulshan e Jamal">Gulshan e Jamal</option>
                  <option value="Green Town">Green Town</option>
                  <option value="KAECHS">KAECHS</option>
                  <option value="Karsaz">Karsaz</option>
                  <option value="KDA Officer Society">KDA Officer Society</option>
                  <option value="KDA Scheme 1">KDA Scheme 1</option>
                  <option value="Landi">Landi</option>
                  <option value="Malir">Malir</option>
                  <option value="Model Colony">Model Colony</option>
                  <option value="Muhammad Ali Society">Muhammad Ali Society</option>
                  <option value="Naval Society">Naval Society</option>
                  <option value="Nazimabad">Nazimabad</option>
                  <option value="Nazimabad No.2">Nazimabad No.2</option>
                  <option value="North Karachi">North Karachi</option>
                  <option value="North Nazimabad">North Nazimabad</option>
                  <option value="P.E.C.H.S">P.E.C.H.S</option>
                  <option value="Saddar">Saddar</option>
                  <option value="Scheme 33">Scheme 33</option>
                  <option value="Shah Faisal">Shah Faisal</option>
                  <option value="Shadman Town">Shadman Town</option>
                  <option value="Sher Shah">Sher Shah</option>
                  <option value="SMCHS">SMCHS</option>
                  <option value="Surjani">Surjani</option>
                </select>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-sm-12 col-md-6 col-lg-6">
              <div className="mb-3">
                <label className="mt-2 mb-1 fw-semibold text-md fs-large" >Payment Method</label>

                <div className="d-flex justify-content-start align-content-center gap-3 mt-2" >
                  <div className="d-flex justify-content-start align-items-center gap-2" >
                    <input
                      type="radio"
                      name="paymentMode"
                      className="radio_custom"
                      value="Online Transfer"
                      id="online_transfer"
                      checked={paymentMode === 'Online Transfer'}
                      onChange={(e) => setpaymentMode(e.target.value)}
                    />
                    <label htmlFor="online_transfer" >
                      Online Transfer
                    </label>

                  </div>
                  <div className="d-flex justify-content-start align-items-center gap-2" >


                    <input
                      type="radio"
                      name="paymentMode"
                      value="Cash Payment"
                      className="radio_custom"
                      id="cash_payment"
                      checked={paymentMode === 'Cash Payment'}
                      onChange={(e) => setpaymentMode(e.target.value)}
                    />
                    <label htmlFor="cash_payment" >
                      Cash Payment
                    </label>
                  </div>


                </div>
              </div>
            </div>

            <div className="col-12 col-sm-12 col-md-6 col-lg-6">
              <div className="mb-3">
                <label className="mt-2 mb-1 fw-semibold text-md fs-large" >Qurbani Purpose</label>


                <div className="d-flex justify-content-start align-content-center gap-3 mt-2" >
                  <div className="d-flex justify-content-start align-items-center gap-2" >
                    <input
                      type="radio"
                      name="purpose"
                      className="radio_custom"
                      value="For Myself"
                      id="myself"
                      checked={qurbaniPurpose === 'For Myself'}
                      onChange={(e) => setqurbaniPurpose(e.target.value)}
                    />
                    <label htmlFor="myself" >
                      For Myself
                    </label>

                  </div>
                  <div className="d-flex justify-content-start align-items-center gap-2" >


                    <input
                      type="radio"
                      name="purpose"
                      value="For Donation ( Waqf )"
                      className="radio_custom"
                      id="donation"
                      checked={qurbaniPurpose === 'For Donation ( Waqf )'}
                      onChange={(e) => setqurbaniPurpose(e.target.value)}
                    />
                    <label htmlFor="donation" >
                      For Donation ( Waqf )
                    </label>
                  </div>


                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6">
              <div className="mb-3">
                <label className="mt-2 mb-1 fw-semibold text-md fs-large" >Qurbani Day</label>

                <div className="d-flex justify-content-start align-content-center gap-3 mt-2" >
                  <div className="d-flex justify-content-start align-items-center gap-2" >
                    <input
                      type="radio"
                      name="qurbaniDay"
                      className="radio_custom"
                      value="Day 01"
                      id="day01"
                      checked={qurbaniDay === 'Day 01'}
                      onChange={(e) => setqurbaniDay(e.target.value)}
                    />
                    <label htmlFor="day01" >
                      Day 01
                    </label>

                  </div>
                  <div className="d-flex justify-content-start align-items-center gap-2" >


                    <input
                      type="radio"
                      name="qurbaniDay"
                      value="Day 02"
                      className="radio_custom"
                      id="day02"
                      checked={qurbaniDay === 'Day 02'}
                      onChange={(e) => setqurbaniDay(e.target.value)}
                    />
                    <label htmlFor="day02" >
                      Day 02
                    </label>
                  </div>


                  <div className="d-flex justify-content-start align-items-center gap-2" >


                    <input
                      type="radio"
                      name="qurbaniDay"
                      value="Day 03"
                      className="radio_custom"
                      id="day03"
                      checked={qurbaniDay === 'Day 03'}
                      onChange={(e) => setqurbaniDay(e.target.value)}
                    />
                    <label htmlFor="day03" >
                      Day 03
                    </label>
                  </div>


                </div>
              </div>
            </div>

            <div className="col-12 col-sm-12 col-md-6 col-lg-6">
              <div className="mb-3">
                <label className="mt-2 mb-1 fw-semibold text-md fs-large" >Animal Hides Donation</label>

                <div className="d-flex justify-content-start align-content-center gap-3 mt-2" >
                  <div className="d-flex justify-content-start align-items-center gap-2" >
                    <input
                      type="checkbox"

                      className="radio_custom"
                      checked={checkbox}
                      onChange={(e) => setCheckbox(e.target.checked)}
                    />
                    <label htmlFor="online_transfer" >
                      I agree to donate animal skin to any Islamic Institution.
                    </label>

                  </div>



                </div>
              </div>
            </div>

            {/* <div className="col-12 col-sm-12 col-md-6 col-lg-6">
              <div className="mb-3">
                <label>Radio Group 1</label>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="paymentMode"
                      value="option1"
                      checked={paymentMode === 'option1'}
                      onChange={(e) => setpaymentMode(e.target.value)}
                    />
                    Option 1
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="paymentMode"
                      value="option2"
                      checked={paymentMode === 'option2'}
                      onChange={(e) => setpaymentMode(e.target.value)}
                    />
                    Option 2
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="paymentMode"
                      value="option3"
                      checked={paymentMode === 'option3'}
                      onChange={(e) => setpaymentMode(e.target.value)}
                    />
                    Option 3
                  </label>
                </div>
              </div>
            </div> */}
          </div>
          <div className="row">
            <div className="col-12 ">
              <div className="mb-3">
                <label className="mt-2 mb-1 fw-semibold text-md fs-large" >Please select item(s) you want to order </label>

                <div className="d-flex justify-content-start align-content-center gap-5 mt-2 flex-wrap" >
                  <div className="d-flex justify-content-start align-items-center gap-2" >
                    <input
                      type="checkbox"
                      className="radio_custom"
                      checked={Camel}
                      id="Camel"
                      onChange={(e) => setCamel(e.target.checked)}
                    />
                    <label htmlFor="Camel" >
                      Camel Hissa - (Rs. 42,000)
                    </label>
                  </div>

                  <div className="d-flex justify-content-start align-items-center gap-2" >
                    <input
                      type="checkbox"
                      className="radio_custom"
                      checked={cowShare}
                      id="cow_share"
                      onChange={(e) => setCowShare(e.target.checked)}
                    />
                    <label htmlFor="cow_share" >
                      Cow Share - (Rs. 25,500)
                    </label>
                  </div>

                  <div className="d-flex justify-content-start align-items-center gap-2" >
                    <input
                      type="checkbox"
                      className="radio_custom"
                      checked={fullCow}
                      id="full_cow"
                      onChange={(e) => setFullCow(e.target.checked)}
                    />
                    <label htmlFor="full_cow" >
                      Full Cow - (Rs. 178,500)
                    </label>
                  </div>



                </div>
              </div>
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-12">



              <div className="table-responsive qurbani_table" >
                <table className="table table-striped" >
                  {Camel || cowShare || fullCow ? (
                    <>
                      <thead>
                        <tr>
                          <th>Item</th>
                          <th>Quantity</th>
                          <th>Names</th>
                          <th>Subtotal</th>
                        </tr>

                      </thead>
                    </>
                  ) : null}

                  <tbody>
                    {Camel ? (
                      <>
                        <tr>
                          <td>
                            <input className="form-control bg-white width_mobile_scroll " disabled type="text" value="Camel" />
                          </td>
                          <td>
                            <input min={0} className="form-control bg-white width_mobile_scroll" type="number" onChange={(e) => calculateCamelTotal(e)} value={CamelQuantity} />
                          </td>
                          <td>
                            <textarea onChange={(e)=>setCamelNames(e.target.value)} value={CamelNames} className="form-control width_mobile_scroll" style={{ height: '100px' }} ></textarea>
                          </td>
                          <td>
                            <input className="form-control bg-white width_mobile_scroll" type="number" value={CamelTotal} readOnly />
                          </td>

                        </tr>
                      </>
                    ) : null}

                    {cowShare ? (
                      <>
                        <tr>
                          <td>
                            <input className="form-control bg-white width_mobile_scroll" disabled type="text" value="Cow Share" />
                          </td>
                          <td>
                            <input min={0} className="form-control bg-white width_mobile_scroll" type="number" onChange={(e) => calculateShareCow(e)} value={cowShareQuantity} />
                          </td>
                          <td>
                            <textarea onChange={(e)=>setShareCowNames(e.target.value)} value={shareCowNames} className="form-control width_mobile_scroll" style={{ height: '100px' }} ></textarea>
                          </td>
                          <td>
                            <input className="form-control bg-white width_mobile_scroll" type="number" value={shareCowTotal} readOnly />
                          </td>

                        </tr>
                      </>
                    ) : null}

                    {fullCow ? (
                      <>
                        <tr>
                          <td>
                            <input className="form-control bg-white width_mobile_scroll" disabled type="text" value="Full Cow" />
                          </td>
                          <td>
                            <input min={0} className="form-control bg-white width_mobile_scroll" type="number" onChange={(e) => calculateFullCow(e)} value={cowFullQuantity} />
                          </td>
                          <td>
                            <textarea onChange={(e)=>setFullCowNames(e.target.value)} value={fullCowNames} className="form-control width_mobile_scroll" style={{ height: '100px' }} ></textarea>
                          </td>
                          <td>
                            <input className="form-control bg-white width_mobile_scroll" type="number" value={fullCowTotal} readOnly />
                          </td>

                        </tr>
                      </>
                    ) : null}
                  </tbody>

                  <tfoot>
                    {Camel || cowShare || fullCow ? (
                      <>
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>
                            <input className="form-control bg-white" type="number" value={grandTotal} readOnly />

                          </td>
                        </tr>
                      </>
                    ) : null}
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
          <div className="row" >
            <div className="col-lg-12">
              <div className="contactform__input mb-30-btn">
                <button disabled={isLoading ? true : false} onClick={(e) => handleSubmit(e)} className="contact-btn" type="button">
                  {isLoading ? (
                    <>
                      Submitting Your Booking
                      <div class="spinner-border text-light" role="status">
                      </div>
                    </>
                  ) : (
                    <>
                      Submit Booking

                    </>
                  )}


                </button>
              </div>
              {/* <p className="ajax-response"></p> */}
            </div>
          </div>
        </form>
        <ToastContainer
          position="top-center"
          autoClose={1500}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          theme="colored"
        />
      </div>
    </>
  );
};

export default Qurbani;



