

const authController = require('../controllers/authController');
const router = require("express").Router();

router.post('/signUp', authController.signUp);
router.post('/login', authController.login);
router.put('/updateUser', authController.updateUser);
router.delete('/deleteAccount', authController.deleteAccount);


module.exports = router;
