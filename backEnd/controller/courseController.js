const  mongoose = require("mongoose");
const Course = require("../model/courseModel");

// @desc admin addcourse
// @route POST api/admin/add_course
// access private
const createCourse = async (req, res) => {
  const { coursename, description } = req.body;
  try {
    const course = await Course.create({ coursename, description });
    res.status(200).json({ course, message: "course Created" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc admin getCourses
// @route GET api/course
// access public
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.status(200).json(courses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc admin getCourse
// @route POST api/course/:id
// access public
const getCourse = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw Error("Not such a Course");
  }
  try {
    const courses = await Course.findById({ _id: id });
    res.status(200).json(courses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc admin updateCourse
// @route PATCH api/course/:id
// access public
const updateCourse = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw Error("Not such a course");
    }
    const course = await Course.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );
    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({error:error.message})
  }
};

// @desc admin updateCourse
// @route DELETE api/course/:id
// access public
const deleteCourse = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw Error("Not such a course");
    }
    const course = await Course.findOneAndDelete({ _id: id });
      if(!course){
        throw Error("Not such a course")
      }
    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({error:error.message})
  }
};
module.exports = {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse
};
