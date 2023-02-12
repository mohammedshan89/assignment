const express = require("express");
const { signup,login, approveUser, getallUser} = require("../controller/adminController");


const router = express.Router();

router.post("/signup",signup );
router.post("/login",login)
router.get('/all-users',getallUser)
router.post("/approve_user",approveUser)

module.exports = router;
