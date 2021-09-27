const categsFunctionals = require('../models/functionals/categories_functionals')
const categFunctionals = new categsFunctionals.methods()

const getDeleteCategoryPage = (req, res, next) => {
    return res.render('deleteCategory')
}

const deleteCateg = (req, res, next) => {
    const categ = req.categ
    categFunctionals.deleteCateg(categ.id)
        .then(() => {
            req.flash('success_msg', 'Category deleted successfully.')
            return res.json({ message: 'Category deleted successfully'})
        })
        .catch(next)
}

module.exports = {
    getDeleteCategoryPage,
    deleteCateg
}