const router = require('express').Router()

const logoutMiddlwares = require('../middlewares/logout_middleware')

router.get('/', logoutMiddlwares.getLogOut)

module.exports = router