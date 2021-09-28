const { users } = require('../models/modelsConfig');

class methods {
    findOneUser(id) {
        return users.findOne({ where: { id }, raw: true })
    }

    findOneUserByEmail(email) {
        return users.findOne({ where: { email }, raw: true })
    }

    createUser(user) {
        return users.create(user, { raw: true })
    }

    updateUser(values, id) {
        return users.update(values, { where: { id } })
    }

    deleteUser(id) {
        return users.destroy({ where: { id } })
    }
}

module.exports = { methods }