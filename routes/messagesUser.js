const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddlware = require('../middlewares/validation_middleware')
const messagesUserMiddlwares = require('../middlewares/messagesUser_middleware')

router.get('/',
    messagesUserMiddlwares.getUserMessagesPage)

router.get('/:id',
    validationMiddlware.paramValidation,
    check.checkMessage,
    check.checkMessageOwner,
    messagesUserMiddlwares.getMessagesByConvIdPage)

router.post('/:id',
    validationMiddlware.paramValidation,
    check.checkMessage,
    check.checkMessageOwner,
    validationMiddlware.messageAnswerValidation,
    messagesUserMiddlwares.postMessagesByConvIdPage)

module.exports = router