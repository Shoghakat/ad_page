const router = require('express').Router()

const logoutMiddlware = require('../middlewares/logout_middleware.js')

router.get('/', logoutMiddlware.getLogOut)

module.exports = router