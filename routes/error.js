const check = require('../middlewares/check')
const errorMiddlware = require('../middlewares/error_middleware')

const router = require('express').Router()

router.get('/',
    errorMiddlware.getErrorPage)

module.exports = router