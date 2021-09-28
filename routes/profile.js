const router = require('express').Router()

const validationMiddlware = require('../middlewares/validationMiddleware')
const profileMiddlwares = require('../middlewares/profileMiddleware')

router.get('/',
    profileMiddlwares.getProfilePage)

router.post('/',
    validationMiddlware.profileValidation,
    profileMiddlwares.postProfilePage)

module.exports = router