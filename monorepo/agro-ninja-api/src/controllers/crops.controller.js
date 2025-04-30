const { where } = require("sequelize");
const { Crop, Product, Disease, CropTypes } = require("../models/index");

// Constants for common includes
const DEFAULT_INCLUDES = [
  { model: Product, as: 'products' },
  { model: Disease, as: 'diseases' },
  { model: CropTypes, as: 'cropType' }
];

// Helper function for error responses
const handleError = (res, error) => {
  console.error('Error:', error);
  return res.status(500).send(error.message);
};

const create = async (req, res) => {
  try {
    const crop = req.body;
    const newCrop = await Crop.create(crop);

    // Handle products association
    if (crop.products?.length) {
      const products = await Product.findAll({
        where: { id: crop.products }
      });
      await newCrop.addProducts(products);
    }

    // Handle diseases association
    if (crop.diseases?.length) {
      const diseases = await Disease.findAll({
        where: { id: crop.diseases }
      });
      await newCrop.addDiseases(diseases);
    }

    return res.status(201).send(newCrop);
  } catch (error) {
    return handleError(res, error);
  }
};

const find = async (req, res) => {
  try {
    const { cropId, cropName } = req.query;
    const queryOptions = {
      include: DEFAULT_INCLUDES
    };

    if (cropId) {
      queryOptions.where = { cropId };
    } else if (cropName) {
      queryOptions.where = { cropName };
    }

    const result = await Crop.findAll(queryOptions);
    return res.status(200).send(result);
  } catch (error) {
    return handleError(res, error);
  }
};

const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Crop.findByPk(id, {
      include: DEFAULT_INCLUDES
    });

    if (!result) {
      return res.status(404).send({ message: 'Crop not found' });
    }

    return res.status(200).send(result);
  } catch (error) {
    return handleError(res, error);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const cropData = req.body;
    const crop = await Crop.findByPk(id);

    if (!crop) {
      return res.status(404).send({ message: 'Crop not found' });
    }

    await crop.update(cropData);

    // Handle products association
    if (cropData.products !== undefined) {
      const products = await Product.findAll({
        where: { id: cropData.products }
      });
      await crop.setProducts(products);
    }

    // Handle diseases association
    if (cropData.diseases !== undefined) {
      const diseases = await Disease.findAll({
        where: { id: cropData.diseases }
      });
      await crop.setDiseases(diseases);
    }

    const updatedCrop = await Crop.findByPk(cropData.id, {
      include: DEFAULT_INCLUDES
    });

    return res.status(200).send(updatedCrop);
  } catch (error) {
    return handleError(res, error);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Crop.destroy({
      where: { id }
    });

    if (!result) {
      return res.status(404).send({ message: 'Crop not found' });
    }

    return res.status(200).send({ message: 'Crop deleted successfully' });
  } catch (error) {
    return handleError(res, error);
  }
};

module.exports = {
  create,
  find,
  update,
  remove,
  findById
};
