const { sequelize } = require('../configurations/dbConfig')

const usersFunctionals = require('../models/functionals/users_functionals')
const adsFunctionals = require('../models/functionals/ads_functionals')
const adsImagesFunctionals = require('../models/functionals/adsImages_functionals')
const categsFunctionals = require('../models/functionals/categories_functionals')

const getAdsByCategoryPage = (req, res, next) => {
    const categ = req.categ

    sequelize.query(`
        SELECT a.id "adId", a.title "adTitle",
            i.id "imgId", i.filename, i.path
        FROM test_2.ads a
        INNER JOIN test_2.categories c
        ON (a."categoryId" = c.id)
        LEFT OUTER JOIN (
            SELECT id, filename, "adId", path
            FROM test_2.ads_images i
            WHERE id IN (
                SELECT MIN(id)
                FROM test_2.ads_images
                GROUP BY "adId"
            )
        ) i
        ON (i."adId" = a.id)
        WHERE c."parentId" = :c_id`,
        {
            replacements: { c_id: categ.id },
            type: sequelize.QueryTypes.SELECT
        }
    )
        .then(data => res.render('category', { ads: data, categ: categ }))
        .catch(next)
}

module.exports = { getAdsByCategoryPage }