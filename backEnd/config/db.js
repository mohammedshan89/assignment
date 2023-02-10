const mongoose = require('mongoose');
mongoose.set("strictQuery", false);

const connectToDb = async(listen) =>{
  try{
     const connect = await mongoose.connect(process.env.MONGO_URI);
     console.log(`mongoDB connected to ${connect.connection.host}`.cyan.underline)
    listen()
  }catch(err){
    console.log(err.message)
   
  }
}

module.exports = connectToDb;