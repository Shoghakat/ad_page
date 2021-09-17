module.exports = app => {
    const router = require('express').Router()

    // const check = require('../middlewares/check')

    app.use('/', router)

    app.use('/error', require('./error'))

    app.use('/home', require('./home'))
    app.use('/category', require('./category'))
    app.use('/subcategory', require('./subcategory'))
    app.use('/item', require('./item'))
    
    app.use('/login', require('./login'))
    app.use('/register', require('./register'))
    app.use('/logout', require('./logout'))

    app.use('/account', require('./account'))
    app.use('/profile', require('./profile'))
    app.use('/delete/account', require('./deleteAccount'))

    app.use('/ad', require('./ad'))
    app.use('/edit', require('./edit'))
    app.use('/delete/ad', require('./deleteAd'))

    app.use('/message', require('./message'))
    app.use('/user/messages', require('./messagesUser'))
    app.use('/user/ads', require('./adsUser'))

    app.use('/add/category', require('./addCategory'))
    app.use('/delete/category', require('./deleteCategory'))
}