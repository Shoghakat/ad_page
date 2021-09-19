const { sequelize } = require('../configurations/dbConfig')

const usersFunctionals = require('../models/functionals/users_functionals')
const adsFunctionals = require('../models/functionals/ads_functionals')
const categsFunctionals = require('../models/functionals/categories_functionals')

const getSubcategoryPage = (req, res, next) => {
    const categ = req.categ

    sequelize.query(`
        SELECT a.id "adId", a.title "adTitle",
            i.id "imgId", i.filename, i.path
        FROM test_2.ads a
        LEFT OUTER JOIN (
            SELECT id, filename, "adId", path
            FROM test_2.ads_images i
            WHERE id IN (
                SELECT MIN(id)
                FROM test_2.ads_images
                GROUP BY "adId"
            )
        ) i
        ON i."adId" = a.id
        WHERE a."categoryId" = :c_id`,
        {
            replacements: { c_id: categ.id },
            type: sequelize.QueryTypes.SELECT
        }
    )
        .then(data => res.render('subcategory', { ads: data, categ: categ }) )
        .catch(next)
}

module.exports = { getSubcategoryPage }