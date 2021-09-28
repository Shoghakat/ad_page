const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddlware = require('../middlewares/validationMiddleware')
const messagesUserMiddlwares = require('../middlewares/messagesUserMiddleware')

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