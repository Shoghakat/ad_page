const { sequelize } = require('../configurations/dbConfig')

const usersFunctionals = require('../models/functionals/users_functionals')
const adsFunctionals = require('../models/functionals/ads_functionals')
const adsImagesFunctionals = require('../models/functionals/adsImages_functionals')
const categsFunctionals = require('../models/functionals/categories_functionals')

const getAdsByCategoryPage = (req, res, next) => {
    const id = parseInt(req.params.id, 10)

    sequelize.query(`
        SELECT "a"."id" AS "adId", "a"."title" AS "adTitle",
            "c"."id" AS "categId",
            "c_parent"."id" AS "categId", "c_parent"."name" AS "categName",
            "i"."id" AS "imgId", "i"."filename", "i"."path"
        FROM "test_2"."ads" AS "a"
        INNER JOIN "test_2"."categories" AS "c"
        ON ("a"."categoryId" = "c"."id")
        INNER JOIN "test_2"."categories" AS "c_parent"
        ON ("c"."parentId" = "c_parent"."id")
        LEFT OUTER JOIN (
            SELECT "id", "filename", "adId", "path"
            FROM "test_2"."ads_images" AS "i"
            WHERE "id" IN (
                SELECT MIN("id")
                FROM "test_2"."ads_images"
                GROUP BY "adId"
            )
        ) AS "i"
        ON ("i"."adId" = "a"."id")
        WHERE "c"."parentId" = :c_parent_id`,
        {
            replacements: {
                c_parent_id: id
            },
            type: sequelize.QueryTypes.SELECT
        }
    )
        .then(data => {
            if(data.length > 0) {
                return res.render('category', { ads: data, categName: data[0].categName })
            }
            
            categsFunctionals.findOneCateg({ id: id })
                .then(categ => {
                    return res.render('category', { ads: null, categName: categ.name })
                })
        })
        .catch(next)
}

module.exports = { getAdsByCategoryPage }