module.exports = app => {
    const express = require('express')
    const router = require('express').Router()

    router.use("/uploads", express.static(process.cwd() + '/uploads/'));

    app.use('/home', require('./home.js'))
    app.use('/category', require('./category.js'))
    app.use('/subcategory', require('./subcategory.js'))
    app.use('/item', require('./item.js'))
    app.use('/message', require('./message.js'))
    app.use('/user/messages', require('./messagesUser.js'))

    app.use('/login', require('./login.js'))
    app.use('/register', require('./register.js'))
    app.use('/logout', require('./logout.js'))

    app.use('/account', require('./account.js'))
    app.use('/profile', require('./profile.js'))
    app.use('/delete/account', require('./deleteAccount.js'))

    app.use('/ad', require('./ad.js'))

    app.use('/add/category', require('./addCategory.js'))
    app.use('/add/subcategory', require('./addSubcategory.js'))
    app.use('/delete/category', require('./deleteCategory.js'))
    app.use('/delete/subcategory', require('./deleteSubcategory.js'))

    app.use('/edit', require('./edit.js'))
    app.use('/delete/ad', require('./deleteAd.js'))

    app.use('/error', require('./error.js'))

    app.use('/', router)
}