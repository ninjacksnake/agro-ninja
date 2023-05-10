const sequelize = require('../utils/services/db_services');
const Categories = require('./categories');
const Product = require('./products');
const Decease = require('./deceases');
const Chemical = require('./chemicals');
//const Decease_products = require('./decease_products');
//const Product_chemicals = require('./product_chemicals');

const sync = () => sequelize.sync({force: true});

const models = {
    sync,
    Categories,
    Product,
    Decease,
    Chemical,
    //Decease_products,
    //Product_chemicals
}
Product.belongsToMany(Chemical, {through: 'ProductChemicals'})
Chemical.belongsToMany(Product, {through: 'ProductChemicals'})
Decease.belongsToMany(Product, {through: 'DeceaseProducts'})
Product.belongsToMany(Decease, {through: 'DeceaseProducts'})


module.exports = models;