const router = require('express').Router()

const validationMiddlware = require('../middlewares/validation_middleware.js')
const messageMiddlware = require('../middlewares/message_middleware.js')

router.get('/:id',
    validationMiddlware.paramValidation,
    messageMiddlware.getMessagePage)

router.post('/:id',
    validationMiddlware.paramValidation,
    validationMiddlware.messageValidation,
    messageMiddlware.postMessagePage)

module.exports = router