const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddlware = require('../middlewares/validation_middleware')
const profilePictureMiddlwares = require('../middlewares/profilePicture_middleware')
const removeFiles = require('../middlewares/removeFiles')

const upload = require('../middlewares/uploadfiles')

router.get('/',
    check.checkAuthenticated,
    profilePictureMiddlwares.getProfilePicturePage)

router.post('/',
    check.checkAuthenticated,
    upload.uploadFile,
    profilePictureMiddlwares.postProfilePicturePage,
    validationMiddlware.imageProfileValidation,
    removeFiles.removeProfilePicture,
    profilePictureMiddlwares.completePostProfilePicture)

module.exports = router