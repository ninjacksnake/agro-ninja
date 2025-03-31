const express = require("express");
const productsController = require("../controllers/products.controller");
const { syncDb } = require("../controllers/app.controller");
const chemicalsController = require("../controllers/chemicals.controller");
const diseasesController = require("../controllers/diseases.controller");
const categoriesController = require("../controllers/categories.controller");
const cropsController = require("../controllers/crops.controller.js");
const cropTypesController = require("../controllers/cropTypes.controller.js");
const diseaseTypeController = require("../controllers/diseaseType.controller.js");
const chemicalTypeController  = require("../controllers/chemicalType.controller.js");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).send("server is alive");
});

router.get("/sync", syncDb);

router.post("/api/products", productsController.create);
router.get("/api/products", productsController.find);
router.get("/api/products/:id", productsController.findById);
router.put("/api/products", productsController.update);

router.post("/api/diseases", diseasesController.create);
router.get("/api/diseases", diseasesController.find);
router.get("/api/diseases/:id", diseasesController.findById);
router.put("/api/diseases", diseasesController.update);

router.post("/api/diseasetypes", diseaseTypeController.create);
router.get("/api/diseasetypes", diseaseTypeController.find);
router.get("/api/diseasetypes/:id", diseaseTypeController.findById);
router.put("/api/diseasetypes", diseaseTypeController.update);

router.post("/api/chemicals", chemicalsController.create);
router.get("/api/chemicals", chemicalsController.find);
router.get("/api/chemicals/:id", chemicalsController.findById);
router.put("/api/chemicals", chemicalsController.update);

router.post("/api/chemicalType", chemicalTypeController.create);
router.get("/api/chemicalTypes", chemicalTypeController.getAll);
router.get("/api/chemicalsType/:id", chemicalTypeController.getById);
router.put("/api/chemicalsType", chemicalTypeController.update);

router.post("/api/categories", categoriesController.create);
router.get("/api/categories", categoriesController.find);
router.put("/api/categories", categoriesController.update);

router.post("/api/crops", cropsController.create);
router.get("/api/crops", cropsController.find);
router.get("/api/crops/:id", cropsController.findById);
router.put("/api/crops", cropsController.update);

router.get("/api/cropType", cropTypesController.find);
router.post("/api/cropType", cropTypesController.create);
router.put("/api/cropType", cropTypesController.update);
router.get("/api/cropType/:id", cropTypesController.findById);



module.exports = router;
