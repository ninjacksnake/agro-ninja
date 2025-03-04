const { Op } = require("sequelize");
const Product = require("../models/index").Product;
const Dicease = require("../models/index").Dicease;
const DiceaseTypes = require("../models/index").DiceaseTypes;

const create = async (req, res, next) => {
  const DiceaseTypeInfo = req.body;
  try {
    const newDicease = await Dicease.create(DiceaseTypeInfo);
    return res.status(201).send(newDiceaseType);
  } catch (err) {
    console.log(err)
    return res.status(500).send(err.message);
  }
};

const find = async (req, res, next) => {
  try {
    let result;
    const values = req.query;
    if (values.Id !== undefined) {
      result = await Dicease.findAll({
        include:{model: DiceaseTypes},
        where: { id: values.productId },
      });
    } else if (values.name !== undefined) {
      result = await DiceaseTypes.findAll({
        include:{model: Products},
        where: { name: values.name },
      });

      res.status(200).send(result);
    } else {
      result = await DiceaseTypes.findAll({include:{model: Product}});
    }
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

const findById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const diceaseType = await DiceaseTypes.findByPk(id, {
      include: [{ model: diceaseType }],
      where: { id: id },
    });
    return res.status(200).send(diceaseType);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const update = async (req, res, next) => {
  try {
    const DiseaseTypeInfo = req.body;
    const diceaseType = await DiceaseType.findByPk( DiseaseTypeInfo.id );
    diceaseType.name = DiseaseTypeInfo.name;  
    diceaseType.description =  DiseaseTypeInfo.description;
    diceaseType.save();
    return res.status(200).send(diceaseType);
  } catch (err) {
    console.log(err)
    res.status(500).send(err.message);
  }
};

const remove = async (req, res, next) => {
  try {
    const diseaseType = req.body;
  } catch (err) {
    res.status(500).send(err.message);
  }
};


module.exports = {
  create,
  find,
  findById,
  update,
  remove,
};
