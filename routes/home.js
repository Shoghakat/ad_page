const homeMiddlwares = require('../middlewares/homeMiddleware')

const router = require('express').Router()

router.get('/',
    homeMiddlwares.getHomePage)

module.exports = router