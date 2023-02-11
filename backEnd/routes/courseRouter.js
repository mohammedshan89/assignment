
const express = require("express");
const { createCourse, getCourses, getCourse, updateCourse, deleteCourse } = require("../controller/courseController");

const router = express.Router();


router.post("/", createCourse);
router.get("/", getCourses);
router.get("/:id",getCourse)
router.patch('/:id',updateCourse)
router.delete('/:id',deleteCourse)
module.exports = router;
