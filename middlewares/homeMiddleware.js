const categsFunctionals = require('../models/functionals/categoriesFunctionals')
const categFunctionals = new categsFunctionals.methods()

const { getParentAndChildCategs } = require('./utilities/utilities')

const getHomePage = (req, res, next) => {
    categFunctionals.findCategs()
        .then(categs => {
            const data = getParentAndChildCategs(categs)
            return res.render('home', { parentCategs: data.arr1, subCategs: data.arr2 })
        })
        .catch(next)
}

module.exports = { getHomePage }