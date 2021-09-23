const { sequelize } = require('../configurations/dbConfig')

const usersFunctionals = require('../models/functionals/users_functionals')
const adsFunctionals = require('../models/functionals/ads_functionals')
const categsFunctionals = require('../models/functionals/categories_functionals')

const getUserAdsById = (id) => {
    return sequelize.query(`
        SELECT "u"."id" "userId", "u"."name",
            "a"."id", "a"."title",
            "i"."id" "imgId", "i"."filename", "i"."path"
        FROM "test_2"."users" "u"
        LEFT OUTER JOIN "test_2"."ads" "a"
        ON "a"."userId" = "u"."id"
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
        WHERE u."id" = :u_id`,
        {
            replacements: {
                u_id: id
            },
            type: sequelize.QueryTypes.SELECT
        }
    )
}


const getUserAdsPage = (req, res, next) => {
    const id = parseInt(req.params.id, 10)
    getUserAdsById(id)
        .then(data => {
            return res.render('userAds', {
                ads: data,
                owner: {
                    id: data[0].userId,
                    name: data[0].name
                }
            })
        })
        .catch(next)
}

module.exports = { getUserAdsPage }