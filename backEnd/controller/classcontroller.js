const Class = require("../model/classModel");
const Course = require("../model/courseModel");
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;


// @desc admin addclass
// @route POST api/class
// access private
const createClass = async (req, res) => {
  const { coursename, classname, date } = req.body;
  try {
    const scheduledClass = await Class.create({ coursename, classname, date });
    res.status(200).json({ scheduledClass, message: "course Created" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc admin getClass
// @route GET api/class
// access private
const getClass = async (req, res) => {
  try {
    const classes = await Class.find().sort({ createdAt: -1 });
    res.status(200).json(classes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc userget classes
// @route GET api/class/user_class
// access private
const userClass = async(req,res) => {
  const { date }  = req.body
  try{
    const user = req.user._id;
    const course = await Course.findOne({users:[new ObjectId(user)]})
    c
    const userClass = await Class.find({coursename:course.coursename, date})
    
    res.status(200).json(userClass)
  }catch(error){ 
    res.status(400).json({error:error.message})
  }
}

// @desc update classes
// @route PATCH api/class/:id
// access private
const updateClass = async(req,res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw Error("Not such a course");
    }
    const scheduledClass = await Class.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );
    res.status(200).json(scheduledClass);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// @desc admin Delete class
// @route DELETE api/course/:id
// access private
const deleteClass = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw Error("Not such a course");
    }
    const scheduledClass = await Class.findOneAndDelete({ _id: id });
      if(!scheduledClass){
        throw Error("Not such a course")
      }
    res.status(200).json(scheduledClass);
  } catch (error) {
    res.status(400).json({error:error.message})
  }
};


module.exports = {
  createClass,getClass,userClass,updateClass,deleteClass

}
