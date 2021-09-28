const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddlware = require('../middlewares/validationMiddleware')
const profilePictureMiddlwares = require('../middlewares/profilePictureMiddleware')
const removeFiles = require('../middlewares/removeFiles')

const upload = require('../middlewares/uploadfiles')

router.get('/',
    profilePictureMiddlwares.getProfilePicturePage)

router.post('/',
    upload.uploadFile,
    profilePictureMiddlwares.postProfilePicturePage,
    removeFiles.removeProfilePicture,
    profilePictureMiddlwares.completePostProfilePicture)

module.exports = router