const router = require('express').Router()

const check = require('../middlewares/check')
const deleteAccountMiddlware = require('../middlewares/deleteAccount_middleware')
const removeFiles = require('../middlewares/removeFiles')

router.get('/',
    check.checkAuthenticated,
    deleteAccountMiddlware.getDeleteAccountPage)

router.post('/',
    check.checkAuthenticated,
    removeFiles.removeProfilePicture,
    deleteAccountMiddlware.deleteAccount)

module.exports = router