const asyncHandler = require("express-async-handler");
const vendor = require("../data/vendors.json");

const allVendors = asyncHandler(async (req, res) => {
  const vendorList = vendor.map(({ _id: { $oid }, name }) => ({ id: $oid, name }));
  res.status(200).json({ vendorList });
});

module.exports = { allVendors };
