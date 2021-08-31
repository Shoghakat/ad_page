const crypto = require('crypto')

const generateSalt = () => crypto.randomBytes(16).toString('base64')

const hashPassword = (password, salt) => crypto
        .createHash('RSA-SHA256')
        .update(password)
        .update(salt)
        .digest('hex')

module.exports = { generateSalt, hashPassword }