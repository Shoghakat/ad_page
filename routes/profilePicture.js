const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddlware = require('../middlewares/validation_middleware')
const profilePictureMiddlware = require('../middlewares/profilePicture_middleware')
const removeFiles = require('../middlewares/removeFiles')

const upload = require('../middlewares/uploadfiles')

router.get('/',
    check.checkAuthenticated,
    profilePictureMiddlware.getProfilePicturePage)

router.post('/',
    check.checkAuthenticated,
    upload.uploadFile,
    profilePictureMiddlware.postProfilePicturePage,
    // validationMiddlware.profilePictureValidation,
    removeFiles.removeProfilePicture,
    profilePictureMiddlware.completePostProfilePicture)

module.exports = router