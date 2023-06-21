const sequelize = require('../utils/services/db_services');
const Categories = require('./categories');
const Product = require('./products');
const Dicease = require('./diceases');
const Chemical = require('./chemicals');


const sync = () => sequelize.sync({force: true});

const models = {
    sync,
    Categories,
    Product,
    Dicease,
    Chemical,
}
 
Product.belongsToMany(Chemical, {through: 'ProductChemicals'});
Chemical.belongsToMany(Product, {through: 'ProductChemicals'});
Dicease.belongsToMany(Product, {through: 'diceaseProducts'});
Product.belongsToMany(Dicease, {through: 'diceaseProducts'});

module.exports = models;