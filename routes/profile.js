const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddlware = require('../middlewares/validation_middleware')
const profileMiddlware = require('../middlewares/profile_middleware')

const upload = require('../middlewares/uploadfiles')

router.get('/',
    check.checkAuthenticated,
    profileMiddlware.getProfilePage)

router.post('/',
    check.checkAuthenticated,
    upload.uploadFile,
    validationMiddlware.profileValidation,
    profileMiddlware.postProfilePage)

module.exports = router