const express = require('express')

const router = require('express').Router()

const check = require('../middlewares/check')
const validationMiddlware = require('../middlewares/validation_middleware.js')
const editMiddlware = require('../middlewares/edit_middleware.js')

const upload = require('../middlewares/uploadfiles.js')

router.use("/uploads", express.static(process.cwd() + '/uploads/'));

router.get('/:id',
    check.checkNotAuthenticated,
    validationMiddlware.paramValidation,
    editMiddlware.getEditPage)

router.post('/:id',
    check.checkNotAuthenticated,
    validationMiddlware.paramValidation,
    upload.uploadFiles,
    validationMiddlware.adValidationEdit,
    editMiddlware.postEditPage)

module.exports = router