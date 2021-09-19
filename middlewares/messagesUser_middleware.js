const { sequelize } = require('../configurations/dbConfig')

const usersFunctionals = require('../models/functionals/users_functionals')
const adsFunctionals = require('../models/functionals/ads_functionals')
const categsFunctionals = require('../models/functionals/categories_functionals')
const messagesFunctionals = require('../models/functionals/messages_functionals')

const getUserMessagesPage = async (req, res, next) => {
    sequelize.query(`
        SELECT m.id, m."userId", m.name, m."conversationId",
        a.id "adId", a.title "adTitle", a."userId" "adUserId",
        counts.number
        FROM test_2.messages m INNER JOIN test_2.ads a
        ON m."adId" = a.id
        LEFT OUTER JOIN (
            SELECT "conversationId", COUNT("conversationId")+1 number
            FROM test_2.messages
            GROUP BY "conversationId"
            HAVING "conversationId" IS NOT NULL
        ) counts
        ON m.id = counts."conversationId"
        WHERE (m."userId" = :u_id OR a."userId" = :u_id)
        AND m."conversationId" IS NULL`,
        {
            replacements: { u_id: req.user.id },
            type: sequelize.QueryTypes.SELECT
        }
    )
        .then(data => {
            res.render('messagesUser', { messagesUser: data })
        })
        .catch(next)
}


const getMessagesByConvIdPage = (req, res, next) => {
    const message = req.message
    const ad = req.ad

    messagesFunctionals.findMessagesWhere({ conversationId: message.id })
        .then(messages => {
            messages.unshift(message)
            return res.render('messageSingle', { conversation: messages, ad: ad })
        })
        .catch(next)
}


const postMessagesByConvIdPage = (req, res, next) => {
    const message = req.message

    const data = req.body
    data.userId = req.user.id,
    data.adId = message.adId,
    data.conversationId = message.id

    messagesFunctionals.createMessage(data)
        .then(() => {
            req.flash('success_msg', 'Message sent successfully.')
            return res.redirect('/user/messages')
        })
        .catch(next)
}

module.exports = {
    getUserMessagesPage,
    getMessagesByConvIdPage,
    postMessagesByConvIdPage
}