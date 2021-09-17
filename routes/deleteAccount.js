const router = require('express').Router()

const check = require('../middlewares/check')
const deleteAccountMiddlware = require('../middlewares/deleteAccount_middleware')

router.get('/',
    check.checkAuthenticated,
    deleteAccountMiddlware.getDeleteAccountPage)

router.post('/',
    check.checkAuthenticated,
    deleteAccountMiddlware.deleteAccount)

module.exports = router