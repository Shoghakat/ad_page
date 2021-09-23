const homeMiddlwares = require('../middlewares/home_middleware')

const router = require('express').Router()

router.get('/',
    homeMiddlwares.getHomePage)

module.exports = router