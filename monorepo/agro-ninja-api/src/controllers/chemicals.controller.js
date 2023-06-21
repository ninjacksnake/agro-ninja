const Chemical = require("../models/index").Chemical;
const Product = require("../models/index").Product;


// create a new record in the database
const create = async (req, res, next) => {
  try {
    const chemical = req.body;
    const newChemical = await Chemical.create(chemical);
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
      chemical = await Chemical.findAll({ where: { name: req.query.name } });
    } else if (req.query.id) {
      chemical = await Chemical.findAll({ where: { name: req.query.id } });
    } else {
      chemical = await Chemical.findAll({ include: {model: Product} });
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
