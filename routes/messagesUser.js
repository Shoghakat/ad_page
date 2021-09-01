const router = require('express').Router()

const check = require('../middlewares/check.js')
const validationMiddlware = require('../middlewares/validation_middleware.js')
const messagesUserMiddlware = require('../middlewares/messagesUser_middleware.js')

router.get('/:id',
    check.checkNotAuthenticated,
    validationMiddlware.paramValidation,
    messagesUserMiddlware.getMessagesUserPage)

module.exports = router