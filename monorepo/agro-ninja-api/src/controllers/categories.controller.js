const Categories = require("../models/index").Categories;
const Product= require("../models/index").Product;

const create = async (req, res, next) => {
  try {
  const categorieData = req.body;
    const newCategory = Categories.create(categorieData, {});
  } catch (error) {
    console.log(error)
    res.status(500).send(error.message);
  }
};

const findBy = async (req, res, next) => {
  try {
  const categorieData = req.body;
    const newCategory = Categories.create(categorieData, {});
  } catch (error) {
    console.log(error)
    res.status(500).send(error.message);
  }
};

const update = async (req, res, next) => {
  try {
  const categorieData = req.body;
    const newCategory = Categories.create(categorieData, {});
  } catch (error) {
    console.log(error)
    res.status(500).send(error.message);
  }
};

const remove = async (req, res, next) => {
  try {
  const categorieData = req.body;
    const newCategory = Categories.create(categorieData, {});
  } catch (error) {
    console.log(error)
    res.status(500).send(error.message);
  }
};
