const express = require("express");
const productsController = require("../controllers/products.controller");
const { syncDb } = require("../controllers/app.controller");
const chemicalsController = require("../controllers/chemicals.controller");
const diceasesController = require("../controllers/diceases.controller");
const categoriesController = require("../controllers/categories.controller");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).send("server is alive");
});

router.get("/sync", syncDb);

router.post("/products", productsController.create);
router.get("/products", productsController.find);
router.get("/products/:id", productsController.findById);
router.put("/products", productsController.update);

router.post("/diceases", diceasesController.create);
router.get("/diceases", diceasesController.find);
router.get("/diceases/:id", diceasesController.findById);
router.put("/diceases", diceasesController.update);

router.post("/chemicals", chemicalsController.create);
router.get("/chemicals", chemicalsController.find);
router.get("/chemicals/:id", chemicalsController.findById);
router.put("/chemicals", chemicalsController.update);

router.post("/categories", categoriesController.create);
router.get("/categories", categoriesController.find);
router.put("/categories", categoriesController.update);

module.exports = router;
