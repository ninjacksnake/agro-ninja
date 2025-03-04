const express = require("express");
const productsController = require("../controllers/products.controller");
const { syncDb } = require("../controllers/app.controller");
const chemicalsController = require("../controllers/chemicals.controller");
const diceasesController = require("../controllers/diceases.controller");
const categoriesController = require("../controllers/categories.controller");
const cropsController = require("../controllers/crops.controller.js");


const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).send("server is alive");
});

router.get("/sync", syncDb);

router.post("/api/products", productsController.create);
router.get("/api/products", productsController.find);
router.get("/api/products/:id", productsController.findById);
router.put("/api/products", productsController.update);

router.post("/api/diceases", diceasesController.create);
router.get("/api/diceases", diceasesController.find);
router.get("/api/diceases/:id", diceasesController.findById);
router.put("/api/diceases", diceasesController.update);

router.post("/api/chemicals", chemicalsController.create);
router.get("/api/chemicals", chemicalsController.find);
router.get("/api/chemicals/:id", chemicalsController.findById);
router.put("/api/chemicals", chemicalsController.update);

router.post("/api/categories", categoriesController.create);
router.get("/api/categories", categoriesController.find);
router.put("/api/categories", categoriesController.update);

router.post("/api/crops", cropsController.create);
router.get("/api/crops", cropsController.find);
router.get("/api/crops/:id", cropsController.findById);
router.put("/api/crops", cropsController.update);


module.exports = router;
