const router = require('express').Router()

const check = require('../middlewares/check')
const deleteAccountMiddlware = require('../middlewares/deleteAccount_middleware')

router.get('/',
    check.checkNotAuthenticated,
    deleteAccountMiddlware.getDeleteAccountPage)

router.post('/',
    check.checkNotAuthenticated,
    deleteAccountMiddlware.postDeleteAccountPage)

module.exports = router