const express = require("express");
const { createClass, getClass, userClass } = require("../controller/classcontroller");
const userAuth = require("../middleware/authentication.js");


const router = express.Router();

router.post("/", createClass);
router.get("/", getClass);
router.get("/user_class", userAuth ,userClass)

// router.get("/:id", getCourse);
// router.patch("/:id", updateCourse);
// router.delete("/:id", deleteCourse);
module.exports = router;
