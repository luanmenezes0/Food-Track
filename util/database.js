const Sequelize = require('sequelize').Sequelize

const sequelize = new Sequelize(
    'food-track',
    'root',
    'luan9999',
    { dialect: 'mysql', host: 'localhost' }
);

module.exports = sequelize;