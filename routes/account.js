const router = require('express').Router()

const accountMiddlwares = require('../middlewares/accountMiddleware')

router.get('/',
    accountMiddlwares.getAccountPage)

module.exports = router