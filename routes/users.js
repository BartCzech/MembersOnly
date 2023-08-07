var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/sign-up', userController.sign_up_get);
router.post('/sign-up', userController.sign_up_post);

module.exports = router;
