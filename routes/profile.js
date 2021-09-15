const express = require('express')

const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddlware = require('../middlewares/validation_middleware')
const profileMiddlware = require('../middlewares/profile_middleware')

const upload = require('../middlewares/uploadfiles')

router.use("/uploads", express.static(process.cwd() + '/uploads/'));

router.get('/',
    check.checkNotAuthenticated,
    profileMiddlware.getProfilePage)

router.get('/:id',
    check.checkNotAuthenticated,
    validationMiddlware.paramValidation,
    profileMiddlware.getProfileByIdPage)

router.post('/',
    check.checkNotAuthenticated,
    upload.uploadFile,
    validationMiddlware.profileValidation,
    profileMiddlware.postProfilePage)

module.exports = router