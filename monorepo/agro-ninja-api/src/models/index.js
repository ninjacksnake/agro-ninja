const sequelize = require('../utils/services/db_services');
const Categories = require('./categories');
const Product = require('./products');
const Disease = require('./diceases');
const DiseaseType = require('./diceaseTypes');
const Chemical = require('./chemicals');
const Crop = require('./crops');
const CropType = require('./cropTypes');
const CropStage = require('./cropStages');


const sync = () => sequelize.sync({force: true});

const models = {
    sync,
    Categories,
    Product,
    Disease,
    Chemical,
    Crop,
    CropType,
    CropStage,
    DiseaseType
}
 
// Many-to-Many Relationships
Product.belongsToMany(Chemical, { through: 'ProductChemicals' });
Chemical.belongsToMany(Product, { through: 'ProductChemicals' });

Disease.belongsToMany(Product, { through: 'DiseaseProducts' });
Product.belongsToMany(Disease, { through: 'DiseaseProducts' });

Disease.belongsToMany(Crop, { through: 'DiseaseCrops' });
Crop.belongsToMany(Disease, { through: 'DiseaseCrops' });

Disease.belongsToMany(CropStage, { through: 'cropStageDisease' });
CropStage.belongsToMany(Disease, { through: 'cropStageDisease' });

Crop.belongsToMany(Chemical, { through: 'CropChemicals' });
Chemical.belongsToMany(Crop, { through: 'CropChemicals' });

Crop.belongsToMany(Disease, { through: 'CropDiseases' });
Disease.belongsToMany(Crop, { through: 'CropDiseases' });


Product.belongsToMany(Crop, { through: 'CropProducts' });
Crop.belongsToMany(Product, { through: 'CropProducts' });

// One-to-Many Relationships
Product.belongsTo(Categories);
Categories.hasMany(Product);

Crop.belongsTo(CropType);
CropType.hasMany(Crop);



module.exports = models;