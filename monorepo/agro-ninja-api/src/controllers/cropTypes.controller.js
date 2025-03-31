

const CropType = require("../models/index").CropTypes;
const Product = require("../models/index").Product;

const create = async (req, res, next) => {
  const _cropType = req.body;
  try {
    const newCropType = await CropType.create(_cropType);
   
    
    return res.status(201).send(newCropType);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

const find = async (req, res, next) => {
  try {
    let result;
    const _cropType = req.query;
    if (_cropType.cropId !== undefined) {
      result = await CropType.findAll({
        where: { cropId: _cropType.cropId },
      });
    } else if (_cropType.cropName !== undefined) {
      result = await Crops.findAll({
        where: { cropName: _cropType.cropName },
      });
    } else {
      result = await CropType.findAll({});
      return res.status(200).send(result);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const update = async (req, res, next) => {
  try {
    const cropTypeData = req.body;
   //  console.log(cropData)
    const updatedCroptType =  await Crops.update(cropData, {where: {id: cropTypeData.id}});
    // console.log("updated", updatedCrop)
    
    res.status(200).send({id: cropData.id}); //
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
    const result = await CropType.findAll({
      where: { id: id}
    
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
