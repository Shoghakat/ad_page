const router = require('express').Router()

const check = require('../middlewares/check')
const deleteAccountMiddlwares = require('../middlewares/deleteAccount_middleware')
const removeFiles = require('../middlewares/removeFiles')

router.get('/',
    check.checkAuthenticated,
    deleteAccountMiddlwares.getDeleteAccountPage)

router.post('/',
    check.checkAuthenticated,
    removeFiles.removeProfilePicture,
    deleteAccountMiddlwares.deleteAccount)

module.exports = router