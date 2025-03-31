const { Op } = require("sequelize");
const Product = require("../models/index").Product;
const Disease = require("../models/index").Disease;
const diseaseType = require("../models/index").DiseaseType;

const create = async (req, res, next) => {
  const diseaseInfo = req.body;
  console.log(diseaseInfo);
  try {
const newDisease = new Disease;
newDisease.name = diseaseInfo.name;
newDisease.description = diseaseInfo.description;
newDisease.photo = diseaseInfo.photo;
newDisease.diseaseTypeId = diseaseInfo.diseaseTypeId;

    // const newdisease = await Disease.create(diseaseInfo);
    // const diseaseType = await diseaseType.findByPk(diseaseInfo.diseaseTypeId);
    // console.log(diseaseType);
    // newdisease.diseaseType = diseaseType;
     newDisease.save();
     return res.status(201).send(newDisease);
  } catch (err) {
    console.log(err)
    return res.status(500).send(err.message);
  }
};

const find = async (req, res, next) => {
  try {
    let result;
    const values = req.query;
    if (values.Id !== undefined) {
      result = await Disease.findAll({
        include:{model: Product},
        include:{model: diseaseType},
        where: { id: values.productId },
      });
    } else if (values.name !== undefined) {
      result = await Disease.findAll({
        include:{model: Products},
        include:{model: diseaseType},
        where: { name: values.name },
      });

      res.status(200).send(result);
    } else {
      result = await Disease.findAll({include:{model: Product}, include:{model: diseaseType}});
    }
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

const findById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const disease = await Disease.findByPk(id, {
      include: [{ model: Product }, { model: diseaseType }],
      where: { id: id },
    });
    return res.status(200).send(disease);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const update = async (req, res, next) => {
  try {
    const diseaseInfo = req.body;
    const diseaseTypeId = diseaseInfo.diseaseTypeId;

    const disease = await Disease.findByPk( diseaseInfo.id );
    disease.name = diseaseInfo.name;  
    disease.description =  diseaseInfo.description;
    disease.photo= diseaseInfo.photo;
    disease.diseaseTypeId = diseaseTypeId;
    disease.save();
    return res.status(200).send(disease);
  } catch (err) {
    console.log(err)
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
  findById,
  update,
  remove,
};
