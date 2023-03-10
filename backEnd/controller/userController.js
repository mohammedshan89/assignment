const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Course = require('../model/courseModel');
const User = require('../model/userModel');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET,{expiresIn:"3d"});
}

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

// @desc user login
// @route POST api/user/login
// access public
const login = async(req,res) => {
  const {email, password} = req.body;
  console.log(req.body)
  try{
    // required field validation
    if(!email || !password ){
      throw Error("please fill all the fields")
    }
    //check registerd user 
    const user = await User.findOne({email})
    if(!user){
      throw Error("Not Registerd person")
    }
    //password validation
    const matchPassword = await bcrypt.compare(password,user.password)
    if(!matchPassword){
      throw Error("Password missmatch")
    }

    //user approved by admin check
    if(!user.approval){
      throw Error("under process")
    }
    //when user login user id saved in users speciic course collection
     await Course.findOneAndUpdate({coursename:user.course},{$push:{"users":user._id}})
    
    res.status(200).json({user,token:createToken(user._id)})

  }catch(error){
    res.status(400).json({error:error.message})
  }
}


module.exports = {
  signup,login
}