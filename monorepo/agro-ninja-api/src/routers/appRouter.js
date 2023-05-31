const express = require("express");
const productsController = require("../controllers/products.controller");
const { syncDb } = require("../controllers/app.controller");
const chemicalsController = require("../controllers/chemicals.controller");
const deceasesController = require("../controllers/deceases.controller");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).send("server is alive");
});

router.get("/sync", syncDb);

router.post("/products", productsController.create);
router.get("/products", productsController.find);
router.put("/products", productsController.update);

router.post("/deceases", deceasesController.create);
router.get("/deceases", deceasesController.find);
router.put("/deceases", deceasesController.update);

router.post("/chemicals", chemicalsController.create);
router.get("/chemicals", chemicalsController.find);
router.put("/chemicals", chemicalsController.update);

module.exports = router;
