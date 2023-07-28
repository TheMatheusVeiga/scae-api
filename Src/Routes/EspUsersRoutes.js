const router = require('express-promise-router')();
const EspUserController = require('../Controllers/UserController');

router.post('/esp32/signin', EspUserController.signIn);


module.exports = router;