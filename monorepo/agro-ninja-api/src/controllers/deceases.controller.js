const { Op } = require("sequelize");
const Product = require("../models/index").Product;
const Decease = require("../models/index").Decease;

const create = async (req, res, next) => {
  const deceaseInfo = req.body;
  try {
    const newDecease = await Decease.create(deceaseInfo);
    const product = await Product.findAll({
      where: { name:{ [Op.in]: deceaseInfo.products} },
    });
  
    await newDecease.addProducts(product);
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
    const updatedDecease = await Decease.update(
      { name: decease.name, description: decease.description },
      { where: { id: decease.id } }
    );
    const products = await Products.findAll({
      where: { name: { [Op.in]: decease.products } },
    });
    await updatedDecease[0].setProductss(products);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const remove = async (req, res, next) => {
  try {
    const product = req.body;
    // Product.create({}, {});
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
