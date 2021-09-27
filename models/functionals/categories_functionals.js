const { categories } = require('../models/modelsConfig');

class methods {
    findCategs() {
        return categories.findAll({ raw: true, limit: 50 })
    }

    findOneCateg(id) {
        return categories.findOne({ where: { id }, raw: true })
    }

    findOneCategByParentId(parentId) {
        return categories.findOne({ where: { parentId }, raw: true })
    }

    findOneCategByName(name) {
        return categories.findOne({ where: { name }, raw: true })
    }

    findCategsByParentId(parentId) {
        return categories.findAll({ where: { parentId }, raw: true, limit: 50 })
    }

    createCateg(categ) {
        return categories.create(categ, { raw: true })
    }

    deleteCateg(id) {
        return categories.destroy({ where: { id } })
    }
}

module.exports = { methods }