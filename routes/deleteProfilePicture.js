const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddlware = require('../middlewares/validation_middleware')
const deleteProfilePictureMiddlwares = require('../middlewares/deleteProfilePicture_middleware')
const removeFiles = require('../middlewares/removeFiles')

router.get('/',
    check.checkAuthenticated,
    deleteProfilePictureMiddlwares.getDeleteProfilePicturePage)

router.post('/',
    check.checkAuthenticated,
    deleteProfilePictureMiddlwares.deleteProfilePicture,
    removeFiles.removeProfilePicture,
    deleteProfilePictureMiddlwares.postProfilePicturePage)

module.exports = router