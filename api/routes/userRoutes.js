const express = require('express');
const router = express.Router();

const userControllers = require('../../controllers/userControllers'); 

router.post('/signup', userControllers.signup);
router.post('/signIn', userControllers.signIn);
router.get('/allUsers', userControllers.allUsers);

module.exports = router;