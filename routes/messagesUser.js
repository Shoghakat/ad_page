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
    messagesUserMiddlware.getMessageByIdPage)

router.post('/:id',
    check.checkAuthenticated,
    validationMiddlware.paramValidation,
    validationMiddlware.messageValidation,
    messagesUserMiddlware.postMessageByIdPage)

module.exports = router