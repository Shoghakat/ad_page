const { sequelize } = require('../configurations/dbConfig')

const usersFunctionals = require('../models/functionals/users_functionals')
const adsFunctionals = require('../models/functionals/ads_functionals')
const categsFunctionals = require('../models/functionals/categories_functionals')

const getItemPage = (req, res, next) => {
    const id = parseInt(req.params.id, 10)

    sequelize.query(`
        SELECT "a".*,
            "u"."image" "userImg",
            "i"."id" "imgId", "i"."filename", "i"."path"
        FROM "test_2"."ads" "a" INNER JOIN "test_2"."users" "u"
        ON "a"."userId" = "u"."id"
        LEFT OUTER JOIN "test_2"."ads_images" "i"
        ON "i"."adId" = "a"."id"
        WHERE "a"."id" = :a_id`,
        {
            replacements: {
                a_id: id
            },
            type: sequelize.QueryTypes.SELECT
        }
    )
        .then(data => {
            if(!data) {
                const err = `There is no ad with id ${id}`
                return res.render('error', { err: err })
            }
            
            return res.render('item', { ad: data[0], images: data })
        })
        .catch(next)
}

module.exports = { getItemPage }