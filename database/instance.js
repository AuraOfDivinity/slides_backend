const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
  process.env.RDS_DATABASE,
  process.env.RDS_USERNAME,
  process.env.RDS_PASSWORD,
  {
    host: process.env.RDS_HOST,
    dialect: 'mysql'
  }
);

const db = {}

db.Slides = require('./models/slides')(sequelize, Sequelize)
db.sequelize = sequelize


module.exports = db
