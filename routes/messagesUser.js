const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddlware = require('../middlewares/validation_middleware')
const messagesUserMiddlware = require('../middlewares/messagesUser_middleware')

router.get('/',
    check.checkAuthenticated,
    messagesUserMiddlware.getUserMessagesPage)

router.get('/:id',
    check.checkAuthenticated,
    validationMiddlware.paramValidation,
    check.checkMessage,
    check.checkMessageOwner,
    messagesUserMiddlware.getMessagesByConvIdPage)

router.post('/:id',
    check.checkAuthenticated,
    validationMiddlware.paramValidation,
    check.checkMessage,
    check.checkMessageOwner,
    validationMiddlware.messageAnswerValidation,
    messagesUserMiddlware.postMessagesByConvIdPage)

module.exports = router