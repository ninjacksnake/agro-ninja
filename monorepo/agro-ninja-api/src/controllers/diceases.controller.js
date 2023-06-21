const { Op } = require("sequelize");
const Product = require("../models/index").Product;
const Dicease = require("../models/index").Dicease;


const create = async (req, res, next) => {
  const DiceaseInfo = req.body;
  try {
    const newDicease = await Dicease.create(DiceaseInfo);
    return res.status(201).send(newDicease);
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
        include:{model: Products},
        where: { id: values.productId },
      });
    } else if (values.name !== undefined) {
      result = await Dicease.findAll({
        include:{model: Products},
        where: { name: values.name },
      });

      res.status(200).send(result);
    } else {
      result = await Dicease.findAll({include:{model: Product}});
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
    const dicease = await Dicease.findByPk(id, {
      include: [{ model: Product }],
      where: { id: id },
    });
    return res.status(200).send(dicease);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const update = async (req, res, next) => {
  try {
    const DiceaseInfo = req.body;
    const dicease = await Dicease.findByPk( DiceaseInfo.id );
    dicease.name = DiceaseInfo.name;  
    dicease.description =  DiceaseInfo.description;
    dicease.photo= DiceaseInfo.photo;
    dicease.save();
    return res.status(200).send(dicease);
  } catch (err) {
    console.log(err)
    res.status(500).send(err.message);
  }
};

const remove = async (req, res, next) => {
  try {
    const product = req.body;
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
