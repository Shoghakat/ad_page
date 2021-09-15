const express = require('express')

const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddlware = require('../middlewares/validation_middleware.js')
const adMiddlware = require('../middlewares/ad_middleware.js')

const upload = require('../middlewares/uploadfiles')

router.use("/uploads", express.static(process.cwd() + '/uploads/'));

router.get('/',
    check.checkNotAuthenticated,
    adMiddlware.getAdsPage)

router.get('/:id',
    check.checkNotAuthenticated,
    validationMiddlware.paramValidation,
    adMiddlware.getAdsByIdPage)

router.post('/:id',
    check.checkNotAuthenticated,
    validationMiddlware.paramValidation,
    upload.uploadFiles,
    validationMiddlware.adValidation,
    adMiddlware.postAdsByIdPage)

module.exports = router