const express = require('express');
const { registerUser, loginUser, currentUser } = require('../controller/userController');
const validateToken = require('../middleware/validateTokenHandler');
const router = express.Router();

router.post("/login", loginUser).post("/register", registerUser);

router.get("/current", validateToken, currentUser)

module.exports = router;