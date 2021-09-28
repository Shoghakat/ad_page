const { sequelize } = require('../../configurations/dbConfig')

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


const getAdsByCategId = (id, limit, offset) => {
    return sequelize.query(`
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
        WHERE c."parentId" = :c_id
        LIMIT ${limit}
        OFFSET ${offset}`,
        {
            replacements: {
                c_id: id
            },
            type: sequelize.QueryTypes.SELECT
        }
    )
}


const getUserMessagesById = (id) => {
    return sequelize.query(`
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
            replacements: { u_id: id },
            type: sequelize.QueryTypes.SELECT
        }
    )
}


const getSubcategoryByCategId = (id) => {
    return sequelize.query(`
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
            replacements: { c_id: id },
            type: sequelize.QueryTypes.SELECT
        }
    )
}


const getNumberOfAdImages = (id) => {
    return sequelize.query(`
        SELECT COUNT(*)
        FROM test_2.ads_images
        GROUP BY "adId"
        HAVING "adId" = :ad_id`,
        {
            replacements: { ad_id: id },
            type: sequelize.QueryTypes.SELECT
        }
    )
}


module.exports = {
    getUserAdsAndImageById,
    getUserAdsById,
    getAdsByCategId,
    getUserMessagesById,
    getSubcategoryByCategId,
    getNumberOfAdImages
}