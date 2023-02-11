const nodemailer = require("nodemailer");

const sendMail = (email,user)=> {

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_MAIL,
    pass: process.env.AUTH_MAIL_PASSWORD,
  },
});


var mailOptions = {
  from: "E-learn",
  to: email,
  subject:"Account activation Deatails",
  text: `Your account have activated please Login and chose our courses. you selected course is ${user.course}`,
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error.message);
  } else {
    console.log("Email sent: " + info.response);
  }
});


}
module.exports = sendMail
