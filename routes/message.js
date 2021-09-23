const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddlware = require('../middlewares/validation_middleware')
const messageMiddlwares = require('../middlewares/message_middleware')

router.get('/:id',
    validationMiddlware.paramValidation,
    check.checkAd,
    messageMiddlwares.getMessagePage)

router.post('/:id',
    validationMiddlware.paramValidation,
    check.checkAd,
    validationMiddlware.messageValidation,
    messageMiddlwares.postMessagePage)

module.exports = router