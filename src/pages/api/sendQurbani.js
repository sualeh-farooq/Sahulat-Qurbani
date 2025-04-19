// import nodemailer from 'nodemailer';

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     const {
//       name, email, number, address, area, paymentMode,
//       qurbaniPurpose,
//       qurbaniDay,
//       goat, goatQuantity, goatNames,
//       cowShare, cowShareQuantity, shareCowNames,
//       fullCow, cowFullQuantity, fullCowNames,
//       goatTotal, fullCowTotal, shareCowTotal, grandTotal ,
//       waqfHissa , waqfQuantity , waqfNames , waqfTotal


//     } = req.body;

//     const qurbaniPersonTemplate = `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//       <meta charset="UTF-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <title>Email</title>
//     </head>
//     <body>

     
//       <h1>Dear ${name},</h1>
//       <h3>Thank you for your qurbani booking!</h3>
//       <p>
//       Thank you for your interest in Sahulat Qurbani. We are pleased to inform you that your booking has been successfully processed. The total payable amount is Rs ${grandTotal}.
//       </p>
//       <p>Here is Your booking Summary:</p>
//       <ul>
//         <li>Name: ${name}</li>
//         <li>Phone: ${number}</li>
//         <li>Email: ${email}</li>
//         <li>Address: ${address}</li>
//         <li>Area: ${area} </li>
//         <li>Payment Mode: ${paymentMode} </li>
//         <li>Qurbani Purpose: ${qurbaniPurpose} </li>
//         <li>Qurbani Day: ${qurbaniDay} </li>
        
//         ${goat ? '<li>Selected Item: <b>Camel</b> </li>' : ''}}
//         ${goat ? `<li>Camel Hissa Quantity: <b>${goatQuantity}</b> </li>` : ''}
//         ${goat ? `<li>Qurbani Holder Names for Camel : <b>${goatNames}</b> </li>` : ''}
//         ${goat ? `<li>Subtotal of Camel Hissa Qurbanis : <b>${goatTotal}</b> </li>` : ''}


        
//         ${cowShare ? '<li>Selected Item: <b>Cow Share </b></li>' : ''}
//         ${cowShare ? `<li>Cow Share Quantity: <b>${cowShareQuantity} </b></li>` : ''}
//         ${cowShare ? `<li>Qurbani Holder Names for Cow Shares :<b> ${shareCowNames}</b> </li>` : ''}
//         ${cowShare ? `<li>Subtotal of Share Cow Qurbanis : <b>${shareCowTotal}</b> </li>` : ''}


//         ${fullCow ? '<li>Selected Item: <b>Cow Share </b></li>' : ''}
//         ${fullCow ? `<li>Full Cow Quantity: <b>${cowFullQuantity}</b> </li>` : ''}
//         ${fullCow ? `<li>Qurbani Holder Names for Full Cow : <b>${fullCowNames}</b> </li>` : ''}
//         ${fullCow ? `<li>Subtotal of Full Cow Qurbanis : <b>${fullCowTotal}</b> </li>` : ''}


//         ${waqfHissa ? '<li>Selected Item: <b>Cow Waqf Hissa </b></li>' : ''}
//         ${waqfHissa ? `<li>Cow Waqf Hissa Quantity: <b>${waqfQuantity}</b> </li>` : ''}
//         ${waqfHissa ? `<li>Qurbani Holder Names for Cow Waqf Hissa : <b>${waqfNames}</b> </li>` : ''}
//         ${waqfHissa ? `<li>Subtotal of Cow Waqf Hissa Qurbanis : <b>${waqfTotal}</b> </li>` : ''}
        
//       </ul>
//     <p>
//     To facilitate online transfers, we would like to provide you with the bank account details:
//     </p>
//     <table>
//     <tbody>
    
//     <tr>
//         <td>
//         Account Title: MUHAMMAD ARSALAN <br>
//         Bank: Meezan Bank <br>
//         Account with IBAN #: PK70MEZN0001280104516009<br>
//         Bank Account #: : 01280104516009
//         </td>
//     </tr>
//     <tr>
//     <td>
//     Account Title: SAHULAT QURBANI <br>
//     Bank: Faysal Bank <br>
//     Bank Account #: : 3738301000000429
//     </td>
// </tr>
    
    
// </tbody></table>

// <p>
// Once you have completed the payment process, we kindly request you to send payment slip / transfer slip at our whatsapp number to confirm your booking:

// <br />
// <b> <a href="https://wa.link/pa7zfv"  > +92-327-2738989 </a> </b>
// </p>

//       <p>Feel free to contact us if you have any questions.</p>
//       <p>Best regards,</p>
//       <p> <b> The Sahulat Qurbani Team </b></p>
//       <p>+92-327-2738989</p>
//     </body>
//     </html>
//   `;




//   const recTemplate = `
//   <!DOCTYPE html>
//   <html lang="en">
//   <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Email</title>
//   </head>
//   <body>

   
   
//     <h3>You have Received new Booking</h3>
//     <p>Here is the booking Summary:</p>
//     <ul>
//       <li>Name: ${name}</li>
//       <li>Phone: ${number}</li>
//       <li>Email: ${email}</li>
//       <li>Address: ${address}</li>
//       <li>Area: ${area} </li>
//       <li>Payment Mode: ${paymentMode} </li>
//       <li>Qurbani Purpose: ${qurbaniPurpose} </li>
//       <li>Qurbani Day: ${qurbaniDay} </li>
      
//       ${goat ? '<li>Selected Item: <b>Goat</b> </li>' : ''}
//       ${goat ? `<li>Camel Hissa Quantity: <b>${goatQuantity}</b> </li>` : ''}
//       ${goat ? `<li>Qurbani Holder Names for Camel : <b>${goatNames}</b> </li>` : ''}
//       ${goat ? `<li>Subtotal of Camel Qurbanis : <b>${goatTotal}</b> </li>` : ''}


      
//       ${cowShare ? '<li>Selected Item: <b>Cow Share </b></li>' : ''}
//       ${cowShare ? `<li>Cow Share Quantity: <b>${cowShareQuantity} </b></li>` : ''}
//       ${cowShare ? `<li>Qurbani Holder Names for Cow Shares :<b> ${shareCowNames}</b> </li>` : ''}
//       ${cowShare ? `<li>Subtotal of Share Cow Qurbanis : <b>${shareCowTotal}</b> </li>` : ''}


//       ${fullCow ? '<li>Selected Item: <b>Cow Share </b></li>' : ''}
//       ${fullCow ? `<li>Full Cow Quantity: <b>${cowFullQuantity}</b> </li>` : ''}
//       ${fullCow ? `<li>Qurbani Holder Names for Full Cow : <b>${fullCowNames}</b> </li>` : ''}
//       ${fullCow ? `<li>Subtotal of Full Cow Qurbanis : <b>${fullCowTotal}</b> </li>` : ''}



      
//       ${waqfHissa ? '<li>Selected Item: <b>Cow Waqf Hissa </b></li>' : ''}
//       ${waqfHissa ? `<li>Cow Waqf Hissa Quantity: <b>${waqfQuantity}</b> </li>` : ''}
//       ${waqfHissa ? `<li>Qurbani Holder Names for Cow Waqf Hissa : <b>${waqfNames}</b> </li>` : ''}
//       ${waqfHissa ? `<li>Subtotal of Cow Waqf Hissa Qurbanis : <b>${waqfTotal}</b> </li>` : ''}
      
//     </ul>
//     `

//     const mailOptions = {
//       from: process.env.yourEmail,
//       replyTo: process.env.yourEmail,
//       to: email,
//       subject: 'Thank You For Booking with Sahulat Qurbani',
//       html: qurbaniPersonTemplate
//     };



//     const revmailOptions = {
//       from: process.env.yourEmail,
//       replyTo: email,
//       to: process.env.yourEmail,
//       subject: 'New Online Booking Submitted from Sahulat Qurbani',
//       html: recTemplate
//     };

//     try {
//       const transporter = nodemailer.createTransport({
//         host: 'smtp.gmail.com',
//         port: 587,
//         secure: false,
//         auth: {
//           user: process.env.smtpuser,
//           pass: process.env.smtppass,
//         },
//         tls: {
//           rejectUnauthorized: false
//         }
//       });

//       await transporter.sendMail(mailOptions);
//       await transporter.sendMail(revmailOptions);
    
//       res.status(200).json({ message: 'Email sent' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Failed to send email' });
//     }
//   } else {
//     res.status(405).end(); // Method Not Allowed
//   }
// }

// // export default async function handler(req, res){

// //     console.log(req.body)

// // }
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {
      name, email, number, address, area, paymentMode,
      qurbaniPurpose,
      qurbaniDay,
      maslak, 
      meatOption, 
      Camel, CamelQuantity, CamelNames,
      cowShare, cowShareQuantity, shareCowNames,
      fullCow, cowFullQuantity, fullCowNames,
      CamelTotal, fullCowTotal, shareCowTotal, grandTotal,
      waqfHissa, waqfQuantity, waqfNames, waqfTotal,
      alternatePhone
    } = req.body;

    // Enhanced customer email template with modern design
    const qurbaniPersonTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Qurbani Booking Confirmation</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        :root {
          --primary-color: #1e5631;
          --secondary-color: #3a7d44;
          --accent-color: #f8b400;
          --light-bg: #f9f9f7;
          --dark-text: #333333;
          --light-text: #ffffff;
          --border-radius: 8px;
          --box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        body {
          font-family: 'Poppins', Arial, sans-serif;
          line-height: 1.6;
          color: var(--dark-text);
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f5f5f5;
        }
        
        .email-container {
          background-color: white;
          border-radius: var(--border-radius);
          overflow: hidden;
          box-shadow: var(--box-shadow);
        }
        
        .email-header {
          background-color: var(--primary-color);
          color: var(--light-text);
          padding: 30px;
          text-align: center;
        }
        
        .email-header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 600;
          border-bottom: none;
          padding-bottom: 0;
        }
        
        .email-header p {
          margin: 10px 0 0;
          font-size: 16px;
          opacity: 0.9;
        }
        
        .email-body {
          padding: 30px;
        }
        
        h3 {
          color: var(--primary-color);
          margin-top: 30px;
          margin-bottom: 15px;
          font-weight: 600;
          font-size: 20px;
        }
        
        .greeting {
          font-size: 18px;
          margin-bottom: 20px;
        }
        
        ul {
          list-style-type: none;
          padding-left: 0;
        }
        
        li {
          margin-bottom: 12px;
          padding-left: 25px;
          position: relative;
        }
        
        li:before {
          content: "✓";
          position: absolute;
          left: 0;
          color: var(--secondary-color);
          font-weight: bold;
        }
        
        .important {
          font-weight: 600;
          color: var(--primary-color);
        }
        
        .highlight {
          background-color: var(--light-bg);
          padding: 20px;
          border-radius: var(--border-radius);
          margin: 25px 0;
          border-left: 4px solid var(--accent-color);
        }
        
        .highlight h3 {
          margin-top: 0;
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
          border-radius: var(--border-radius);
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        
        table, th, td {
          border: 1px solid #eaeaea;
        }
        
        th, td {
          padding: 15px;
          text-align: left;
        }
        
        th {
          background-color: var(--primary-color);
          color: var(--light-text);
          font-weight: 500;
        }
        
        tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        
        .bank-details {
          margin: 25px 0;
          padding: 20px;
          background-color: var(--light-bg);
          border-radius: var(--border-radius);
          box-shadow: var(--box-shadow);
        }
        
        .bank-details h3 {
          margin-top: 0;
        }
        
        .payment-instruction {
          background-color: #fff8e6;
          border: 1px solid var(--accent-color);
          padding: 20px;
          border-radius: var(--border-radius);
          margin: 25px 0;
        }
        
        .payment-instruction a {
          color: var(--primary-color);
          font-weight: 600;
          text-decoration: none;
        }
        
        .info-box {
          background-color: var(--light-bg);
          padding: 20px;
          border-radius: var(--border-radius);
          margin: 25px 0;
          border-left: 4px solid var(--secondary-color);
        }
        
        .info-box h3 {
          margin-top: 0;
          color: var(--secondary-color);
        }
        
        .contact-info {
          margin-top: 30px;
          padding: 20px;
          background-color: #f5f5f5;
          border-radius: var(--border-radius);
        }
        
        .footer {
          background-color: var(--primary-color);
          color: var(--light-text);
          text-align: center;
          padding: 20px;
          font-size: 14px;
          border-bottom-left-radius: var(--border-radius);
          border-bottom-right-radius: var(--border-radius);
        }
        
        .footer a {
          color: var(--light-text);
          text-decoration: underline;
        }
        
        .total-amount {
          font-size: 24px;
          font-weight: 700;
          color: var(--primary-color);
          display: inline-block;
          padding: 8px 15px;
          background-color: #f0f7e6;
          border-radius: 4px;
          margin: 10px 0;
        }
        
        .animal-section {
          padding: 15px;
          margin-bottom: 15px;
          border-radius: var(--border-radius);
          background-color: #f9f9f9;
        }
        
        .animal-section h4 {
          margin-top: 0;
          color: var(--secondary-color);
          font-weight: 600;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          <h1>Sahulat Qurbani</h1>
          <p>Booking Confirmation</p>
        </div>
        
        <div class="email-body">
          <h3 class="greeting">Dear ${name},</h3>
          <p>
            Thank you for your interest in Sahulat Qurbani. We are pleased to inform you that your booking has been successfully processed.
          </p>
          
          <div class="payment-instruction">
            <p class="important">Your total payable amount is: <span class="total-amount">Rs. ${grandTotal}</span></p>
            <p>Please complete your payment to confirm your booking. Payment instructions are provided below.</p>
          </div>
          
          <div class="highlight">
            <h3>Your Booking Summary</h3>
            <ul>
              <li><strong>Name:</strong> ${name}</li>
              <li><strong>Phone:</strong> ${number}</li>
              ${alternatePhone ? `<li><strong>Alternate Phone:</strong> ${alternatePhone}</li>` : ''}
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>Address:</strong> ${address}</li>
              <li><strong>Area:</strong> ${area}</li>
              <li><strong>Payment Mode:</strong> ${paymentMode}</li>
              <li><strong>Qurbani Purpose:</strong> ${qurbaniPurpose}</li>
              <li><strong>Qurbani Day:</strong> ${qurbaniDay}</li>
              <li><strong>Maslak (Fiqah):</strong> ${maslak}</li>
              <li><strong>Meat Collection Option:</strong> ${meatOption}</li>
            </ul>
          </div>
          
          <h3>Your Selected Qurbanis</h3>
          
          ${Camel ? `
          <div class="animal-section">
            <h4>Camel Hissa</h4>
            <ul>
              <li><strong>Quantity:</strong> ${CamelQuantity}</li>
              <li><strong>Qurbani Holder Names:</strong> ${CamelNames}</li>
              <li><strong>Subtotal:</strong> Rs. ${CamelTotal}</li>
            </ul>
          </div>` : ''}
          
          ${cowShare ? `
          <div class="animal-section">
            <h4>Cow Share</h4>
            <ul>
              <li><strong>Quantity:</strong> ${cowShareQuantity}</li>
              <li><strong>Qurbani Holder Names:</strong> ${shareCowNames}</li>
              <li><strong>Subtotal:</strong> Rs. ${shareCowTotal}</li>
            </ul>
          </div>` : ''}
          
          ${fullCow ? `
          <div class="animal-section">
            <h4>Full Cow</h4>
            <ul>
              <li><strong>Quantity:</strong> ${cowFullQuantity}</li>
              <li><strong>Qurbani Holder Names:</strong> ${fullCowNames}</li>
              <li><strong>Subtotal:</strong> Rs. ${fullCowTotal}</li>
            </ul>
          </div>` : ''}
          
          ${waqfHissa ? `
          <div class="animal-section">
            <h4>Cow Waqf Hissa</h4>
            <ul>
              <li><strong>Quantity:</strong> ${waqfQuantity}</li>
              <li><strong>Qurbani Holder Names:</strong> ${waqfNames}</li>
              <li><strong>Subtotal:</strong> Rs. ${waqfTotal}</li>
            </ul>
          </div>` : ''}
          
          ${meatOption === 'Delivery' ? `
          <p class="important">Note: Delivery charges of Rs. 2,500 per hissa have been added to the total.</p>` : ''}
          
          <div class="payment-instruction">
            <h3>Total Amount Due: <span class="total-amount">Rs. ${grandTotal}</span></h3>
          </div>
          
       <div class="bank-details">
    <h3>Bank Details for Online Transfer</h3>
    <table>
        <tr>
            <th>Bank</th>
            <th>Account Details</th>
        </tr>
        <tr>
            <td>Meezan Bank</td>
            <td>
                <strong>Account Title:</strong> MUHAMMAD ARSALAN<br>
                <strong>IBAN:</strong> PK70MEZN0001280104516009<br>
                <strong>Account #:</strong> 01280104516009
            </td>
        </tr>
        <tr>
            <td>Faysal Bank</td>
            <td>
                <strong>Account Title:</strong> SAHULAT QURBANI<br>
                <strong>IBAN:</strong> PK79FAYS37383010000008558<br>
                <strong>Account #:</strong> 37383010000008558
            </td>
        </tr>
    </table>
</div>

          <div class="payment-instruction">
            <p class="important">
              Once you have completed the payment process, please send the payment slip/transfer slip to our WhatsApp number to confirm your booking:
              <br><br>
              <a href="https://wa.link/pa7zfv">+92-327-2738989</a>
            </p>
          </div>

          ${meatOption === 'Delivery' ? `
          <div class="info-box">
            <h3>Delivery Information</h3>
            <p>As per your selected option, we will deliver the meat to your provided address. The packaging and delivery charges (Rs. 2,500 per hissa) have been included in your total. Our team will coordinate with you regarding the delivery time on your selected Qurbani day.</p>
          </div>
          ` : `
          <div class="info-box">
            <h3>Self-Pickup Information</h3>
            <p>As per your selected option, you will need to pick up the meat from our distribution center. Our team will contact you with the location details and available pickup times on your selected Qurbani day.</p>
          </div>
          `}

          <p>Feel free to contact us if you have any questions or need further assistance.</p>
          
          <div class="contact-info">
            <p><strong>The Sahulat Qurbani Team</strong></p>
            <p>Phone: +92-327-2738989</p>
            <p>WhatsApp: <a href="https://wa.link/pa7zfv">+92-327-2738989</a></p>
          </div>
        </div>
        
        <div class="footer">
          <p>&copy; 2025 Sahulat Qurbani. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  // Enhanced admin notification template with professional design
  const adminTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Qurbani Booking</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
        
        :root {
          --primary-color: #8B0000;
          --secondary-color: #c41e3a;
          --accent-color: #ffd700;
          --light-bg: #f9f9f9;
          --dark-text: #333333;
          --light-text: #ffffff;
          --border-radius: 6px;
          --box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
        }
        
        body {
          font-family: 'Roboto', Arial, sans-serif;
          line-height: 1.6;
          color: var(--dark-text);
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f5f5f5;
        }
        
        .email-container {
          background-color: white;
          border-radius: var(--border-radius);
          overflow: hidden;
          box-shadow: var(--box-shadow);
        }
        
        .email-header {
          background-color: var(--primary-color);
          color: var(--light-text);
          padding: 25px;
          text-align: center;
        }
        
        .email-header h1 {
          margin: 0;
          font-size: 24px;
          font-weight: 700;
        }
        
        .email-body {
          padding: 25px;
        }
        
        h3 {
          color: var(--primary-color);
          margin-top: 25px;
          margin-bottom: 15px;
          font-weight: 500;
          border-bottom: 2px solid #eee;
          padding-bottom: 8px;
        }
        
        .section {
          margin-bottom: 30px;
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 15px 0;
          border-radius: var(--border-radius);
          overflow: hidden;
          box-shadow: var(--box-shadow);
        }
        
        table, th, td {
          border: 1px solid #eee;
        }
        
        th, td {
          padding: 12px 15px;
          text-align: left;
        }
        
        th {
          background-color: var(--primary-color);
          color: var(--light-text);
          font-weight: 500;
        }
        
        tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        
        .highlight {
          background-color: var(--light-bg);
          padding: 20px;
          border-radius: var(--border-radius);
          margin: 20px 0;
          border-left: 4px solid var(--primary-color);
        }
        
        .highlight h3 {
          margin-top: 0;
          border-bottom: none;
        }
        
        .status-tag {
          display: inline-block;
          padding: 5px 10px;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 500;
          background-color: #FFF3CD;
          color: #856404;
        }
        
        .action-required {
          background-color: #f8d7da;
          border: 1px solid #f5c6cb;
          color: #721c24;
          padding: 15px;
          border-radius: var(--border-radius);
          margin: 20px 0;
        }
        
        .footer {
          background-color: #f5f5f5;
          padding: 15px;
          text-align: center;
          font-size: 14px;
          color: #666;
          border-top: 1px solid #eee;
        }
        
        .total-row {
          font-weight: bold;
          background-color: #f5f5f5;
        }
        
        .total-row td {
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          <h1>New Qurbani Booking Received</h1>
        </div>
        
        <div class="email-body">
          <div class="status-tag">New Booking - Payment Pending</div>
          
          <div class="section">
            <h3>Customer Information</h3>
            <table>
              <tr>
                <th>Name</th>
                <td>${name}</td>
              </tr>
              <tr>
                <th>Phone</th>
                <td>${number}</td>
              </tr>
              ${alternatePhone ? `
              <tr>
                <th>Alternate Phone</th>
                <td>${alternatePhone}</td>
              </tr>` : ''}
              <tr>
                <th>Email</th>
                <td>${email}</td>
              </tr>
              <tr>
                <th>Address</th>
                <td>${address}</td>
              </tr>
              <tr>
                <th>Area</th>
                <td>${area}</td>
              </tr>
              <tr>
                <th>Payment Mode</th>
                <td>${paymentMode}</td>
              </tr>
              <tr>
                <th>Maslak (Fiqah)</th>
                <td>${maslak}</td>
              </tr>
              <tr>
                <th>Meat Collection</th>
                <td>${meatOption}</td>
              </tr>
              <tr>
                <th>Qurbani Purpose</th>
                <td>${qurbaniPurpose}</td>
              </tr>
              <tr>
                <th>Qurbani Day</th>
                <td>${qurbaniDay}</td>
              </tr>
            </table>
          </div>
          
          <div class="section">
            <h3>Order Details</h3>
            <table>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Names</th>
                <th>Subtotal</th>
              </tr>
              
              ${Camel ? `
              <tr>
                <td>Camel Hissa</td>
                <td>${CamelQuantity}</td>
                <td>${CamelNames}</td>
                <td>Rs. ${CamelTotal}</td>
              </tr>` : ''}
              
              ${cowShare ? `
              <tr>
                <td>Cow Share</td>
                <td>${cowShareQuantity}</td>
                <td>${shareCowNames}</td>
                <td>Rs. ${shareCowTotal}</td>
              </tr>` : ''}
              
              ${fullCow ? `
              <tr>
                <td>Full Cow</td>
                <td>${cowFullQuantity}</td>
                <td>${fullCowNames}</td>
                <td>Rs. ${fullCowTotal}</td>
              </tr>` : ''}
              
              ${waqfHissa ? `
              <tr>
                <td>Cow Waqf Hissa</td>
                <td>${waqfQuantity}</td>
                <td>${waqfNames}</td>
                <td>Rs. ${waqfTotal}</td>
              </tr>` : ''}
              
              <tr class="total-row">
                <td colspan="3" style="text-align:right"><strong>Grand Total:</strong></td>
                <td><strong>Rs. ${grandTotal}</strong></td>
              </tr>
            </table>
          </div>
          
          <div class="action-required">
            <h3 style="color: #721c24; margin-top: 0; border-bottom: none;">Action Required</h3>
            <p>Please follow up with the customer to confirm payment receipt and update their booking status.</p>
            <p>Once payment is confirmed, assign appropriate resources based on the booking details.</p>
          </div>
          
          <div class="highlight">
            <h3>Important Notes</h3>
            <ul>
              <li>Customer has been sent a confirmation email with payment instructions</li>
              <li>Meat collection option: <strong>${meatOption}</strong></li>
              <li>Qurbani day preference: <strong>${qurbaniDay}</strong></li>
              ${meatOption === 'Delivery' ? '<li>Delivery charges have been included in the total amount</li>' : ''}
            </ul>
          </div>
        </div>
        
        <div class="footer">
          <p>This is an automated notification from your Sahulat Qurbani booking system.</p>
          <p>Booking received on: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    </body>
    </html>
  `;

    const mailOptions = {
      from: process.env.yourEmail,
      replyTo: process.env.yourEmail,
      to: email,
      subject: 'Thank You For Booking with Sahulat Qurbani',
      html: qurbaniPersonTemplate
    };

    const adminMailOptions = {
      from: process.env.yourEmail,
      replyTo: email,
      to: process.env.yourEmail,
      subject: 'New Online Booking Submitted from Sahulat Qurbani',
      html: adminTemplate
    };

    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.smtpuser,
          pass: process.env.smtppass,
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      await transporter.sendMail(mailOptions);
      await transporter.sendMail(adminMailOptions);
    
      res.status(200).json({ message: 'Email sent' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to send email' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}