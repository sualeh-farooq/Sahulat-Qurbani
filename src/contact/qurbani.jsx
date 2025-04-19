// import React, { useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import Swal from 'sweetalert2'


// const Qurbani = () => {


//   const [isLoading, setIsLoading] = useState(false)
//   const [name, setName] = useState('')
//   const [message, setMessage] = useState('')
//   const [email, setEmail] = useState('')
//   const [number, setNumber] = useState('')
//   const [subject, setSubject] = useState('')
//   const [checkbox, setCheckbox] = useState(false);
//   const [paymentMode, setpaymentMode] = useState('');
//   const [qurbaniPurpose, setqurbaniPurpose] = useState('');
//   const [qurbaniDay, setqurbaniDay] = useState('');
//   const [Camel, setCamel] = useState(false);
//   const [cowShare, setCowShare] = useState(false);
//   const [fullCow, setFullCow] = useState(false);
//   const [CamelQuantity, setCamelQuantity] = useState(null)
//   const [cowShareQuantity, setCowShareQuantity] = useState(null)
//   const [cowFullQuantity, setCowFullQuantity] = useState(null)
//   const [CamelTotal, setCamelTotal] = useState(null)
//   const [shareCowTotal, setShareCowTotal] = useState(null)
//   const [fullCowTotal, setFullCowTotal] = useState(null)
//   const [grandTotal, setGrandTotal] = useState(0);
//   const [alternatePhone, setAlternatePhone] = useState('')
//   const [address, setAddress] = useState('')
//   const [area, setArea] = useState('')
//   const [CamelNames , setCamelNames] = useState('')
//   const [shareCowNames , setShareCowNames] = useState('')
//   const [fullCowNames , setFullCowNames] = useState('')
  

//   const [waqfHissa , setWaqfHissa] = useState(false)
//   const [waqfQuantity , setWaqfQuantity] = useState(null)
//   const [waqfNames , setWaqfNames] = useState('')
//   const [waqfTotal , setWaqfTotal] = useState(null)


//   const [displayWaqf , setDisplayWaqf] = useState(false)
  
// function calculateGrandTotal(newCamelTotal, newShareCowTotal, newFullCowTotal, newWaqfTotal) {
//   const total = newCamelTotal + newShareCowTotal + newFullCowTotal + newWaqfTotal;
//   setGrandTotal(total);
// }

// function calculateWaqf(e) {
//   const quantity = Number(e.target.value);
//   const total = quantity * 17000;
//   setWaqfQuantity(quantity);
//   setWaqfTotal(total);
//   calculateGrandTotal(CamelTotal, shareCowTotal, fullCowTotal, total);
// }

// function calculateCamelTotal(e) {
//   const quantity = Number(e.target.value);
//   const total = quantity * 42000;
//   setCamelQuantity(quantity);
//   setCamelTotal(total);
//   calculateGrandTotal(total, shareCowTotal, fullCowTotal, waqfTotal);
// }

// function calculateShareCow(e) {
//   const quantity = Number(e.target.value);
//   const total = quantity * 25500;
//   setCowShareQuantity(quantity);
//   setShareCowTotal(total);
//   calculateGrandTotal(CamelTotal, total, fullCowTotal, waqfTotal);
// }

// function calculateFullCow(e) {
//   const quantity = Number(e.target.value);
//   const total = quantity * 178500;
//   setCowFullQuantity(quantity);
//   setFullCowTotal(total);
//   calculateGrandTotal(CamelTotal, shareCowTotal, total, waqfTotal);
// }
//   const handleSubmit = async (e) => {
//     let emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  
//     if (name.trim() !== "") {
//       if (emailReg.test(email) && email.trim() !== "") {
//         if (number.length > 7 && number.trim() !== "") {
//           if (address.trim() !== "") {
//             if (area.trim() !== '') {
//               if (paymentMode.trim() !== "") {
//                 if (qurbaniPurpose.trim() !== '') {
//                   if (qurbaniDay.trim() !== "") {
//                     if (checkbox) {
//                       if (Camel || cowShare || fullCow) {
//                         if (Camel && CamelQuantity <= 0) {
//                           toast.error("Please enter a  quantity for Camel", {
//                             position: "top-center",
//                             autoClose: 1500,
//                             hideProgressBar: true,
//                             closeOnClick: true,
//                             pauseOnHover: true,
//                             draggable: true,
//                             progress: undefined,
//                             theme: "colored",
//                           });
//                           return;
//                         }

//                         if (Camel && CamelNames.trim() === '') {
//                           toast.error("Please enter the names for Camel qurbani", {
//                             position: "top-center",
//                             autoClose: 1500,
//                             hideProgressBar: true,
//                             closeOnClick: true,
//                             pauseOnHover: true,
//                             draggable: true,
//                             progress: undefined,
//                             theme: "colored",
//                           });
//                           return;
//                         }
  
//                         if (cowShare && cowShareQuantity <= 0) {
//                           toast.error("Please enter a  quantity for Cow Share", {
//                             position: "top-center",
//                             autoClose: 1500,
//                             hideProgressBar: true,
//                             closeOnClick: true,
//                             pauseOnHover: true,
//                             draggable: true,
//                             progress: undefined,
//                             theme: "colored",
//                           });
//                           return;
//                         }

//                         if (cowShare && shareCowNames.trim() === '') {
//                           toast.error("Please enter the names for share cow qurbani", {
//                             position: "top-center",
//                             autoClose: 1500,
//                             hideProgressBar: true,
//                             closeOnClick: true,
//                             pauseOnHover: true,
//                             draggable: true,
//                             progress: undefined,
//                             theme: "colored",
//                           });
//                           return;
//                         }
  
//                         if (fullCow && cowFullQuantity <= 0) {
//                           toast.error("Please enter a  quantity for Full Cow", {
//                             position: "top-center",
//                             autoClose: 1500,
//                             hideProgressBar: true,
//                             closeOnClick: true,
//                             pauseOnHover: true,
//                             draggable: true,
//                             progress: undefined,
//                             theme: "colored",
//                           });
//                           return;
//                         }
//                         if (fullCow && fullCowNames.trim() === '') {
//                           toast.error("Please enter the names for Full Cow qurbani", {
//                             position: "top-center",
//                             autoClose: 1500,
//                             hideProgressBar: true,
//                             closeOnClick: true,
//                             pauseOnHover: true,
//                             draggable: true,
//                             progress: undefined,
//                             theme: "colored",
//                           });
//                           return;
//                         }


//                         if (waqfHissa && waqfQuantity <= 0) {
//                           toast.error("Please enter a  quantity for Cow Waqf Hissa", {
//                             position: "top-center",
//                             autoClose: 1500,
//                             hideProgressBar: true,
//                             closeOnClick: true,
//                             pauseOnHover: true,
//                             draggable: true,
//                             progress: undefined,
//                             theme: "colored",
//                           });
//                           return;
//                         }
//                         if (waqfHissa && waqfNames.trim() === '') {
//                           toast.error("Please enter the names for Cow Waqf Hissa", {
//                             position: "top-center",
//                             autoClose: 1500,
//                             hideProgressBar: true,
//                             closeOnClick: true,
//                             pauseOnHover: true,
//                             draggable: true,
//                             progress: undefined,
//                             theme: "colored",
//                           });
//                           return;
//                         }

//                         ///



//                         setIsLoading(true)
//                         e.preventDefault();
//                         const response = await fetch("/api/sendQurbani", {
//                           method: "POST",
//                           headers: {
//                             "Content-Type": "application/json",
//                           },
//                           body: JSON.stringify({ 
//                             name , email , number , address , area , paymentMode , 


//                             qurbaniPurpose , 
//                             qurbaniDay,
//                             Camel , CamelQuantity , CamelNames,
//                             cowShare , cowShareQuantity , shareCowNames,
//                             fullCow , cowFullQuantity , fullCowNames ,
//                             CamelTotal , fullCowTotal , shareCowTotal , grandTotal ,

//                             waqfHissa , waqfQuantity , waqfNames , waqfTotal
//                            }),
//                         });
          
//                         if (response.ok) {
//                           Swal.fire(
//                             "Your Online Qurbani Booked Succesfully",
//                             "Thanks for Book your Qurbani with us - Check Your Email -  Our team will get back to you soon",
//                             "success"
//                           );
//                         setIsLoading(false)
//                           setName("");
//                           setEmail("");
//                          setNumber("")
//                          setAddress("")
//                          setArea("")
//                          setpaymentMode("")
//                          setqurbaniPurpose("")
//                          setqurbaniDay("")
//                          setCheckbox(false)
//                          setCamel(false)
//                          setCamelQuantity('')
//                          setCamelNames("")
//                          setCowShare(false)
//                          setCowShareQuantity('')
//                          setShareCowNames("")
//                          setFullCow(false)
//                          setCowFullQuantity('')
//                         setFullCowNames("")
//                         setAlternatePhone("")

//                         setWaqfHissa(false)
//                         setWaqfQuantity('')
//                         setWaqfNames('')
//                         setWaqfTotal('')


//                         } else {
//                         setIsLoading(false)
//                           setName("");
//                           setEmail("");
//                          setNumber("")
//                          setAddress("")
//                          setArea("")
//                          setpaymentMode("")
//                          setqurbaniPurpose("")
//                          setqurbaniDay("")
//                          setCheckbox(false)
//                          setCamel(false)
//                          setCamelQuantity('')
//                          setCamelNames("")
//                          setCowShare(false)
//                          setCowShareQuantity('')
//                          setShareCowNames("")
//                          setFullCow(false)
//                          setCowFullQuantity('')
//                           setFullCowNames("")
//                         setAlternatePhone("")
//                         setWaqfHissa(false)
//                         setWaqfQuantity('')
//                         setWaqfNames('')
//                         setWaqfTotal('')

//                         }


                        



//                       } else {
//                         toast.error("Please Select Your Qurbani", {
//                           position: "top-center",
//                           autoClose: 1500,
//                           hideProgressBar: true,
//                           closeOnClick: true,
//                           pauseOnHover: true,
//                           draggable: true,
//                           progress: undefined,
//                           theme: "colored",
//                         });
//                       }
//                     } else {
//                       toast.error("Please agree hide donation", {
//                         position: "top-center",
//                         autoClose: 1500,
//                         hideProgressBar: true,
//                         closeOnClick: true,
//                         pauseOnHover: true,
//                         draggable: true,
//                         progress: undefined,
//                         theme: "colored",
//                       });
//                     }
//                   } else {
//                     toast.error("Please Select Qurbani Day", {
//                       position: "top-center",
//                       autoClose: 1500,
//                       hideProgressBar: true,
//                       closeOnClick: true,
//                       pauseOnHover: true,
//                       draggable: true,
//                       progress: undefined,
//                       theme: "colored",
//                     });
//                   }
//                 } else {
//                   toast.error("Please Select Purpose of Qurbani", {
//                     position: "top-center",
//                     autoClose: 1500,
//                     hideProgressBar: true,
//                     closeOnClick: true,
//                     pauseOnHover: true,
//                     draggable: true,
//                     progress: undefined,
//                     theme: "colored",
//                   });
//                 }
//               } else {
//                 toast.error("Please Select Payment Method", {
//                   position: "top-center",
//                   autoClose: 1500,
//                   hideProgressBar: true,
//                   closeOnClick: true,
//                   pauseOnHover: true,
//                   draggable: true,
//                   progress: undefined,
//                   theme: "colored",
//                 });
//               }
//             } else {
//               toast.error("Please Select Area", {
//                 position: "top-center",
//                 autoClose: 1500,
//                 hideProgressBar: true,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "colored",
//               });
//             }
//           } else {
//             toast.error("Please Enter Your Address", {
//               position: "top-center",
//               autoClose: 1500,
//               hideProgressBar: true,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,
//               progress: undefined,
//               theme: "colored",
//             });
//           }
//         } else {
//           toast.error("Please Provide a Valid Contact Number", {
//             position: "top-center",
//             autoClose: 1500,
//             hideProgressBar: true,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "colored",
//           });
//         }
//       } else {
//         toast.error("Please Provide a Valid Email Address", {
//           position: "top-center",
//           autoClose: 1500,
//           hideProgressBar: true,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "colored",
//         });
//       }
//     } else {
//       toast.error("Please Enter your Name", {
//         position: "top-center",
//         autoClose: 1500,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "colored",
//       });
//     }
//   };
  


//   return (
//     <>
//       <div className="contactform__list mb-60 ">
//         <form onSubmit={e => e.preventDefault()} id="contact-form" method="post">
//           <div className="row" >
//             <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">
//               <label className="mt-2 mb-1 fw-semibold text-md fs-large" >Full Name</label>

//               <div className="contactform__input mb-30">
//                 <input disabled={isLoading ? true : false} value={name} onChange={(e) => setName(e.target.value)} name="name" type="text" placeholder="Enter your Name" />
//               </div>
//             </div>

//             <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">
//               <div className="contactform__input mb-30">
//                 <label className="mt-2 mb-1 fw-semibold text-md fs-large" >Email Address</label>

//                 <input
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   name="email"
//                   type="email"
//                   disabled={isLoading ? true : false}
//                   placeholder="Enter your email"
//                 />
//               </div>
//             </div>
//             <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">
//               <div className="contactform__input mb-30">
//                 <label className="mt-2 mb-1 fw-semibold text-md fs-large" >Phone Number</label>

//                 <input
//                   name="number"
//                   type="number"
//                   value={number}
//                   disabled={isLoading ? true : false}

//                   onChange={(e) => setNumber(e.target.value)}
//                   placeholder="Enter your number"
//                 />
//               </div>
//             </div>

//             <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">
//               <div className="contactform__input mb-30">
//                 <label className="mt-2 mb-1 fw-semibold text-md fs-large" >Alternate Phone Number</label>

//                 <input
//                   name="number"
//                   type="text"
//                   disabled={isLoading ? true : false}
//                   value={alternatePhone}
//                   onChange={(e) => setAlternatePhone(e.target.value)}
//                   placeholder="Alternate Phone Number"
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="row">

//             <div className="col-12 col-sm-12 col-md-6 col-lg-6">
//               <div className="contactform__input mb-30">
//                 <label className="mt-2 mb-1 fw-semibold text-md fs-large" >Address</label>

//                 <input
//                   name="text"
//                   type="text"
//                   disabled={isLoading ? true : false}
//                   value={address}
//                   onChange={(e) => setAddress(e.target.value)}
//                   placeholder="Residential Address"
//                 />
//               </div>
//             </div>
//             <div className="col-12 col-sm-12 col-md-6 col-lg-6">
//               <div className="contactform__input mb-30">
//                 <label className="mt-2 mb-1 fw-semibold text-md fs-large" >Select Area</label>


//                 <select onChange={(e) => setArea(e.target.value)} value={area} className="form-select area_select" >
//                   <option value="">Select Your Area</option>
//                   <option value="Aohs">Aohs</option>
//                   <option value="Askari 4">Askari 4</option>
//                   <option value="Airport">Airport</option>
//                   <option value="Bahadurabad">Bahadurabad</option>
//                   <option value="Bahria Town Main Gate">Bahria Town Main Gate</option>
//                   <option value="Bahria Town Door Step - DC Rs.1000">Bahria Town Door Step - DC Rs.1000</option>
//                   <option value="Baldia">Baldia</option>
//                   <option value="Boat Basin">Boat Basin</option>
//                   <option value="Buffer Zone">Buffer Zone</option>
//                   <option value="CANTT">CANTT</option>
//                   <option value="Clifton">Clifton</option>
//                   <option value="Civil lines">Civil lines</option>
//                   <option value="Defence">Defence</option>
//                   <option value="DoHS">DoHS</option>
//                   <option value="Falcon Society">Falcon Society</option>
//                   <option value="Federal B Area">Federal B Area</option>
//                   <option value="Garden">Garden</option>
//                   <option value="Gulshan e Iqbal">Gulshan e Iqbal</option>
//                   <option value="Gulistan e Johar">Gulistan e Johar</option>
//                   <option value="Gulshan e Jamal">Gulshan e Jamal</option>
//                   <option value="Green Town">Green Town</option>
//                   <option value="KAECHS">KAECHS</option>
//                   <option value="Karsaz">Karsaz</option>
//                   <option value="KDA Officer Society">KDA Officer Society</option>
//                   <option value="KDA Scheme 1">KDA Scheme 1</option>
//                   <option value="Landi">Landi</option>
//                   <option value="Malir">Malir</option>
//                   <option value="Model Colony">Model Colony</option>
//                   <option value="Muhammad Ali Society">Muhammad Ali Society</option>
//                   <option value="Naval Society">Naval Society</option>
//                   <option value="Nazimabad">Nazimabad</option>
//                   <option value="Nazimabad No.2">Nazimabad No.2</option>
//                   <option value="North Karachi">North Karachi</option>
//                   <option value="North Nazimabad">North Nazimabad</option>
//                   <option value="P.E.C.H.S">P.E.C.H.S</option>
//                   <option value="Saddar">Saddar</option>
//                   <option value="Scheme 33">Scheme 33</option>
//                   <option value="Shah Faisal">Shah Faisal</option>
//                   <option value="Shadman Town">Shadman Town</option>
//                   <option value="Sher Shah">Sher Shah</option>
//                   <option value="SMCHS">SMCHS</option>
//                   <option value="Surjani">Surjani</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           <div className="row">
//             <div className="col-12 col-sm-12 col-md-6 col-lg-6">
//               <div className="mb-3">
//                 <label className="mt-2 mb-1 fw-semibold text-md fs-large" >Payment Method</label>

//                 <div className="d-flex justify-content-start align-content-center gap-3 mt-2" >
//                   <div className="d-flex justify-content-start align-items-center gap-2" >
//                     <input
//                       type="radio"
//                       name="paymentMode"
//                       className="radio_custom"
//                       value="Online Transfer"
//                       id="online_transfer"
//                       checked={paymentMode === 'Online Transfer'}
//                       onChange={(e) => setpaymentMode(e.target.value)}
//                     />
//                     <label htmlFor="online_transfer" >
//                       Online Transfer
//                     </label>

//                   </div>
//                   <div className="d-flex justify-content-start align-items-center gap-2" >


//                     <input
//                       type="radio"
//                       name="paymentMode"
//                       value="Cash Payment"
//                       className="radio_custom"
//                       id="cash_payment"
//                       checked={paymentMode === 'Cash Payment'}
//                       onChange={(e) => setpaymentMode(e.target.value)}
//                     />
//                     <label htmlFor="cash_payment" >
//                       Cash Payment
//                     </label>
//                   </div>


//                 </div>
//               </div>
//             </div>

//             <div className="col-12 col-sm-12 col-md-6 col-lg-6">
//               <div className="mb-3">
//                 <label className="mt-2 mb-1 fw-semibold text-md fs-large" >Qurbani Purpose</label>


//                 <div className="d-flex justify-content-start align-content-center gap-3 mt-2" >
//                   <div className="d-flex justify-content-start align-items-center gap-2" >
//                     <input
//                       type="radio"
//                       name="purpose"
//                       className="radio_custom"
//                       value="For Myself"
//                       id="myself"
//                       checked={qurbaniPurpose === 'For Myself'}
//                       onChange={(e) => {
//                         setDisplayWaqf(false)
//                         setqurbaniPurpose(e.target.value)
//                       } }
//                     />
//                     <label htmlFor="myself" >
//                       For Myself
//                     </label>

//                   </div>
//                   <div className="d-flex justify-content-start align-items-center gap-2" >


//                     <input
//                       type="radio"
//                       name="purpose"
//                       value="For Donation ( Waqf )"
//                       className="radio_custom"
//                       id="donation"
//                       checked={qurbaniPurpose === 'For Donation ( Waqf )'}
//                       onChange={(e) => {
//                         setDisplayWaqf(true)
//                         setqurbaniPurpose(e.target.value)
//                       }}
//                     />
//                     <label htmlFor="donation" >
//                       For Donation ( Waqf )
//                     </label>
//                   </div>


//                 </div>
//               </div>
//             </div>
//             <div className="col-12 col-sm-12 col-md-6 col-lg-6">
//               <div className="mb-3">
//                 <label className="mt-2 mb-1 fw-semibold text-md fs-large" >Qurbani Day</label>

//                 <div className="d-flex justify-content-start align-content-center gap-3 mt-2" >
//                   <div className="d-flex justify-content-start align-items-center gap-2" >
//                     <input
//                       type="radio"
//                       name="qurbaniDay"
//                       className="radio_custom"
//                       value="Day 01"
//                       id="day01"
//                       checked={qurbaniDay === 'Day 01'}
//                       onChange={(e) => setqurbaniDay(e.target.value)}
//                     />
//                     <label htmlFor="day01" >
//                       Day 01
//                     </label>

//                   </div>
//                   <div className="d-flex justify-content-start align-items-center gap-2" >


//                     <input
//                       type="radio"
//                       name="qurbaniDay"
//                       value="Day 02"
//                       className="radio_custom"
//                       id="day02"
//                       checked={qurbaniDay === 'Day 02'}
//                       onChange={(e) => setqurbaniDay(e.target.value)}
//                     />
//                     <label htmlFor="day02" >
//                       Day 02
//                     </label>
//                   </div>


//                   <div className="d-flex justify-content-start align-items-center gap-2" >


//                     <input
//                       type="radio"
//                       name="qurbaniDay"
//                       value="Day 03"
//                       className="radio_custom"
//                       id="day03"
//                       checked={qurbaniDay === 'Day 03'}
//                       onChange={(e) => setqurbaniDay(e.target.value)}
//                     />
//                     <label htmlFor="day03" >
//                       Day 03
//                     </label>
//                   </div>


//                 </div>
//               </div>
//             </div>

//             <div className="col-12 col-sm-12 col-md-6 col-lg-6">
//               <div className="mb-3">
//                 <label className="mt-2 mb-1 fw-semibold text-md fs-large" >Animal Hides Donation</label>

//                 <div className="d-flex justify-content-start align-content-center gap-3 mt-2" >
//                   <div className="d-flex justify-content-start align-items-center gap-2" >
//                     <input
//                       type="checkbox"

//                       className="radio_custom"
//                       checked={checkbox}
//                       onChange={(e) => setCheckbox(e.target.checked)}
//                     />
//                     <label htmlFor="online_transfer" >
//                       I agree to donate animal skin to any Islamic Institution.
//                     </label>

//                   </div>



//                 </div>
//               </div>
//             </div>

//             {/* <div className="col-12 col-sm-12 col-md-6 col-lg-6">
//               <div className="mb-3">
//                 <label>Radio Group 1</label>
//                 <div>
//                   <label>
//                     <input
//                       type="radio"
//                       name="paymentMode"
//                       value="option1"
//                       checked={paymentMode === 'option1'}
//                       onChange={(e) => setpaymentMode(e.target.value)}
//                     />
//                     Option 1
//                   </label>
//                   <label>
//                     <input
//                       type="radio"
//                       name="paymentMode"
//                       value="option2"
//                       checked={paymentMode === 'option2'}
//                       onChange={(e) => setpaymentMode(e.target.value)}
//                     />
//                     Option 2
//                   </label>
//                   <label>
//                     <input
//                       type="radio"
//                       name="paymentMode"
//                       value="option3"
//                       checked={paymentMode === 'option3'}
//                       onChange={(e) => setpaymentMode(e.target.value)}
//                     />
//                     Option 3
//                   </label>
//                 </div>
//               </div>
//             </div> */}
//           </div>
//           <div className="row">
//             <div className="col-12 ">
//               <div className="mb-3">
//                 <label className="mt-2 mb-1 fw-semibold text-md fs-large" >Please select item(s) you want to order </label>

//                 <div className="d-flex justify-content-start align-content-center gap-5 mt-2 flex-wrap" >
//                   <div className="d-flex justify-content-start align-items-center gap-2" >
//                     <input
//                       type="checkbox"
//                       className="radio_custom"
//                       checked={Camel}
//                       id="Camel"
//                       onChange={(e) => setCamel(e.target.checked)}
//                     />
//                     <label htmlFor="Camel" >
//                       Camel Hissa - (Rs. 42,000)
//                     </label>
//                   </div>

//                   <div className="d-flex justify-content-start align-items-center gap-2" >
//                     <input
//                       type="checkbox"
//                       className="radio_custom"
//                       checked={cowShare}
//                       id="cow_share"
//                       onChange={(e) => setCowShare(e.target.checked)}
//                     />
//                     <label htmlFor="cow_share" >
//                       Cow Share - (Rs. 25,500)
//                     </label>
//                   </div>

//                   <div className="d-flex justify-content-start align-items-center gap-2" >
//                     <input
//                       type="checkbox"
//                       className="radio_custom"
//                       checked={fullCow}
//                       id="full_cow"
//                       onChange={(e) => setFullCow(e.target.checked)}
//                     />
//                     <label htmlFor="full_cow" >
//                       Full Cow - (Rs. 178,500)
//                     </label>
//                   </div>


//                  {displayWaqf ? (
//                   <>
//                    <div className="d-flex justify-content-start align-items-center gap-2" >
//                     <input
//                       type="checkbox"
//                       className="radio_custom"
//                       checked={waqfHissa}
//                       id="full_cow"
//                       onChange={(e) => setWaqfHissa(e.target.checked)}
//                     />
//                     <label htmlFor="full_cow" >
//                       Cow Waqf Hissa - (Rs. 17,000)
//                     </label>
//                   </div>
//                   </>
//                  ):null}
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="row mt-2">
//             <div className="col-12">



//               <div className="table-responsive qurbani_table" >
//                 <table className="table table-striped" >
//                   {Camel || cowShare || fullCow || waqfHissa ?  (
//                     <>
//                       <thead>
//                         <tr>
//                           <th>Item</th>
//                           <th>Quantity</th>
//                           <th>Names</th>
//                           <th>Subtotal</th>
//                         </tr>

//                       </thead>
//                     </>
//                   ) : null}

//                   <tbody>
//                     {Camel ? (
//                       <>
//                         <tr>
//                           <td>
//                             <input className="form-control bg-white width_mobile_scroll " disabled type="text" value="Camel" />
//                           </td>
//                           <td>
//                             <input min={0} className="form-control bg-white width_mobile_scroll" type="number" onChange={(e) => calculateCamelTotal(e)} value={CamelQuantity} />
//                           </td>
//                           <td>
//                             <textarea onChange={(e)=>setCamelNames(e.target.value)} value={CamelNames} className="form-control width_mobile_scroll" style={{ height: '100px' }} ></textarea>
//                           </td>
//                           <td>
//                             <input className="form-control bg-white width_mobile_scroll" type="number" value={CamelTotal} readOnly />
//                           </td>

//                         </tr>
//                       </>
//                     ) : null}

//                     {cowShare ? (
//                       <>
//                         <tr>
//                           <td>
//                             <input className="form-control bg-white width_mobile_scroll" disabled type="text" value="Cow Share" />
//                           </td>
//                           <td>
//                             <input min={0} className="form-control bg-white width_mobile_scroll" type="number" onChange={(e) => calculateShareCow(e)} value={cowShareQuantity} />
//                           </td>
//                           <td>
//                             <textarea onChange={(e)=>setShareCowNames(e.target.value)} value={shareCowNames} className="form-control width_mobile_scroll" style={{ height: '100px' }} ></textarea>
//                           </td>
//                           <td>
//                             <input className="form-control bg-white width_mobile_scroll" type="number" value={shareCowTotal} readOnly />
//                           </td>

//                         </tr>
//                       </>
//                     ) : null}

//                     {fullCow ? (
//                       <>
//                         <tr>
//                           <td>
//                             <input className="form-control bg-white width_mobile_scroll" disabled type="text" value="Full Cow" />
//                           </td>
//                           <td>
//                             <input min={0} className="form-control bg-white width_mobile_scroll" type="number" onChange={(e) => calculateFullCow(e)} value={cowFullQuantity} />
//                           </td>
//                           <td>
//                             <textarea onChange={(e)=>setFullCowNames(e.target.value)} value={fullCowNames} className="form-control width_mobile_scroll" style={{ height: '100px' }} ></textarea>
//                           </td>
//                           <td>
//                             <input className="form-control bg-white width_mobile_scroll" type="number" value={fullCowTotal} readOnly />
//                           </td>

//                         </tr>
//                       </>
//                     ) : null}

                    
// {waqfHissa ? (
//                       <>
//                         <tr>
//                           <td>
//                             <input className="form-control bg-white width_mobile_scroll" disabled type="text" value="Cow Waqf Hissa" />
//                           </td>
//                           <td>
//                             <input min={0} className="form-control bg-white width_mobile_scroll" type="number" onChange={(e) => calculateWaqf(e)} value={waqfQuantity} />
//                           </td>
//                           <td>
//                             <textarea onChange={(e)=>setWaqfNames(e.target.value)} value={waqfNames} className="form-control width_mobile_scroll" style={{ height: '100px' }} ></textarea>
//                           </td>
//                           <td>
//                             <input className="form-control bg-white width_mobile_scroll" type="number" value={waqfTotal} readOnly />
//                           </td>

//                         </tr>
//                       </>
//                     ) : null}
//                   </tbody>

//                   <tfoot>
//                     {Camel || cowShare || fullCow || waqfHissa ? (
//                       <>
//                         <tr>
//                           <td></td>
//                           <td></td>
//                           <td></td>
//                           <td>
//                             <input className="form-control bg-white" type="number" value={grandTotal} readOnly />

//                           </td>
//                         </tr>
//                       </>
//                     ) : null}
//                   </tfoot>
//                 </table>
//               </div>
//             </div>
//           </div>
//           <div className="row" >
//             <div className="col-lg-12">
//               <div className="contactform__input mb-30-btn">
//                 <button disabled={isLoading ? true : false} onClick={(e) => handleSubmit(e)} className="contact-btn" type="button">
//                   {isLoading ? (
//                     <>
//                       Submitting Your Booking
//                       <div class="spinner-border text-light" role="status">
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       Submit Booking

//                     </>
//                   )}


//                 </button>
//               </div>
//               {/* <p className="ajax-response"></p> */}
//             </div>
//           </div>
//         </form>
//         <ToastContainer
//           position="top-center"
//           autoClose={1500}
//           hideProgressBar
//           newestOnTop={false}
//           closeOnClick
//           rtl={false}
//           draggable
//           theme="colored"
//         />
//       </div>
//     </>
//   );
// };

// export default Qurbani;




import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Swal from 'sweetalert2'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";


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
  const [maslak, setMaslak] = useState(''); // Added maslak selection
  const [meatOption, setMeatOption] = useState(''); // Added meat delivery option
  const [showDeliveryInfo, setShowDeliveryInfo] = useState(false); // For delivery info modal

  // Animal selection states
  const [Camel, setCamel] = useState(false);
  const [cowShare, setCowShare] = useState(false);
  const [fullCow, setFullCow] = useState(false);
  
  // Quantity states
  const [CamelQuantity, setCamelQuantity] = useState(null)
  const [cowShareQuantity, setCowShareQuantity] = useState(null)
  const [cowFullQuantity, setCowFullQuantity] = useState(null)
  
  // Total amount states
  const [CamelTotal, setCamelTotal] = useState(null)
  const [shareCowTotal, setShareCowTotal] = useState(null)
  const [fullCowTotal, setFullCowTotal] = useState(null)
  const [grandTotal, setGrandTotal] = useState(0);
  
  // Additional user info
  const [alternatePhone, setAlternatePhone] = useState('')
  const [address, setAddress] = useState('')
  const [area, setArea] = useState('')
  
  // Names for qurbani
  const [CamelNames, setCamelNames] = useState('')
  const [shareCowNames, setShareCowNames] = useState('')
  const [fullCowNames, setFullCowNames] = useState('')
  
  // Waqf states
  const [waqfHissa, setWaqfHissa] = useState(false)
  const [waqfQuantity, setWaqfQuantity] = useState(null)
  const [waqfNames, setWaqfNames] = useState('')
  const [waqfTotal, setWaqfTotal] = useState(null)
  const [displayWaqf, setDisplayWaqf] = useState(false)
  
  // Updated prices
  const CAMEL_PRICE = 48000;  // Updated price
  const COW_SHARE_PRICE = 25500;  // Updated price
  const FULL_COW_PRICE = 178500;  // Updated price
  const WAQF_PRICE = 19500;  // Updated price
  const DELIVERY_CHARGE = 2500;  // Delivery charge per hissa

  // Calculate grand total with consideration for delivery charges
  // function calculateGrandTotal(newCamelTotal, newShareCowTotal, newFullCowTotal, newWaqfTotal) {
  //   const total = newCamelTotal + newShareCowTotal + newFullCowTotal + newWaqfTotal;
  //   setGrandTotal(total);
  // }

  function calculateGrandTotal(newCamelTotal, newShareCowTotal, newFullCowTotal, newWaqfTotal) {
    const camelTotal = newCamelTotal || 0;
    const shareCowTotal = newShareCowTotal || 0;
    const fullCowTotal = newFullCowTotal || 0;
    const waqfTotal = newWaqfTotal || 0;
    
    const total = camelTotal + shareCowTotal + fullCowTotal + waqfTotal;
    setGrandTotal(total);
  }
  // Update Waqf calculation
  function calculateWaqf(e) {
    const quantity = Number(e.target.value);
    let total = quantity * WAQF_PRICE;
    
    // Add delivery charges if delivery option is selected
    if (meatOption === 'Delivery') {
      total += quantity * DELIVERY_CHARGE;
    }
    
    setWaqfQuantity(quantity);
    setWaqfTotal(total);
    calculateGrandTotal(CamelTotal, shareCowTotal, fullCowTotal, total);
  }

  // Update Camel calculation
  function calculateCamelTotal(e) {
    const quantity = Number(e.target.value);
    let total = quantity * CAMEL_PRICE;
    
    // Add delivery charges if delivery option is selected
    if (meatOption === 'Delivery') {
      total += quantity * DELIVERY_CHARGE;
    }
    
    setCamelQuantity(quantity);
    setCamelTotal(total);
    calculateGrandTotal(total, shareCowTotal, fullCowTotal, waqfTotal);
  }

  // Update Cow Share calculation
  function calculateShareCow(e) {
    const quantity = Number(e.target.value);
    let total = quantity * COW_SHARE_PRICE;
    
    // Add delivery charges if delivery option is selected
    if (meatOption === 'Delivery') {
      total += quantity * DELIVERY_CHARGE;
    }
    
    setCowShareQuantity(quantity);
    setShareCowTotal(total);
    calculateGrandTotal(CamelTotal, total, fullCowTotal, waqfTotal);
  }

  // Update Full Cow calculation
  function calculateFullCow(e) {
    const quantity = Number(e.target.value);
    let total = quantity * FULL_COW_PRICE;
    
    // Add delivery charges if delivery option is selected
    if (meatOption === 'Delivery') {
      total += quantity * DELIVERY_CHARGE;
    }
    
    setCowFullQuantity(quantity);
    setFullCowTotal(total);
    calculateGrandTotal(CamelTotal, shareCowTotal, total, waqfTotal);
  }

  // Handle meat option selection change
  // function handleMeatOptionChange(e) {
  //   const option = e.target.value;
  //   setMeatOption(option);
    
  //   // Show delivery info modal if "Delivery" is selected
  //   if (option === 'Delivery') {
  //     setShowDeliveryInfo(true);
      
  //     // Recalculate totals with delivery charges
  //     recalculateWithDelivery();
  //   } else {
  //     // Recalculate totals without delivery charges
  //     recalculateWithoutDelivery();
  //   }
  // }

  function handleMeatOptionChange(e) {
    const option = e.target.value;
    setMeatOption(option);
    
    if (option === 'Delivery') {
      setShowDeliveryInfo(true);
      
      recalculateWithDelivery();
    } else {
      recalculateWithoutDelivery();
    }
  }

  // Recalculate all totals with delivery charges
  function recalculateWithDelivery() {
    if (CamelQuantity) {
      const total = CamelQuantity * CAMEL_PRICE + CamelQuantity * DELIVERY_CHARGE;
      setCamelTotal(total);
    }
    
    if (cowShareQuantity) {
      const total = cowShareQuantity * COW_SHARE_PRICE + cowShareQuantity * DELIVERY_CHARGE;
      setShareCowTotal(total);
    }
    
    if (cowFullQuantity) {
      const total = cowFullQuantity * FULL_COW_PRICE + cowFullQuantity * DELIVERY_CHARGE;
      setFullCowTotal(total);
    }
    
    if (waqfQuantity) {
      const total = waqfQuantity * WAQF_PRICE + waqfQuantity * DELIVERY_CHARGE;
      setWaqfTotal(total);
    }
    
    calculateGrandTotal(
      CamelTotal || 0,
      shareCowTotal || 0,
      fullCowTotal || 0,
      waqfTotal || 0
    );
  }

  // Recalculate all totals without delivery charges
  function recalculateWithoutDelivery() {
    if (CamelQuantity) {
      const total = CamelQuantity * CAMEL_PRICE;
      setCamelTotal(total);
    }
    
    if (cowShareQuantity) {
      const total = cowShareQuantity * COW_SHARE_PRICE;
      setShareCowTotal(total);
    }
    
    if (cowFullQuantity) {
      const total = cowFullQuantity * FULL_COW_PRICE;
      setFullCowTotal(total);
    }
    
    if (waqfQuantity) {
      const total = waqfQuantity * WAQF_PRICE;
      setWaqfTotal(total);
    }
    
    calculateGrandTotal(
      CamelTotal || 0,
      shareCowTotal || 0,
      fullCowTotal || 0,
      waqfTotal || 0
    );
  }


  // Close delivery info modal
  function closeDeliveryModal() {
    setShowDeliveryInfo(false);
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
                    if (maslak.trim() !== "") { // Added Maslak validation
                      if (meatOption.trim() !== "") { // Added meat option validation
                        if (checkbox) {
                          if (Camel || cowShare || fullCow || waqfHissa) {
                            if (Camel && CamelQuantity <= 0) {
                              toast.error("Please enter a quantity for Camel", {
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
                              toast.error("Please enter a quantity for Cow Share", {
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
                              toast.error("Please enter a quantity for Full Cow", {
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


                            if (waqfHissa && waqfQuantity <= 0) {
                              toast.error("Please enter a quantity for Cow Waqf Hissa", {
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
                            if (waqfHissa && waqfNames.trim() === '') {
                              toast.error("Please enter the names for Cow Waqf Hissa", {
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

                            setIsLoading(true)
                            e.preventDefault();
                            const response = await fetch("/api/sendQurbani", {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({ 
                                name, email, number, address, area, paymentMode, 
                                qurbaniPurpose, 
                                qurbaniDay,
                                maslak, // Added maslak
                                meatOption, // Added meat delivery option
                                Camel, CamelQuantity, CamelNames,
                                cowShare, cowShareQuantity, shareCowNames,
                                fullCow, cowFullQuantity, fullCowNames,
                                CamelTotal, fullCowTotal, shareCowTotal, grandTotal,
                                waqfHissa, waqfQuantity, waqfNames, waqfTotal
                              }),
                            });
              
                            if (response.ok) {
                              Swal.fire(
                                "Your Online Qurbani Booked Successfully",
  `Thanks ${name} for booking your Qurbani with us. \n\nCheck Your Email (including Spam folder) for confirmation and payment details - Our team will get back to you soon`,
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
                              setMaslak("") // Reset maslak
                              setMeatOption("") // Reset meat option
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
                              setWaqfHissa(false)
                              setWaqfQuantity('')
                              setWaqfNames('')
                              setWaqfTotal('')
                            } else {
                              setIsLoading(false)
                              toast.error("Failed to submit booking. Please try again later.", {
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
                          toast.error("Please agree to hide donation", {
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
                        toast.error("Please select meat delivery option", {
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
                      toast.error("Please select Maslak (Fiqah)", {
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
      <div className="contactform__list mb-60">
        <form onSubmit={e => e.preventDefault()} id="contact-form" method="post">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">
              <label className="mt-2 mb-1 fw-semibold text-md fs-large">Full Name</label>
              <div className="contactform__input mb-30">
                <input 
                  disabled={isLoading} 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  name="name" 
                  type="text" 
                  placeholder="Enter your Name" 
                />
              </div>
            </div>

            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">
              <div className="contactform__input mb-30">
                <label className="mt-2 mb-1 fw-semibold text-md fs-large">Email Address</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  type="email"
                  disabled={isLoading}
                  placeholder="Enter your email"
                />
              </div>
            </div>
            
            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">
              <div className="contactform__input mb-30">
                <label className="mt-2 mb-1 fw-semibold text-md fs-large">Phone Number</label>
                <input
                  name="number"
                  type="number"
                  value={number}
                  disabled={isLoading}
                  onChange={(e) => setNumber(e.target.value)}
                  placeholder="Enter your number"
                />
              </div>
            </div>

            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">
              <div className="contactform__input mb-30">
                <label className="mt-2 mb-1 fw-semibold text-md fs-large">Alternate Phone Number</label>
                <input
                  name="alternatePhone"
                  type="text"
                  disabled={isLoading}
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
                <label className="mt-2 mb-1 fw-semibold text-md fs-large">Address</label>
                <input
                  name="address"
                  type="text"
                  disabled={isLoading}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Residential Address"
                />
              </div>
            </div>
            
            <div className="col-12 col-sm-12 col-md-6 col-lg-6">
              <div className="contactform__input mb-30">
                <label className="mt-2 mb-1 fw-semibold text-md fs-large">Select Area</label>
               
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
                <label className="mt-2 mb-1 fw-semibold text-md fs-large">Payment Method</label>
                <div className="d-flex justify-content-start align-content-center gap-3 mt-2">
                  <div className="d-flex justify-content-start align-items-center gap-2">
                    <input
                      type="radio"
                      name="paymentMode"
                      className="radio_custom"
                      value="Online Transfer"
                      id="online_transfer"
                      checked={paymentMode === 'Online Transfer'}
                      onChange={(e) => setpaymentMode(e.target.value)}
                    />
                    <label htmlFor="online_transfer">
                      Online Transfer
                    </label>
                  </div>
                  <div className="d-flex justify-content-start align-items-center gap-2">
                    <input
                      type="radio"
                      name="paymentMode"
                      value="Cash Payment"
                      className="radio_custom"
                      id="cash_payment"
                      checked={paymentMode === 'Cash Payment'}
                      onChange={(e) => setpaymentMode(e.target.value)}
                    />
                    <label htmlFor="cash_payment">
                      Cash Payment
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-12 col-md-6 col-lg-6">
              <div className="mb-3">
                <label className="mt-2 mb-1 fw-semibold text-md fs-large">Qurbani Purpose</label>
                <div className="d-flex justify-content-start align-content-center gap-3 mt-2">
                  <div className="d-flex justify-content-start align-items-center gap-2">
                    <input
                      type="radio"
                      name="purpose"
                      className="radio_custom"
                      value="For Myself"
                      id="myself"
                      checked={qurbaniPurpose === 'For Myself'}
                      onChange={(e) => {
                        setDisplayWaqf(false)
                        setqurbaniPurpose(e.target.value)
                      }}
                    />
                    <label htmlFor="myself">
                      For Myself
                    </label>
                  </div>
                  <div className="d-flex justify-content-start align-items-center gap-2">
                    <input
                      type="radio"
                      name="purpose"
                      value="For Donation ( Waqf )"
                      className="radio_custom"
                      id="donation"
                      checked={qurbaniPurpose === 'For Donation ( Waqf )'}
                      onChange={(e) => {
                        setDisplayWaqf(true)
                        setqurbaniPurpose(e.target.value)
                      }}
                    />
                    <label htmlFor="donation">
                      For Donation ( Waqf )
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Maslak (Fiqah) selection */}
            <div className="col-12 col-sm-12 col-md-6 col-lg-6">
              <div className="mb-3">
                <label className="mt-2 mb-1 fw-semibold text-md fs-large">Select Maslak (Fiqah)</label>
                <div className="d-flex justify-content-start align-content-center gap-3 mt-2">
                  <div className="d-flex justify-content-start align-items-center gap-2">
                    <input
                      type="radio"
                      name="maslak"
                      className="radio_custom"
                      value="Fiqah Hanfiya"
                      id="hanfiya"
                      checked={maslak === 'Fiqah Hanfiya'}
                      onChange={(e) => setMaslak(e.target.value)}
                    />
                    <label htmlFor="hanfiya">
                      Fiqah Hanfiya
                    </label>
                  </div>
                  <div className="d-flex justify-content-start align-items-center gap-2">
                    <input
                      type="radio"
                      name="maslak"
                      value="Fiqah Jafriya"
                      className="radio_custom"
                      id="jafriya"
                      checked={maslak === 'Fiqah Jafriya'}
                      onChange={(e) => setMaslak(e.target.value)}
                    />
                    <label htmlFor="jafriya">
                      Fiqah Jafriya
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Meat Option selection */}
            <div className="col-12 col-sm-12 col-md-6 col-lg-6">
              <div className="mb-3">
                <label className="mt-2 mb-1 fw-semibold text-md fs-large">Meat Collection Option</label>
                <div className="d-flex justify-content-start align-content-center gap-3 mt-2">
                  <div className="d-flex justify-content-start align-items-center gap-2">
                    <input
                      type="radio"
                      name="meatOption"
                      className="radio_custom"
                      value="Self Pickup"
                      id="self_pickup"
                      checked={meatOption === 'Self Pickup'}
                      onChange={handleMeatOptionChange}
                    />
                    <label htmlFor="self_pickup">
                      Self Pickup
                    </label>
                  </div>
                  <div className="d-flex justify-content-start align-items-center gap-2">
                    <input
                      type="radio"
                      name="meatOption"
                      value="Delivery"
                      className="radio_custom"
                      id="delivery"
                      checked={meatOption === 'Delivery'}
                      onChange={handleMeatOptionChange}
                    />
                    <label htmlFor="delivery">
                      Packaging & Delivery (Rs. 2,500 per hissa)  

                    </label>
                  </div>
                  
                </div>

                {meatOption  === 'Delivery' ? <span style={{display: 'block' , marginTop: '1rem' , cursor: 'pointer'}} > <strong className="text-primary" >See Details of Packaging and Delivery</strong> </span> : null }
                

              </div>
            </div>
            
            <div className="col-12 col-sm-12 col-md-6 col-lg-6">
              <div className="mb-3">
                <label className="mt-2 mb-1 fw-semibold text-md fs-large">Qurbani Day</label>
                <div className="d-flex justify-content-start align-content-center gap-3 mt-2">
                  <div className="d-flex justify-content-start align-items-center gap-2">
                    <input
                      type="radio"
                      name="qurbaniDay"
                      className="radio_custom"
                      value="Day 01"
                      id="day01"
                      checked={qurbaniDay === 'Day 01'}
                      onChange={(e) => setqurbaniDay(e.target.value)}
                    />
                    <label htmlFor="day01">
                      Day 01
                    </label>
                  </div>
                  <div className="d-flex justify-content-start align-items-center gap-2">
                    <input
                      type="radio"
                      name="qurbaniDay"
                      value="Day 02"
                      className="radio_custom"
                      id="day02"
                      checked={qurbaniDay === 'Day 02'}
                      onChange={(e) => setqurbaniDay(e.target.value)}
                    />
                    <label htmlFor="day02">
                      Day 02
                    </label>
                  </div>
                  <div className="d-flex justify-content-start align-items-center gap-2">
                    <input
                      type="radio"
                      name="qurbaniDay"
                      value="Day 03"
                      className="radio_custom"
                      id="day03"
                      checked={qurbaniDay === 'Day 03'}
                      onChange={(e) => setqurbaniDay(e.target.value)}
                    />
                    <label htmlFor="day03">
                      Day 03
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-12 col-md-6 col-lg-6">
              <div className="mb-3">
                <label className="mt-2 mb-1 fw-semibold text-md fs-large">Animal Hides Donation</label>
                <div className="d-flex justify-content-start align-content-center gap-3 mt-2">
                  <div className="d-flex justify-content-start align-items-center gap-2">
                    <input
                      type="checkbox"
                      className="radio_custom"
                      checked={checkbox}
                      onChange={(e) => setCheckbox(e.target.checked)}
                    />
                    <label>
                      I agree to donate animal skin to any Islamic Institution.
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-12">
              <div className="mb-3">
                <label className="mt-2 mb-1 fw-semibold text-md fs-large">Please select item(s) you want to order</label>
                <div className="d-flex justify-content-start align-content-center gap-5 mt-2 flex-wrap">
                  <div className="d-flex justify-content-start align-items-center gap-2">
                    <input
                      type="checkbox"
                      className="radio_custom"
                      checked={Camel}
                      id="Camel"
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        setCamel(isChecked);
                        if (!isChecked) {
                          setCamelQuantity(null);
                          setCamelNames('');
                          setCamelTotal(0);
                          calculateGrandTotal(0, shareCowTotal, fullCowTotal, waqfTotal);
                        }
                      }}
                    />
                    <label htmlFor="Camel">
                      Camel Hissa - (Rs. 48,000)
                    </label>
                  </div>

                  <div className="d-flex justify-content-start align-items-center gap-2">
                    <input
                      type="checkbox"
                      className="radio_custom"
                      checked={cowShare}
                      id="cow_share"
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        setCowShare(isChecked);
                        if (!isChecked) {
                          setCowShareQuantity(null);
                          setShareCowNames('');
                          setShareCowTotal(0);
                          calculateGrandTotal(CamelTotal, 0, fullCowTotal, waqfTotal);
                        }
                      }}
                      
                    />
                    <label htmlFor="cow_share">
                      Cow Share - (Rs. 25,500)
                    </label>
                  </div>

                  <div className="d-flex justify-content-start align-items-center gap-2">
                    <input
                      type="checkbox"
                      className="radio_custom"
                      checked={fullCow}
                      id="full_cow"
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        setFullCow(isChecked);
                        if (!isChecked) {
                          setCowFullQuantity(null);
                          setFullCowNames('');
                          setFullCowTotal(0);
                          calculateGrandTotal(CamelTotal, shareCowTotal, 0, waqfTotal);
                        }
                      }}
                    />
                    <label htmlFor="full_cow">
                      Full Cow - (Rs. 178,500)
                    </label>
                  </div>

                  {displayWaqf && (
                    <div className="d-flex justify-content-start align-items-center gap-2">
                      <input
                        type="checkbox"
                        className="radio_custom"
                        checked={waqfHissa}
                        id="waqf_hissa"
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          setWaqfHissa(isChecked);
                          if (!isChecked) {
                            setWaqfQuantity(null);
                            setWaqfNames('');
                            setWaqfTotal(0);
                            calculateGrandTotal(CamelTotal, shareCowTotal, fullCowTotal, 0);
                          }
                        }}
                      />
                      <label htmlFor="waqf_hissa">
                        Cow Waqf Hissa - (Rs. 19,500)
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-12">
              <div className="table-responsive qurbani_table">
                <table className="table table-striped">
                  {(Camel || cowShare || fullCow || waqfHissa) && (
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Names</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                  )}

                  <tbody>
                    {Camel && (
                      <tr>
                        <td>
                          <input className="form-control bg-white width_mobile_scroll" disabled type="text" value="Camel" />
                        </td>
                        <td>
                          <input min={0} className="form-control bg-white width_mobile_scroll" type="number" onChange={(e) => calculateCamelTotal(e)} value={CamelQuantity} />
                        </td>
                        <td>
                          <textarea onChange={(e)=>setCamelNames(e.target.value)} value={CamelNames} className="form-control width_mobile_scroll" style={{ height: '100px' }} placeholder="Enter names for Camel qurbani"></textarea>
                        </td>
                        <td>
                          <input className="form-control bg-white width_mobile_scroll" type="number" value={CamelTotal} readOnly />
                        </td>
                      </tr>
                    )}

                    {cowShare && (
                      <tr>
                        <td>
                          <input className="form-control bg-white width_mobile_scroll" disabled type="text" value="Cow Share" />
                        </td>
                        <td>
                          <input min={0} className="form-control bg-white width_mobile_scroll" type="number" onChange={(e) => calculateShareCow(e)} value={cowShareQuantity} />
                        </td>
                        <td>
                          <textarea onChange={(e)=>setShareCowNames(e.target.value)} value={shareCowNames} className="form-control width_mobile_scroll" style={{ height: '100px' }} placeholder="Enter names for Cow Share qurbani"></textarea>
                        </td>
                        <td>
                          <input className="form-control bg-white width_mobile_scroll" type="number" value={shareCowTotal} readOnly />
                        </td>
                      </tr>
                    )}

                    {fullCow && (
                      <tr>
                        <td>
                          <input className="form-control bg-white width_mobile_scroll" disabled type="text" value="Full Cow" />
                        </td>
                        <td>
                          <input min={0} className="form-control bg-white width_mobile_scroll" type="number" onChange={(e) => calculateFullCow(e)} value={cowFullQuantity} />
                        </td>
                        <td>
                          <textarea onChange={(e)=>setFullCowNames(e.target.value)} value={fullCowNames} className="form-control width_mobile_scroll" style={{ height: '100px' }} placeholder="Enter names for Full Cow qurbani"></textarea>
                        </td>
                        <td>
                          <input className="form-control bg-white width_mobile_scroll" type="number" value={fullCowTotal} readOnly />
                        </td>
                      </tr>
                    )}

                    {waqfHissa && (
                      <tr>
                        <td>
                          <input className="form-control bg-white width_mobile_scroll" disabled type="text" value="Cow Waqf Hissa" />
                        </td>
                        <td>
                          <input min={0} className="form-control bg-white width_mobile_scroll" type="number" onChange={(e) => calculateWaqf(e)} value={waqfQuantity} />
                        </td>
                        <td>
                          <textarea onChange={(e)=>setWaqfNames(e.target.value)} value={waqfNames} className="form-control width_mobile_scroll" style={{ height: '100px' }} placeholder="Enter names for Waqf Hissa"></textarea>
                        </td>
                        <td>
                          <input className="form-control bg-white width_mobile_scroll" type="number" value={waqfTotal} readOnly />
                        </td>
                      </tr>
                    )}
                  </tbody>

                  <tfoot>
                    {(Camel || cowShare || fullCow || waqfHissa) && (
                      <tr>
                        <td className="fw-bold text-end" colSpan="3">Grand Total:</td>
                        <td>
                          <input className="form-control bg-white fw-bold" type="number" value={grandTotal} readOnly />
                        </td>
                      </tr>
                    )}
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

          {/* Delivery Info Modal */}
          {/* {showDeliveryInfo && (
            <div className="row mt-3 mb-3">
              <div className="col-12">
                <div className="alert alert-info alert-dismissible fade show" role="alert">
                  <h5 className="alert-heading">Delivery Information</h5>
                  <p>Delivery will be available within 24 hours after the qurbani. A delivery fee of Rs. 2,500 per hissa has been added to your total.</p>
                  <p>Our team will contact you to coordinate the delivery time. Please ensure someone is available to receive the package.</p>
                  <button type="button" className="btn-close" onClick={closeDeliveryModal}></button>
                </div>
              </div>
            </div>
          )} */}


          <div className="row">
            <div className="col-lg-12">
              <div className="contactform__input mb-30-btn">
                <button 
                  disabled={isLoading} 
                  onClick={handleSubmit} 
                  style={{width: '100%' , justifyContent: 'center' , padding: '12px 0px' , marginTop: '20px'}}
                  className="contact-btn" 
                  type="button"
                >
                  {isLoading ? (
                    <>
                      Submitting Your Booking
                      <div className="spinner-border text-light" role="status">
                      </div>
                    </>
                  ) : (
                    <>
                      Submit Booking
                    </>
                  )}
                </button>
              </div>
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

      {/* Reactstrap Modal for Delivery Information */}
<Modal isOpen={showDeliveryInfo} toggle={closeDeliveryModal} centered>
  <ModalHeader toggle={closeDeliveryModal}>
    Meat Delivery & Packaging Information
  </ModalHeader>
  <ModalBody>
    <div className="mb-3">
      <h6 className="text-danger">Packaging and Delivery charges apply per Hissa Rs 2,500/-</h6>
      <p>Meat will be delivered to your provided address</p>
      
      <h6 className="mt-4">Packaging Details:</h6>
      <ul>
        <li>Ice Thermobox</li>
        <li>Proper Packaging</li>
        <li>Dry Ice</li>
        <li>Hygienically Processed</li>
        <li>Quality Assured</li>
      </ul>
      
      <hr className="my-3" />
      
      <h6 className="mt-3 text-success">معلومات ترسیل گوشت</h6>
      <p className="text-right" dir="rtl">
        ہر حصے کے لیے پیکیجنگ اور ڈیلیوری چارجز 2,500 روپے ہیں
      </p>
      <p className="text-right" dir="rtl">
        گوشت آپ کے دیے گئے پتے پر پہنچایا جائے گا
      </p>
      
      <h6 className="mt-3 text-right" dir="rtl">پیکیجنگ کی تفصیلات:</h6>
      <ul className="text-right" dir="rtl">
        <li>آئس تھرموباکس</li>
        <li>مناسب پیکیجنگ</li>
        <li>خشک برف</li>
        <li>صحت مندانہ پروسیسنگ</li>
        <li>معیار کی یقین دہانی</li>
      </ul>
    </div>
  </ModalBody>
  <ModalFooter>
    <Button className="contact-btn" onClick={closeDeliveryModal}>
      Understood
    </Button>
  </ModalFooter>
</Modal>
    </>
  );
};

export default Qurbani;