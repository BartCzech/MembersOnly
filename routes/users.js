var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/sign-up', userController.sign_up_get);
router.post('/sign-up', userController.sign_up_post);

router.get('/log-in', userController.log_in_get);
router.get("/log-out",userController.log_out_get);

router.get('/become-pro', userController.become_pro_get);
router.post('/become-pro', userController.become_pro_post);

module.exports = router;
