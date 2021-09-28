const router = require('express').Router()

const logoutMiddlwares = require('../middlewares/logoutMiddleware')

router.get('/', logoutMiddlwares.getLogOut)

module.exports = router