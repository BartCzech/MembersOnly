var express = require('express');
var router = express.Router();
const messageController = require('../controllers/messageController');

/* GET messages listing. */
router.get('/create-message', messageController.create_message_get);
router.get('/', messageController.messages_get);

module.exports = router;
