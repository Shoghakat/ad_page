const { sequelize } = require('../configurations/dbConfig')

const usersFunctionals = require('../models/functionals/users_functionals')
const adsFunctionals = require('../models/functionals/ads_functionals')
const categsFunctionals = require('../models/functionals/categories_functionals')

const getSubcategoryPage = (req, res, next) => {
    const id = parseInt(req.params.id, 10)

    sequelize.query(`
        SELECT "a"."id" "adId", "a"."title" "adTitle", "c"."id" "categId", "c"."name" "categName", "i"."id" "imgId", "i"."filename", "i"."path"
        FROM "test_2"."ads" a INNER JOIN "test_2"."categories" "c"
        ON "a"."categoryId" = "c"."id"
        LEFT OUTER JOIN (
            SELECT "id", "filename", "adId", "path"
            FROM "test_2"."ads_images" i
            WHERE "id" IN (
                SELECT MIN("id")
                FROM "test_2"."ads_images"
                GROUP BY "adId"
            )
        ) i
        ON "i"."adId" = "a"."id"
        WHERE "c"."id" = :c_id`,
        {
            replacements: {
                c_id: id
            },
            type: sequelize.QueryTypes.SELECT
        }
    )
        .then(data => {
            if(data.length > 0) {
                return res.render('subcategory', { ads: data, categName: data[0].categName })
            }
            
            categsFunctionals.findOneCateg({ id: id })
                .then(categ => {
                    return res.render('subcategory', { ads: null, categName: categ.name })
                })
        })
        .catch(next)
}

module.exports = { getSubcategoryPage }