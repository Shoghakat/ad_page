const errorMiddlwares = require('../middlewares/errorMiddleware')

const router = require('express').Router()

router.get('/',
    errorMiddlwares.getErrorPage)

module.exports = router