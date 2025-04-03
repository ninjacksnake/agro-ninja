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


const sync = () => sequelize.sync({force: true});

const models = {
    sync,
    Categories,
    Product,
    Disease,
    Chemical,
    Crop,
    CropTypes,
    CropStage,
    DiseaseType,
    ChemicalTypes,
}
 
// Many-to-Many Relationships
Product.belongsToMany(Chemical, { through: 'ProductChemicals' });
Chemical.belongsToMany(Product, { through: 'ProductChemicals' });

Disease.belongsToMany(Product, { through: 'DiseaseProducts' });
Product.belongsToMany(Disease, { through: 'DiseaseProducts' });

// Disease.belongsToMany(Crop, { through: 'DiseaseCrops' });
// Crop.belongsToMany(Disease, { through: 'DiseaseCrops' });

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
Categories.hasMany(Product, {  foreignKey: 'id'});

// Many-to-One Relationships
Chemical.belongsTo(ChemicalTypes);
ChemicalTypes.hasMany(Chemical, {  foreignKey: 'id'});

Crop.belongsTo(CropTypes);
CropTypes.hasMany(Crop);

// One to One Relationships
Crop.belongsTo(CropStage);
CropStage.hasOne(Crop);

DiseaseType.hasMany(Disease, {  foreignKey: 'diseaseTypeId'});
Disease.belongsTo(DiseaseType);



const cropTypesData = [
    {
        name: "Cereales",
        description: "Cultivos cuya semilla se usa para la producción de harina y alimentos básicos.",
      
      },
      {
        name: "Leguminosos",
        description: "Plantas ricas en proteínas, utilizadas en la alimentación humana y animal.",
       
      },
      {
        name: "Hortícolas",
        description: "Hortalizas y vegetales cultivados para consumo fresco o procesado.",
        
      },
      {
        name: "Frutales",
        description: "Árboles o arbustos que producen frutos comestibles.",
        
      },
      {
        name: "Oleaginosos",
        description: "Cultivos utilizados para la extracción de aceites vegetales.",
        
      },
      {
        name: "Tuberosos",
        description: "Plantas que almacenan nutrientes en raíces o tubérculos subterráneos.",
        
      },
      {
        name: "Raices",
        description: "Plantas que almacenan nutrientes en raíces o tubérculos subterráneos.",
       
      },
      {
        name: "Industriales",
        description: "Cultivos utilizados en la producción de bienes no alimentarios.",
        examples: ["Algodón", "Caña de azúcar", "Tabaco", "Café", "Cacao", "Lúpulo"]
      },
      {
        name: "Forrajeros",
        description: "Cultivos destinados a la alimentación del ganado.",
        examples: ["Alfalfa", "Trébol", "Pasto elefante", "Sorgo forrajero", "Maíz forrajero"]
      },
      {
        name: "Energéticos",
        description: "Cultivos usados para la producción de biocombustibles.",
        
      },
      {
        name: "Medicinales y aromáticos",
        description: "Plantas utilizadas para fines terapéuticos o cosméticos.",
        
      },
      {
        name: "aromáticos",
        description: "Plantas utilizadas para fines terapéuticos o cosméticos.",
        
      }
];

const categoriesData = [
    {
        name: "Fungicidas",
        description:  "Que atacan los hongos en los cultivos.",

      },
      {
        name: "Bactericidas",
        description: "Que atacan las bacterias en los cultivos.",
      },
      {
          name: "Viricidas",
          description: "Que atacan las virus en los cultivos.",
      },
      {
          name: "Insecticidas",
          description: "Que atacan las insectos en los cultivos.",
      },
      {
          name: "Herbicidas",
          description: "Que atacan las plantas en los cultivos.",
      },
      {
          name: "Nematicidas",
          description: "Que atacan los Nematodos en los cultivos.",
      }    
]

const chemicalTypesData = [
    {
        name: "Moleculares",
        description:  "Gas que se aplica a las plantas.",
      },
      {
        name: "Gas",
        description: "Que es aplicado a los cultivos.",
      },
      {
          name: "liquidos",
          description: "Que se vierte en los cultivos.",      
      },
      {
          name: "solidos",
          description: "Que se ponen en los cultivos.",
      }
]

const diseaseClassification = [
    {
        name: "Plagas",
        description: "Que atacan las plantas en los cultivos.",
    },
    {
        name: "Bacterias",
        description: "Que atacan las plantas en los cultivos.",
    },
    {
      name: "Virus",
      description: "Que atacan las plantas en los cultivos.",
        
    },
    {
      name: "Insectos",
      description: "Que atacan las plantas en los cultivos.",

    },
    {
      name: "Nematodos",
      description: "Que atacan las plantas en los cultivos.",
    },
    {
      name: "Hongos",
      description: "Que atacan las plantas en los cultivos.",
    },
  ]


//  Categories.bulkCreate(categoriesData);
//  CropTypes.bulkCreate(cropTypesData);
//  DiseaseType.bulkCreate(diseaseClassification);
//  ChemicalTypes.bulkCreate(chemicalTypesData);



module.exports = models;