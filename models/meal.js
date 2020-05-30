const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Meal = sequelize.define('meal', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  type: Sequelize.STRING,
  date: Sequelize.DATEONLY,
  time: Sequelize.TIME,
  desc: Sequelize.TEXT
});

module.exports = Meal;
