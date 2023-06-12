const Categories = require("../models/index").Categories;
const Product = require("../models/index").Product;

const create = async (req, res, next) => {
  try {
    const categorieData = req.body;
    const newCategory = Categories.create(categorieData, {});
    return res.status(201).send(newCategory);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

const find = async (req, res, next) => {
  try {
    let result;
    const category = req.query;
    if (category.categoryId !== undefined) {
      result = await Categories.findAll({
        where: { categoryId: category.categoryId },
      });
    } else if (category.categoryName !== undefined) {
      result = await Categories.findAll({
        where: { categoryName: category.categoryName },
      });
    } else {
      result = await Categories.findAll({});
      return res.status(200).send(result);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const update = async (req, res, next) => {
  try {
    const categorieData = req.body;
    const updatedCategory = Categories.create(categorieData);
    res.status(200).send(updatedCategory); //
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

const remove = async (req, res, next) => {
  try {
    const categorieData = req.body;
    const newCategory = Categories.create(categorieData, {});
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};
module.exports = {
  create,
  update,
  find,
  remove,
};
