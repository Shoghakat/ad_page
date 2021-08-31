module.exports = app => {
    const express = require('express')
    const router = require('express').Router()

    router.use("/uploads", express.static(process.cwd() + '/uploads/'));

    app.use('/test/home', require('./home.js'))
    app.use('/test/category', require('./category.js'))
    app.use('/test/subcategory', require('./subcategory.js'))
    app.use('/test/item', require('./item.js'))

    app.use('/test/login', require('./login.js'))
    app.use('/test/register', require('./register.js'))
    app.use('/test/logout', require('./logout.js'))

    app.use('/test/account', require('./account.js'))
    app.use('/test/profile', require('./profile.js'))
    app.use('/test/delete/account', require('./deleteAccount.js'))

    app.use('/test/ad', require('./ad.js'))

    app.use('/test/add/category', require('./addCategory.js'))
    app.use('/test/add/subcategory', require('./addSubcategory.js'))
    app.use('/test/delete/category', require('./deleteCategory.js'))
    app.use('/test/delete/subcategory', require('./deleteSubcategory.js'))

    app.use('/test/edit', require('./edit.js'))
    app.use('/test/delete/ad', require('./deleteAd.js'))

    app.use('/test/error', require('./error.js'))

    app.use('/', router)
}