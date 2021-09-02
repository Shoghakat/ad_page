const check = require('../middlewares/check')
const homeMiddlware = require('../middlewares/home_middleware.js')

const router = require('express').Router()

router.get('/',
    homeMiddlware.getHomePage)

module.exports = router