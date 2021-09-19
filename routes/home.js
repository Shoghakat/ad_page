const homeMiddlware = require('../middlewares/home_middleware')

const router = require('express').Router()

router.get('/',
    homeMiddlware.getHomePage)

module.exports = router