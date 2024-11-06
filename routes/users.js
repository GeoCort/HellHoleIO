var express = require('express');
var router = express.Router();
const userController = require("../controllers/userController")
// Logging into the user page. 
router.get('/:id', userController.getUserPage);

module.exports = router;
