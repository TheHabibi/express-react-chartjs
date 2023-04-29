const express = require("express");
const { totalSales, monthlySales } = require("../controllers/saleControllers");

const router = express.Router();

router.post("/totalSales", totalSales);
router.post("/monthlySales", monthlySales);
module.exports = router;
