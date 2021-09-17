const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddlware = require('../middlewares/validation_middleware')
const messageMiddlware = require('../middlewares/message_middleware')

router.get('/:id',
    check.checkAuthenticated,
    validationMiddlware.paramValidation,
    messageMiddlware.getMessagePage)

router.post('/:id',
    check.checkAuthenticated,
    validationMiddlware.paramValidation,
    validationMiddlware.messageValidation,
    messageMiddlware.postMessagePage)

module.exports = router