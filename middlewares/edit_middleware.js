const { sequelize } = require('../configurations/dbConfig')

const Promise = require('bluebird')

const usersFunctionals = require('../models/functionals/users_functionals')
const adsFunctionals = require('../models/functionals/ads_functionals')
const adsImagesFunctionals = require('../models/functionals/adsImages_functionals')
const categsFunctionals = require('../models/functionals/categories_functionals')

const getEditAdPage = (req, res, next) => {
    const id = parseInt(req.params.id, 10)

    sequelize.query(`
        SELECT "a".*,
            "i"."id" "imgId", "i"."filename", "i"."path"
        FROM "test_2"."ads" "a"
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
            console.log(data)
            return res.render('edit', { ad: data[0], images: data })
        })
        .catch(next)
}

const createImageByAdId = (req, res, next) => {
    const id = parseInt(req.params.id, 10)

    return Promise.each(req.files, el => {
        adsImagesFunctionals.createImage({
            filename: el.filename,
            path: el.path,
            adId: id
        })
    })
    .then(() => next())
    .catch(next)
}


const updateAd = (req, res, next) => {
    const id = parseInt(req.params.id, 10)
    
    adsFunctionals.findOneAd({ id: id })
        .then(ad => {
            if(!ad) {
                const err = `There is no ad with id ${id}`
                return res.render('error', { err: err })
            }

            if(req.user.id !== ad.userId) {
                req.flash('error_msg', 'Post cannot be edited since it does not belong to you.')
                return res.redirect(`/edit/${ad.id}`)
            }
            
            adsFunctionals.updateAd(req.body, { id: id })
                .then(() => {
                    req.flash('success_msg', 'Post updated successfully.')
                    return res.redirect('/account')
                })
        }) 
        .catch(next)   
}

module.exports = { getEditAdPage, updateAd, createImageByAdId }