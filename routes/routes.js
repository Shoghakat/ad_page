module.exports = app => {
    const router = require('express').Router()
    const routes = require('./routesExport')

    const check = require('../middlewares/check')

    app.use('/', router)

    app.use('/error', routes.error)

    app.use('/home', routes.home)
    app.use('/category', routes.category)
    app.use('/subcategory', routes.subcategory)
    app.use('/item', routes.item)
    
    app.use('/login', routes.login)
    app.use('/register', routes.register)

    app.use('/*', check.checkAuthenticated)

    app.use('/logout', routes.logout)

    app.use('/account', routes.account)
    app.use('/profile', routes.profile)
    app.use('/profile/picture', routes.profilePicture)
    app.use('/delete/picture', routes.deleteProfilePicture)
    app.use('/delete/account', routes.deleteAccount)

    app.use('/ad', routes.ad)
    app.use('/edit', routes.edit)
    app.use('/delete/image', routes.deleteAdImage)

    app.use('/message', routes.message)
    app.use('/user/messages', routes.messagesUser)
    app.use('/user/ads', routes.adsUser)

    app.use('/*', check.checkAdmin)

    app.use('/add/category', routes.addCategory)
    app.use('/delete/category', routes.deleteCategory)
}