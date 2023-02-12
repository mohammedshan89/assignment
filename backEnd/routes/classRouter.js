const express = require("express");
const { createClass, getClass, userClass, updateClass, deleteClass } = require("../controller/classController");
const userAuth = require("../middleware/authentication.js");


const router = express.Router();

router.post("/", createClass);
router.get("/", getClass);
router.patch("/:id",updateClass)
router.delete("/:id",deleteClass)
router.get("/user_class", userAuth ,userClass)

module.exports = router;
