const express = require('express')

const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddlware = require('../middlewares/validation_middleware.js')
const profileMiddlware = require('../middlewares/profile_middleware.js')

const upload = require('../middlewares/uploadfiles.js')

router.use("/uploads", express.static(process.cwd() + '/uploads/'));

router.get('/',
    check.checkNotAuthenticated,
    profileMiddlware.getProfilePage)

router.post('/',
    check.checkNotAuthenticated,
    upload.uploadFile,
    validationMiddlware.profileValidation,
    profileMiddlware.postProfilePage)

module.exports = router