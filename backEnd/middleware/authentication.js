const jwt = require("jsonwebtoken");
const User = require("../model/userModel");


const userAuth = async(req,res,next) => {
  const {authorization} = req.headers;
   try{
    if(!authorization){
      throw Error("Authorization token required")
    }
    const token = authorization.split(" ")[1];
    const { _id } = jwt.verify(token, process.env.SECRET);
    if(!_id){
      throw Error("miss match of authorization token")
    }
    req.user = await User.findOne({_id})
    next()
   }catch(error){
    res.status(400).json({error:error.message})
   }
}

module.exports = userAuth;