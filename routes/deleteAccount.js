const router = require('express').Router()

const check = require('../middlewares/check')
const deleteAccountMiddlwares = require('../middlewares/deleteAccount_middleware')
const removeFiles = require('../middlewares/removeFiles')

router.get('/',
    deleteAccountMiddlwares.getDeleteAccountPage)

router.delete('/',
    removeFiles.removeProfilePicture,
    deleteAccountMiddlwares.deleteMessagesByUser,
    deleteAccountMiddlwares.deleteAdsByUser,
    deleteAccountMiddlwares.deleteAccount)

module.exports = router