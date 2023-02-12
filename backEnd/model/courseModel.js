const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  coursename:{
    type:String,
    required: true
  },
  description:{
    type:String,
    required: true
  },
  users:{
    type:Array
  }
},{timestamps:true})

const Course = mongoose.model("Course",courseSchema);
module.exports = Course