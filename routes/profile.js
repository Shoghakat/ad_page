const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddlware = require('../middlewares/validation_middleware')
const profileMiddlwares = require('../middlewares/profile_middleware')

router.get('/',
    check.checkAuthenticated,
    profileMiddlwares.getProfilePage)

router.post('/',
    check.checkAuthenticated,
    validationMiddlware.profileValidation,
    profileMiddlwares.postProfilePage)

module.exports = router