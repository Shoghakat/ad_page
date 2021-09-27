const router = require('express').Router()

const accountMiddlwares = require('../middlewares/account_middleware')

router.get('/',
    accountMiddlwares.getAccountPage)

module.exports = router