const Promise = require('bluebird')

const usersFunctionals = require('../models/functionals/users_functionals')
const adsFunctionals = require('../models/functionals/ads_functionals')
const categsFunctionals = require('../models/functionals/categories_functionals')

const { getParentAndChildCategs } = require('./utilities')

const getHomePage = (req, res, next) => {
    categsFunctionals.findCategs()
        .then(categs => {
            return getParentAndChildCategs(categs)
        })
        .then(data => res.render('home', { parentCategs: data.arr1, subCategs: data.arr2 }) )
        .catch(next)
}

module.exports = { getHomePage }