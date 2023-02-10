const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');


// @desc user signup
// @route POST api/user/signup
// access public

const signup = async(req,res) => {
  
  const {email,name,password,course} = req.body;
  
  try{
    //check Existing User
    const existingUser = await User.findOne({email})
    if(existingUser){
     throw Error("already registerd")
    }
    // password Hashing
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password,salt)
    
    //create new User
    
    await User.create({email,name,password:hashPassword,course})
    res.status(200).json({message: "waiting for admin approval"})

  }catch(error){
    res.status(400).json({error:error.message})
  }
}



module.exports = {
  signup
}