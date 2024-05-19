import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {
      name, email, number, address, area, paymentMode,
      qurbaniPurpose,
      qurbaniDay,
      goat, goatQuantity, goatNames,
      cowShare, cowShareQuantity, shareCowNames,
      fullCow, cowFullQuantity, fullCowNames,
      goatTotal, fullCowTotal, shareCowTotal, grandTotal


    } = req.body;

    const qurbaniPersonTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email</title>
    </head>
    <body>

     
      <h1>Dear ${name},</h1>
      <h3>Thank you for your qurbani booking!</h3>
      <p>
      Thank you for your interest in Sahulat Qurbani. We are pleased to inform you that your booking has been successfully processed. The total payable amount is Rs ${grandTotal}.
      </p>
      <p>Here is Your booking Summary:</p>
      <ul>
        <li>Name: ${name}</li>
        <li>Phone: ${number}</li>
        <li>Email: ${email}</li>
        <li>Address: ${address}</li>
        <li>Area: ${area} </li>
        <li>Payment Mode: ${paymentMode} </li>
        <li>Qurbani Purpose: ${qurbaniPurpose} </li>
        <li>Qurbani Day: ${qurbaniDay} </li>
        
        {${goat ? '<li>Selected Item: <b>Goat</b> </li>' : ''}}
        {${goat ? `<li>Goat Quantity: <b>${goatQuantity}</b> </li>` : ''}}
        {${goat ? `<li>Qurbani Holder Names for Goats : <b>${goatNames}</b> </li>` : ''}}
        {${goat ? `<li>Subtotal of Goat Qurbanis : <b>${goatTotal}</b> </li>` : ''}}


        
        {${cowShare ? '<li>Selected Item: <b>Cow Share </b></li>' : ''}}
        {${cowShare ? `<li>Cow Share Quantity: <b>${cowShareQuantity} </b></li>` : ''}}
        {${cowShare ? `<li>Qurbani Holder Names for Cow Shares :<b> ${shareCowNames}</b> </li>` : ''}}
        {${cowShare ? `<li>Subtotal of Share Cow Qurbanis : <b>${shareCowTotal}</b> </li>` : ''}}


        {${fullCow ? '<li>Selected Item: <b>Cow Share </b></li>' : ''}}
        {${fullCow ? `<li>Full Cow Quantity: <b>${cowFullQuantity}</b> </li>` : ''}}
        {${fullCow ? `<li>Qurbani Holder Names for Full Cow : <b>${fullCowNames}</b> </li>` : ''}}
        {${fullCow ? `<li>Subtotal of Full Cow Qurbanis : <b>${fullCowTotal}</b> </li>` : ''}}
        
      </ul>
    <p>
    To facilitate online transfers, we would like to provide you with the bank account details:
    </p>
    <table>
    <tbody>
    
    <tr>
        <td>
        Account Title: MUHAMMAD ARSALAN <br>
        Bank: Meezan Bank <br>
        Account with IBAN #: PK70MEZN0001280104516009<br>
        Bank Account #: : 01280104516009
        </td>
    </tr>
    <tr>
    <td>
    Account Title: SAHULAT QURBANI <br>
    Bank: Faysal Bank <br>
    Bank Account #: : 3738301000000429
    </td>
</tr>
    
    
</tbody></table>

<p>
Once you have completed the payment process, we kindly request you to send payment slip / transfer slip at our whatsapp number to confirm your booking:

<br />
<b> <a href="https://wa.link/pa7zfv"  > +92-332-7879152 </a> </b>
</p>

      <p>Feel free to contact us if you have any questions.</p>
      <p>Best regards,</p>
      <p> <b> The Sahulat Qurbani Team </b></p>
      <p>+92-332-7879152</p>
    </body>
    </html>
  `;

    const mailOptions = {
      from: email,
      replyTo: email,
      to: process.env.yourEmail,
      subject: 'Thank You For Booking with Us',
      html: qurbaniPersonTemplate
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
      console.log('Email sent');
      res.status(200).json({ message: 'Email sent' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to send email' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}

// export default async function handler(req, res){

//     console.log(req.body)

// }