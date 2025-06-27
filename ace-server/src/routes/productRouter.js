const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

router.get("/", productController.listProduct);

router.post("/", productController.createProduct);

router.get("/:id", productController.getProduct);

router.delete("/:id", productController.deleteProduct);

router.put("/:id", productController.updateProduct);

module.exports = router;
