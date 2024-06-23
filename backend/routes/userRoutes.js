const router = require('express').Router();

const {
  registerController,
  loginController,
  getUserProfile,
} = require('../controllers/userControllers');
const { auth } = require('./../middlewares/isAuthenticated');


router.post('/register', registerController);

router.post('/login', loginController);

router.get('/getUserProfile', auth, getUserProfile);


module.exports = router;
