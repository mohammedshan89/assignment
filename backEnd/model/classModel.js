const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const classSchema = new Schema(
  {
    coursename: {
      type: String,
      required: true,
    },
    classname: {
      type:String,
      required:true
    },
    date:{
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const Class = mongoose.model("Class", classSchema);
module.exports = Class;
