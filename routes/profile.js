const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddlware = require('../middlewares/validation_middleware')
const profileMiddlwares = require('../middlewares/profile_middleware')

router.get('/',
    profileMiddlwares.getProfilePage)

router.post('/',
    validationMiddlware.profileValidation,
    profileMiddlwares.postProfilePage)

module.exports = router