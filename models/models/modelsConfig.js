const { sequelize } = require('../../configurations/dbConfig')

const users = require('./users')
const ads = require('./ads')
const categories = require('./categories')
const messages = require('./messages')
const ads_images = require('./adsImages')

categories.hasMany(categories, { sourceKey:'id', targetKey: 'parentId', foreignKey: 'parentId', onDelete: 'cascade' });

users.hasMany(ads, { foreignKey: 'userId', onDelete: 'cascade' });
ads.belongsTo(users);

categories.hasMany(ads, { foreignKey: 'categoryId', onDelete: 'cascade' });
ads.belongsTo(categories);

ads.hasMany(ads_images, { foreignKey: 'adId', onDelete: 'cascade' });
ads_images.belongsTo(ads);

messages.hasMany(messages, { sourceKey:'id', targetKey: 'conversationId', foreignKey: 'conversationId', onDelete: 'cascade' });

users.hasMany(messages, { foreignKey: 'userId', onDelete: 'cascade' });
messages.belongsTo(users);

ads.hasMany(messages, { foreignKey: 'adId', onDelete: 'cascade' });
messages.belongsTo(ads);

sequelize
    .sync({ alter: true })
    // .then(() => {
    //     const data = [
    //         { name: 'Services' },
    //         { name: 'Household' },
    //         { name: 'education', parentId: 1 },
    //         { name: 'events', parentId: 1 },
    //         { name: 'furniture', parentId: 2 },
    //         { name: 'internal items', parentId: 2 },
    //         { name: 'other', parentId: 2 }
    //     ]

    //     return categories.bulkCreate(data)
    //         // .catch((err) => console.log(err))
    // })
    .then((result) => {
        console.log('Synced: ' + result)
    })
    .catch((err) => {
        console.log('Not Synced: ' + err)
    })


module.exports = {
    users,
    ads,
    categories,
    ads_images,
    messages
}