const router = require('express').Router()

const check = require('../middlewares/check.js')
const validationMiddlware = require('../middlewares/validation_middleware.js')
const messageMiddlware = require('../middlewares/message_middleware.js')

router.get('/:id',
    check.checkNotAuthenticated,
    validationMiddlware.paramValidation,
    messageMiddlware.getMessagePage)

router.post('/:id',
    check.checkNotAuthenticated,
    validationMiddlware.paramValidation,
    validationMiddlware.messageValidation,
    messageMiddlware.postMessagePage)

module.exports = router