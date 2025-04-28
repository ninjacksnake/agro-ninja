const { Op } = require("sequelize");
const  Crop  = require("../models/index").Crop;
const Diseases = require("../models/index").Disease;
const Product = require("../models/index").Product;
const Chemical = require("../models/index").Chemical;
const Categories = require("../models/index").Categories ;

const product = {
  name: "cloroPan",
  description: "cloro con pan",
  type: "loqueras",
  chemicals: ["cloro2", "harina"],
};

const create = async (req, res, next) => {
  const product = req.body;
   console.log("INSERTING ",product)
  try {
    const newProduct = await Product.create(product);
    const category = await Categories.findByPk(product.categoryId);
    await newProduct.setCategory(category);
    const chemicals = await Chemical.findAll({
      where: { name: [...product.chemicals] },
    });
    await newProduct.addChemicals(chemicals);
    const diceases = await Diseases.findAll({
      where: { name: [...product.diceases] },
    });
    await newProduct.addDiseases(diceases);
    if (product.crops === undefined) {
      product.crops = [];
    }
    const crops = await Crop.findAll({
      where: { id: [...product.crops] },
    });
    await newProduct.addCrops(crops);
    return res.status(201).send(newProduct);
  } catch (err) {
    console.log(err);
    if (err.name === "SequelizeUniqueConstraintError")
      return res.status(500).send(err.errors[0].message);
    return res.status(500).send(err.message);
  }
};

const update = async (req, res, next) => {
  try {
    const productInfo = req.body;
    console.log("PRODUCT INFO WAIT ::::::",productInfo);
    const product = await Product.findByPk(productInfo.id);
    product.name = productInfo.name;
    product.categoryId = productInfo.categoryId;
    product.description = productInfo.description;
    product.photo = productInfo.photo;
    product.dossage = productInfo.dossage;
    product.category = productInfo.category;
    

    const chemicals = await Chemical.findAll({
      where: { name: [...productInfo.chemicals] },
    });
    if(productInfo.diseases === undefined ){
      productInfo.crops = [];
    }
    const diseases = await Diseases.findAll({
      where: { name: [...productInfo.diseases] },
    });
    if(productInfo.crops === undefined ){
      productInfo.crops = [];
    }
    const crops = await Crop.findAll({
      where: { id: [...productInfo.crops] },
    });
    console.log(crops);
    await product.setChemicals(chemicals);
    await product.setDiseases(diseases);
    await product.setCrops(crops);
    await product.save();
    await Product.findByPk(productInfo.id, {
      include: [{ model: Chemical }, { model: Diseases }, { model: Categories }, {model: Crop }],
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
        include: [{ model: Chemical }, { model: Diseases }, { model: Categories }, { model: Crop }],
        where: { productId: product.productId },
      });
    } else if (product.productName !== undefined) {
      result = await Product.findAll({
        include: [{ model: Chemical }, { model: Diseases }, { model: Categories }, { model: Crop }],
        where: { productName: product.productName },
      });
    } else {
      result = await Product.findAll({
        include: [{ model: Chemical }, { model: Diseases }, { model: Categories },  { model: Crop }],
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
      include: [{ model: Chemical }, { model: Diseases }, { model: Categories }, { model: Crop }],
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
