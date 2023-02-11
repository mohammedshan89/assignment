require('dotenv').config();
require('colors')
const express = require('express');

const connectToDb = require('./config/db');
const logger = require('./middleware/logger');
const cors = require('cors');
const { signup } = require('./controller/userController');

//intilise app
const app = express();

//middleware
app.use(express.json());
app.use(logger);
app.use(cors())

//routes
// app.post('/api/user/signup',(req,res)=>{
//   console.log("hi");
// })
app.use('/api/user',require('./routes/userRouter'))
app.use('/api/admin',require('./routes/adminRouter'))
app.use('/api/course',require('./routes/courseRouter'))
app.use("/api/class", require("./routes/classRouter"));

//connect to DB and listning port
connectToDb(()=>{
   app.listen(process.env.PORT, () => {
      console.log(`listening 4040`.yellow.underline);
    });
})