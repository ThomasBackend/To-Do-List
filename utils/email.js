const nodemailer = require("nodemailer");

const Email = async (subject,to, cc, body, attachment)=> {
 
  transporter = nodemailer.createTransport({
    name: "mail.norrenberger.com",
    host: "outlook.office365.com",
    port: 587,
    secureConnection: false,
    secure: false,
    auth: {
      user: "noreply@norrenberger.com",
      pass: "(@123Tak09964$$$###)",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const msg = {
    from: "Corper Invest Onboarding<noreply@norrenberger.com>", // sender address
    attachments: attachment,
    to: to,
    cc:cc,
    subject:subject,
    html:body,
  };
  
 
    const sendMail = await transporter.sendMail(msg);
        return console.log("msg sent");
        
  
 
}

module.exports={Email}
