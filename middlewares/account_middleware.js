const { sequelize } = require('../configurations/dbConfig')

const usersFunctionals = require('../models/functionals/users_functionals')
const adsFunctionals = require('../models/functionals/ads_functionals')
const categsFunctionals = require('../models/functionals/categories_functionals')
const messagesFunctionals = require('../models/functionals/messages_functionals')

const getUserAdsAndImageById = (id) => {
    return sequelize.query(`
        SELECT "a"."id", "a"."title",
            "i"."id" "imgId", "i"."filename", "i"."path"
        FROM "test_2"."ads" "a"
        LEFT OUTER JOIN (
            SELECT "id", "filename", "adId", "path"
            FROM "test_2"."ads_images"
            WHERE "id" IN (
                SELECT MIN("id")
                FROM "test_2"."ads_images"
                GROUP BY "adId"
            )
        ) i
        ON "i"."adId" = "a"."id"
        WHERE a."userId" = :u_id`,
        {
            replacements: {
                u_id: id
            },
            type: sequelize.QueryTypes.SELECT
        }
    )
}


const getAccountPage = (req, res, next) => {
    getUserAdsAndImageById(req.user.id)
        .then(data => res.render('account', { ads: data }))
        .catch(next)
}

module.exports = { getAccountPage }