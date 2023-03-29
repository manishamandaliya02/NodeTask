const router = require('express').Router();
const Version1 = require('./route.v1');

router.use('/v1', Version1);

module.exports = router;