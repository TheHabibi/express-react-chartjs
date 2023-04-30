const express = require("express");
const { allVendors } = require("../controllers/vendorControllers");

const router = express.Router();

router.get("/allVendors", allVendors);
module.exports = router;
