const { sequelize } = require('../configurations/dbConfig.js')

const users = require('./users')
const ads = require('./ads')
const categories = require('./categories')
const messages = require('./messages')

categories.hasOne(categories, { sourceKey:'id', targetKey: 'parentId', foreignKey: 'parentId', onDelete: 'cascade' });

users.hasMany(ads, { foreignKey: 'userId', onDelete: 'cascade' });
ads.belongsTo(users);

categories.hasMany(ads, { foreignKey: 'categoryId', onDelete: 'cascade' });
ads.belongsTo(categories);

users.hasMany(messages, { foreignKey: 'userId', onDelete: 'cascade' });
messages.belongsTo(users);

ads.hasMany(messages, { foreignKey: 'adId', onDelete: 'cascade' });
messages.belongsTo(ads);

users
    .sync({ alter: true })

ads
    .sync({ alter: true })

messages
    .sync({ alter: true })

categories
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
    //         // .then((result) => console.log(result))
    //         // .catch((err) => console.log(err))
    // })
    .then((result) => {
        console.log('Synced: ' + result)
    })
    .catch((err) => {
        console.log('Not Synced: ' + err)
    })


module.exports = { users, ads, categories, messages }