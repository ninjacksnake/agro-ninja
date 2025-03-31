
const Chemical = require("../models/index").Chemical;
const ChemicalTypes  = require("../models/index").ChemicalTypes;
const Product = require("../models/index").Product;


// create a new record in the database
const create = async (req, res, next) => {
  try {
    const chemical = req.body;
    if (chemical.photo == null || chemical.photo == undefined || chemical.photo == "") {
      res.status(400).send({
        message: "photo can not be empty",
      });
    }
    const chemicalType = await ChemicalTypes.findByPk(chemical.chemicalTypeId);
    const newChemical = await Chemical.create(chemical);
    newChemical.chemicalTypeId = chemicalType.id;
    await newChemical.save(); // Save the newChemical instance

    res.status(200).send(newChemical);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

//
const find = async (req, res, next) => {
  try {
    let chemical;
    if (req.query.name) {
      chemical = await Chemical.findAll({ where: { name: req.query.name }, include: {model: ChemicalTypes}  });
    } else if (req.query.id) {
      chemical = await Chemical.findAll({ where: { name: req.query.id }, include: {model: ChemicalTypes} });
    } else {
      chemical = await Chemical.findAll({ include: {model: Product} , include: {model: ChemicalTypes} });
    }
    res.status(200).send(chemical);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

const findById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await Chemical.findByPk(id, {
      include: [{ model: Product }],
      where: { id: id },
    });
    return res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

//
const update = async (req, res, next) => {
  try {
    const chemicalData = req.body;
    if (chemicalData.photo == null || chemicalData.photo == undefined || chemicalData.photo == "") {
       chemicalData.photo = undefined; // set the photo to undefined if it is null or undefined or empty string   
    }
    const updatedChemical = await Chemical.update(chemicalData, {
      where: { id: chemicalData.id },
    });
    res.status(200).send(updatedChemical);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

//
const remove = async (req, res, next) => {
  try {
    const newChemical = await Chemical.create({}, {});
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

module.exports = {
  create,
  update,
  find,
  remove,
  findById
};
