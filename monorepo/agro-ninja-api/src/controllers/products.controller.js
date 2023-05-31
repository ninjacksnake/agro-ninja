const { Op } = require("sequelize");
const Deceases = require("../models/index").Decease;
const Product = require("../models/index").Product;
const Chemical = require("../models/index").Chemical;

const product = {
  name: "cloroPan",
  description: "cloro con pan",
  type: "loqueras",
  chemicals: ["cloro2", "harina"],
};

const create = async (req, res, next) => {
  const product = req.body;
  try {
    const newProduct = await Product.create(product);
    const chemicals = await Chemical.findAll({
      where: { name: [...product.chemicals] },
    });
    await newProduct.addChemicals(chemicals);
    return res.status(201).send(newProduct);
  } catch (err) {
    return res.status(500).send(err.message500);
  }
};

const find = async (req, res, next) => {
  try {
    let result;
    const product = req.query;
    if (product.productId !== undefined) {
      result = await Product.findAll({
        include: [{ model: Chemical }, { model: Deceases }],
        where: { productId: product.productId },
      });
    } else if (product.productName !== undefined) {
      result = await Product.findAll({
        include: [{ model: Chemical }, { model: Deceases }],
        where: { productName: product.productName },
      });
    } else {
      result = await Product.findAll({
        include: [{ model: Chemical }, { model: Deceases }],
      });
      return res.status(200).send(result);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const update = async (req, res, next) => {
  try {
    const product = req.body;
    // console.log(product);
    const isUpdated = await Product.update(
      product ,
      { where: { id: product.id } }
    );
    const chemicals = await Chemical.findAll({
      where: { name: { [Op.in]: product.chemicals } },
    });
   if(isUpdated){
    let updatedProduct = await Product.findByPk(product.id, {include: {model: Chemical}});
    await updatedProduct.setChemicals(chemicals);
    await Product.findByPk(product.id, {include: {model: Chemical}});
    res.status(200).send(updatedProduct);
   }
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

const remove = async (req, res, next) => {
  try {
    const product = req.body;
    Product.create({}, {});
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
