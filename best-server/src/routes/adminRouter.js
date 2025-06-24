const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController.js");

router.get("/users", adminController.listUser);

module.exports = router;
