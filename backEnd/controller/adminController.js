const SendmailTransport = require("nodemailer/lib/sendmail-transport");
const Admin = require("../model/adminModel");
const User = require("../model/userModel");
const sendMail = require("./mail");



// @desc admin signup
// @route POST api/admin/signup
// access private
const signup = async (req, res) => {
  const name = "admin@1234";
  const password = "admin@123";

  try {
    //create admin
    await Admin.create({ name, password });
    res.status(200).json({ message: "admin Created" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc admin login
// @route POST api/admin/login
// access private
const login = async (req, res) => {
  const {name, password} = req.body;
  try {
    const admin = await Admin.findOne({ name, password });
    res.status(200).json(admin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc admin addcourse
// @route POST api/admin/approve_user
// access private
const approveUser = async(req,res) => { 
  const {email} = req.body
  try{
    const user = await User.findOneAndUpdate({email},{approval:true})
    sendMail(user.email,user)
    res.status(200).json({user,message:"Update User Status"})
  }catch(error){
    res.status(400).json({ error: error.message})
  }
}


module.exports = {
  signup,login,approveUser
};
