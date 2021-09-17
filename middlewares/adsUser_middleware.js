const { sequelize } = require('../configurations/dbConfig')

const usersFunctionals = require('../models/functionals/users_functionals')
const adsFunctionals = require('../models/functionals/ads_functionals')
const categsFunctionals = require('../models/functionals/categories_functionals')

const getUserAdsPage = (req, res, next) => {
    const id = parseInt(req.params.id, 10)

    sequelize.query(`
        SELECT "a"."id", "a"."title",
            "u"."id" "userId", "u"."name" "userName",
            "i"."id" "imgId", "i"."filename", "i"."path"
        FROM "test_2"."ads" "a"
        INNER JOIN "test_2"."users" "u"
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
        WHERE a."userId" = :u_id`,
        {
            replacements: {
                u_id: id
            },
            type: sequelize.QueryTypes.SELECT
        }
    )
        .then(data => {
            if(data.length > 0) {
                return res.render('userAds', {
                    ads: data,
                    owner: {
                        id: data[0].userId,
                        name: data[0].userName
                    }
                })
            }
            
            usersFunctionals.findOneUser({ id: id })
                .then(user => {
                    return res.render('userAds', { ads: null, owner: user })
                })
        })
        .catch(next)
}

module.exports = { getUserAdsPage }