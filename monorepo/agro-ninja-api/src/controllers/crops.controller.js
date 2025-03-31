const { where } = require("sequelize");

const Crops = require("../models/index").Crop;
const Product = require("../models/index").Product;
const Disease = require("../models/index").Disease;

const create = async (req, res, next) => {
  const crop = req.body;
  console.log(crop)
  try {
    const newCrop = await Crops.create(crop);
    if (req.body.products !== undefined) {
      const products = await Product.findAll({
        where: { id: [...crop.products] },
      });
      await newCrop.addProducts(products);
    }
 
    if (req.body.diseases !== undefined) {
      const diseases = await Disease.findAll({
        where: { id: [...crop.diseases] },
      });
      await newCrop.addDiseases(diseases);
    }


    return res.status(201).send(newCrop);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

const find = async (req, res, next) => {
  try {
    let result;
    const crop = req.query;
    if (crop.cropId !== undefined) {
      result = await Crops.findAll({
        include: [{ model: Product }, { model: Disease }],
        where: { cropId: crop.cropId },
      });
    } else if (crop.cropName !== undefined) {
      result = await Crops.findAll({
        where: { cropName: crop.cropName },
      });
    } else {
      result = await Crops.findAll({});
      return res.status(200).send(result);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const update = async (req, res, next) => {
  try {
    const cropData = req.body;
    console.log(cropData)
    const updatedCrop = await Crops.update(cropData, { where: { id: cropData.id } });
    // console.log("updated", updatedCrop)

    res.status(200).send({ id: cropData.id }); //
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

const remove = async (req, res, next) => {
  try {
    const cropData = req.body;
    const newCrop = Crops.update(cropData, {});
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};


const findById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await Crops.findAll({
      include: [{ model: Product }, { model: Disease }],
      where: { id: id }

    });
    return res.status(200).send(result);
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
  findById,
};
