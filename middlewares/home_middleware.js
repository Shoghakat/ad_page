const Promise = require('bluebird')

const usersFunctionals = require('../models/functionals/users_functionals')
const adsFunctionals = require('../models/functionals/ads_functionals')
const categsFunctionals = require('../models/functionals/categories_functionals')

const getHomePage = (req, res, next) => {
    categsFunctionals.findCategs()
        .then(categs => {
            return Promise.reduce(categs, (acc, el) => {
                if(el.parentId === null) {
                    acc.arr1.push(el)
                } else {
                    acc.arr2.push(el)
                }
                return acc
            }, {
                arr1: [],
                arr2: []
            })
        })
        .then(data => res.render('home', { parentCategs: data.arr1, subCategs: data.arr2 }) )
        .catch(next)
}

module.exports = { getHomePage }