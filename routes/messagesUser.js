const router = require('express').Router()

const check = require('../middlewares/check.js')
const validationMiddlware = require('../middlewares/validation_middleware.js')
const messagesUserMiddlware = require('../middlewares/messagesUser_middleware.js')

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