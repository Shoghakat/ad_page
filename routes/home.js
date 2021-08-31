const check = require('../middlewares/check')
const homeMiddlware = require('../middlewares/home_middleware.js')

const router = require('express').Router()

router.get('/',
    check.checkAuthenticated,
    homeMiddlware.getHomePage)

module.exports = router