module.exports = app => {
    const express = require('express')
    const router = require('express').Router()

    router.use("/uploads", express.static(process.cwd() + '/uploads/'));

    app.use('/home', require('./home'))
    app.use('/category', require('./category'))
    app.use('/subcategory', require('./subcategory'))
    app.use('/item', require('./item'))
    app.use('/message', require('./message'))
    app.use('/user/messages', require('./messagesUser'))

    app.use('/login', require('./login'))
    app.use('/register', require('./register'))
    app.use('/logout', require('./logout'))

    app.use('/account', require('./account'))
    app.use('/profile', require('./profile'))
    app.use('/delete/account', require('./deleteAccount'))

    app.use('/ad', require('./ad'))

    app.use('/add/category', require('./addCategory'))
    app.use('/add/subcategory', require('./addSubcategory'))
    app.use('/delete/category', require('./deleteCategory'))
    app.use('/delete/subcategory', require('./deleteSubcategory'))

    app.use('/edit', require('./edit'))
    app.use('/delete/ad', require('./deleteAd'))

    app.use('/error', require('./error'))

    app.use('/', router)
}