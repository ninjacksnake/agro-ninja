const { Op } = require("sequelize");
const Product = require("../models/index").Product;
const Decease = require("../models/index").Decease;

const create = async (req, res, next) => {
  const deceaseInfo = req.body;
  try {
    const newDecease = await Decease.create(deceaseInfo);
    return res.status(201).send(newDecease);
  } catch (err) {
    console.log(err)
    return res.status(500).send(err.message500);
  }
};

const find = async (req, res, next) => {
  try {
    let result;
    const decease = req.query;
    if (decease.Id !== undefined) {
      result = await Decease.findAll({
        include:{model: Products},
        where: { id: decease.productId },
      });
    } else if (decease.name !== undefined) {
      result = await Decease.findAll({
        include:{model: Products},
        where: { name: decease.name },
      });
      res.status(200).send(result);
    } else {
      result = await Decease.findAll({include:{model: Product}});
    }
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const update = async (req, res, next) => {
  try {
    const decease = req.body;
    console.log(decease);
    const updatedDecease = await Decease.update(
      { name: decease.name, description: decease.description, photo: decease.photo  },
      { where: { id: decease.id } }
    );
    return res.status(200).send(updatedDecease);
  } catch (err) {
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
  update,
  remove,
};
