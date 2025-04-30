require('dotenv').config();
const sequelize = require('../utils/services/db_services');
const Categories = require('./categories');
const Product = require('./products');
const Disease = require('./diseases');
const DiseaseType = require('./diseaseTypes');
const Chemical = require('./chemicals');
const ChemicalTypes = require('./chemicalTypes');
const Crop = require('./crops');
const CropTypes = require('./cropTypes');
const CropStage = require('./cropStages');
const User = require('./user');

// Move all seed data to a separate file or keep it at the top
const { cropTypesData, categoriesData, chemicalTypesData, diseaseClassification, defaultUser } = require('./seedData');

const models = {
  sync: () => sequelize.sync({ 
    force: process.env.NODE_ENV !== 'production',
    alter: process.env.NODE_ENV === 'development'
  }),
  Categories,
  Product,
  Disease,
  Chemical,
  Crop,
  CropTypes,
  CropStage,
  DiseaseType,
  ChemicalTypes,
  User,
};

// Many-to-Many Relationships
Product.belongsToMany(Chemical, { 
  through: 'ProductChemicals',
  as: 'chemicals',
  onDelete: 'CASCADE'
});
Chemical.belongsToMany(Product, { 
  through: 'ProductChemicals',
  as: 'products',
  onDelete: 'CASCADE'
});

Disease.belongsToMany(Product, { 
  through: 'DiseaseProducts',
  as: 'products',
  onDelete: 'CASCADE'
});
Product.belongsToMany(Disease, { 
  through: 'DiseaseProducts',
  as: 'diseases',
  onDelete: 'CASCADE'
});

Disease.belongsToMany(CropStage, { 
  through: 'cropStageDisease',
  as: 'cropStages',
  onDelete: 'CASCADE'
});
CropStage.belongsToMany(Disease, { 
  through: 'cropStageDisease',
  as: 'diseases',
  onDelete: 'CASCADE'
});

Crop.belongsToMany(Chemical, { 
  through: 'CropChemicals',
  as: 'chemicals',
  onDelete: 'CASCADE'
});
Chemical.belongsToMany(Crop, { 
  through: 'CropChemicals',
  as: 'crops',
  onDelete: 'CASCADE'
});

Crop.belongsToMany(Disease, { 
  through: 'CropDiseases',
  as: 'diseases',
  onDelete: 'CASCADE'
});
Disease.belongsToMany(Crop, { 
  through: 'CropDiseases',
  as: 'crops',
  onDelete: 'CASCADE'
});

Product.belongsToMany(Crop, { 
  through: 'CropProducts',
  as: 'crops',
  onDelete: 'CASCADE'
});
Crop.belongsToMany(Product, { 
  through: 'CropProducts',
  as: 'products',
  onDelete: 'CASCADE'
});

// One-to-Many Relationships
Product.belongsTo(Categories, {
  as: 'category',
  onDelete: 'RESTRICT'
});
Categories.hasMany(Product, {
  as: 'products'
});

Chemical.belongsTo(ChemicalTypes, {
  as: 'chemicalType',
  onDelete: 'RESTRICT'
});
ChemicalTypes.hasMany(Chemical, {
  as: 'chemicals'
});

Disease.belongsTo(DiseaseType, {
  foreignKey: 'diseaseTypeId',
  as: 'diseaseType',
  onDelete: 'RESTRICT'
});
DiseaseType.hasMany(Disease, { 
  foreignKey: 'diseaseTypeId',
  as: 'diseases'
});

Crop.belongsTo(CropTypes, {
  foreignKey: 'cropTypeId',
  as: 'cropType',
  onDelete: 'RESTRICT'
});
CropTypes.hasMany(Crop, {
  foreignKey: 'cropTypeId',
  as: 'crops'
});

// One-to-One Relationships
Crop.belongsTo(CropStage, {
  as: 'cropStage',
  onDelete: 'RESTRICT'
});
CropStage.hasOne(Crop, {
  as: 'crop'
});

// Database Initialization
if (process.env.INITDB === "true" && process.env.NODE_ENV !== 'production') {
  console.log('Initializing database...');
  const timestamp = new Date();
  
  Promise.all([
    Categories.bulkCreate(categoriesData.map(item => ({ ...item, createdAt: timestamp, updatedAt: timestamp }))),
    CropTypes.bulkCreate(cropTypesData.map(item => ({ ...item, createdAt: timestamp, updatedAt: timestamp }))),
    DiseaseType.bulkCreate(diseaseClassification.map(item => ({ ...item, createdAt: timestamp, updatedAt: timestamp }))),
    ChemicalTypes.bulkCreate(chemicalTypesData.map(item => ({ ...item, createdAt: timestamp, updatedAt: timestamp }))),
    User.bulkCreate(defaultUser)
  ])
    .then(() => console.log('Database initialized successfully'))
    .catch(err => {
      console.error('Error initializing database:', err);
      process.exit(1);
    });
}

module.exports = models;