const express = require("express");
const productsController = require("../controllers/products.controller");

const chemicalsController = require("../controllers/chemicals.controller");
const diseasesController = require("../controllers/diseases.controller");
const categoriesController = require("../controllers/categories.controller");
const cropsController = require("../controllers/crops.controller.js");
const cropTypesController = require("../controllers/cropTypes.controller.js");
const diseaseTypeController = require("../controllers/diseaseType.controller.js");
const chemicalTypeController  = require("../controllers/chemicalType.controller.js");
const authMiddleware = require("../utils/middlewares/authMiddleware.js");
const UserController = require("../controllers/user.controller.js");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).send("server is alive");
});

router.post("/api/products", authMiddleware, productsController.create);
router.get("/api/products", authMiddleware, productsController.find);
router.get("/api/products/:id", authMiddleware, productsController.findById);
router.put("/api/products", authMiddleware, productsController.update);

router.post("/api/diseases",authMiddleware, diseasesController.create);
router.get("/api/diseases",authMiddleware, diseasesController.find);
router.get("/api/diseases/:id", authMiddleware, diseasesController.findById);
router.put("/api/diseases", authMiddleware, diseasesController.update);

router.post("/api/diseasetypes", authMiddleware, diseaseTypeController.create);
router.get("/api/diseasetypes", authMiddleware, diseaseTypeController.find);
router.get("/api/diseasetypes/:id",authMiddleware,authMiddleware,authMiddleware,authMiddleware, diseaseTypeController.findById);
router.put("/api/diseasetypes",authMiddleware,authMiddleware,authMiddleware,authMiddleware, diseaseTypeController.update);

router.post("/api/chemicals",authMiddleware,authMiddleware,authMiddleware, chemicalsController.create);
router.get("/api/chemicals",authMiddleware,authMiddleware,authMiddleware, chemicalsController.find);
router.get("/api/chemicals/:id",authMiddleware,authMiddleware,authMiddleware, chemicalsController.findById);
router.put("/api/chemicals/:id",authMiddleware,authMiddleware,authMiddleware, chemicalsController.update);

router.post("/api/chemicalType",authMiddleware,authMiddleware, chemicalTypeController.create);
router.get("/api/chemicalTypes", authMiddleware,authMiddleware,chemicalTypeController.getAll);
router.get("/api/chemicalsType/:id",authMiddleware,authMiddleware, chemicalTypeController.getById);
router.put("/api/chemicalsType",authMiddleware,authMiddleware, chemicalTypeController.update);

router.post("/api/categories",authMiddleware,authMiddleware, categoriesController.create);
router.get("/api/categories",authMiddleware,authMiddleware, categoriesController.find);
router.put("/api/categories", authMiddleware,authMiddleware,categoriesController.update);

router.post("/api/crops",authMiddleware,authMiddleware, cropsController.create);
router.get("/api/crops",authMiddleware,authMiddleware, cropsController.find);
router.get("/api/crops/:id",authMiddleware,authMiddleware, cropsController.findById);
router.put("/api/crops/:id",authMiddleware,authMiddleware, cropsController.update);

router.get("/api/cropType",authMiddleware, cropTypesController.find);
router.post("/api/cropType",authMiddleware, cropTypesController.create);
router.put("/api/cropType", authMiddleware,cropTypesController.update);
router.get("/api/cropType/:id",authMiddleware, cropTypesController.findById);


router.post("/api/register", UserController.create);




module.exports = router;
