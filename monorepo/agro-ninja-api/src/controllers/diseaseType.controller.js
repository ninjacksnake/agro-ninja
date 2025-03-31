const { Op } = require("sequelize");
const  Crop  = require("../models/index").Crop;

const DiceaseType = require("../models/index").DiseaseType;

const create = async (req, res, next) => {
  const DiseaseTypeInfo = req.body;
  try {
    const newDiceaseType = await DiceaseType.create(DiseaseTypeInfo);
  return res.status(200).send(newDiceaseType);
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
      result = await DiceaseType.findAll({
        where: { id: values.productId },
      });
    } else if (values.name !== undefined) {
      result = await DiceaseType.findAll({
        where: { name: values.name },
      });
      
      res.status(200).send(result);
    } else {
      result = await DiceaseType.findAll();
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
    const diceaseType = await DiceaseType.findByPk(id, {
      include: [{ model: Crop }],
      where: { id: id },
    });
    return res.status(200).send(diceaseType);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const update = async (req, res, next) => {
  try {
    const DiseaseTypeInfo = req.body;
    const diceaseType = await DiceaseType( DiseaseTypeInfo.id );
    diceaseType.name = DiseaseTypeInfo.name;  
    diceaseType.description =  DiseaseTypeInfo.description;
    if (DiseaseTypeInfo.crops !== undefined) {
     diceaseType.setCrops([...DiseaseTypeInfo.crops]);
    }
    diceaseType.save();
    return res.status(200).send(diceaseType);
  } catch (err) {
    console.log(err)
    res.status(500).send(err.message);
  }
};

const remove = async (req, res, next) => {
  try {
    const diseaseType = req.body;
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
