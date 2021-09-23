const errorMiddlwares = require('../middlewares/error_middleware')

const router = require('express').Router()

router.get('/',
    errorMiddlwares.getErrorPage)

module.exports = router