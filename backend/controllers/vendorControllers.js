const asyncHandler = require("express-async-handler");
const fs = require("fs");

let vendorData = fs.readFileSync("backend/data/vendors.json");
let vendor = JSON.parse(vendorData);

const allVendors = asyncHandler(async (req, res) => {
  const vendorList = vendor.map((v) => {
    return { id: v._id.$oid, name: v.name };
  });
  res.status(200).json({ vendorList });
});


module.exports = { allVendors };
