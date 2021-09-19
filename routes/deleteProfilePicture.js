const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddlware = require('../middlewares/validation_middleware')
const deleteProfilePictureMiddlware = require('../middlewares/deleteProfilePicture_middleware')
const removeFiles = require('../middlewares/removeFiles')

router.get('/',
    check.checkAuthenticated,
    deleteProfilePictureMiddlware.getDeleteProfilePicturePage)

router.post('/',
    check.checkAuthenticated,
    deleteProfilePictureMiddlware.deleteProfilePicture,
    removeFiles.removeProfilePicture,
    deleteProfilePictureMiddlware.postProfilePicturePage)

module.exports = router