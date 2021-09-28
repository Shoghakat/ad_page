const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddlware = require('../middlewares/validationMiddleware')
const deleteProfilePictureMiddlwares = require('../middlewares/deleteProfilePictureMiddleware')
const removeFiles = require('../middlewares/removeFiles')

router.get('/',
    deleteProfilePictureMiddlwares.getDeleteProfilePicturePage)

router.delete('/',
    deleteProfilePictureMiddlwares.deleteProfilePicture,
    removeFiles.removeProfilePicture,
    deleteProfilePictureMiddlwares.postProfilePicturePage)

module.exports = router