const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddlware = require('../middlewares/validation_middleware')
const messagesUserMiddlware = require('../middlewares/messagesUser_middleware')

router.get('/',
    check.checkNotAuthenticated,
    messagesUserMiddlware.getMessagesUserPage)

router.get('/:id',
    check.checkNotAuthenticated,
    validationMiddlware.paramValidation,
    messagesUserMiddlware.getMessageByIdPage)

router.post('/:id',
    check.checkNotAuthenticated,
    validationMiddlware.paramValidation,
    validationMiddlware.messageValidation,
    messagesUserMiddlware.postMessageByIdPage)

module.exports = router