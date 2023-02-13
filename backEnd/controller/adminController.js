
const Admin = require("../model/adminModel");

const User = require("../model/userModel");
const sendMail = require("./mail");



// @desc admin signup
// @route POST api/admin/signup
// access private
const signup = async (req, res) => {
  const email = "admin@1234";
  const password = "admin@123";

  try {
    //create admin
    await Admin.create({ email, password });
    res.status(200).json({ message: "admin Created" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc admin login
// @route POST api/admin/login
// access private
const login = async (req, res) => {
  const {email, password} = req.body;
  
  try {
    const admin = await Admin.findOne({email, password });
    if(admin){
    res.status(200).json(admin);
    }else{
      res.status(500).json({message:"no admin found"})
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc admin approve user
// @route POST api/admin/approve_user
// access private
const approveUser = async(req,res) => { 
  const {_id} = req.body
  try{
    const user = await User.findOneAndUpdate({_id},{approval:true})
    sendMail(user.email,user)
    res.status(200).json({user,message:"Update User Status"})
  }catch(error){
    res.status(400).json({ error: error.message})
  }
}

const getallUser = async(req, res) => {
  try{
    const users = await User.find()
    res.status(200).json(users)
  }catch(error){
    res.status(400).json({error:error.message})
  }
}





module.exports = {
  signup,login,approveUser,getallUser
};
