const { Op } = require("sequelize");
const Diceases = require("../models/index").Dicease;
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
    const diceases = await Diceases.findAll({
      where: { name: [...product.diceases] },
    });
    await newProduct.addDiceases(diceases);
    return res.status(201).send(newProduct);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
};

const update = async (req, res, next) => {
  try {
    const productInfo = req.body;
    const product = await Product.findByPk(productInfo.id);
    product.name = productInfo.name;
    product.description = productInfo.description;
    product.photo = productInfo.photo;
    product.price = productInfo.price;
    product.category = productInfo.category;

    const chemicals = await Chemical.findAll({ 
      where: { name: [...productInfo.chemicals] },
    });
    const diceases = await Diceases.findAll({
      where: { name: [...productInfo.diceases] },
    });
    await product.setChemicals(chemicals);
    await product.setDiceases(diceases);
    await product.save();
    await Product.findByPk(productInfo.id, {
      include: [{ model: Chemical }, { model: Diceases }],
    });
    res.status(200).send(product);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

const find = async (req, res, next) => {
  try {
    let result;
    const product = req.query;
    if (product.productId !== undefined) {
      result = await Product.findAll({
        include: [{ model: Chemical }, { model: Diceases }],
        where: { productId: product.productId },
      });
    } else if (product.productName !== undefined) {
      result = await Product.findAll({
        include: [{ model: Chemical }, { model: Diceases }],
        where: { productName: product.productName },
      });
    } else {
      result = await Product.findAll({
        include: [{ model: Chemical }, { model: Diceases }],
      });
      return res.status(200).send(result);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

const findById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await Product.findByPk(id, {
      include: [{ model: Chemical }, { model: Diceases }],
      where: { productId: product.productId },
    });
    return res.status(200).send(result);
  } catch (err) {
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
  findById,
};
