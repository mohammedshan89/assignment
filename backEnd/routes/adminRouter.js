const express = require("express");
const { signup,login, approveUser} = require("../controller/adminController");


const router = express.Router();

router.post("/signup",signup );
router.post("/login",login)
router.post("/approve_user",approveUser)

module.exports = router;
