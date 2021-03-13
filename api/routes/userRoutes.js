const express = require('express');
const router = express.Router();

const userControllers = require('../../controllers/userControllers'); 

router.post('/signup', userControllers.signup);
router.post('/signIn', userControllers.signIn);

module.exports = router;