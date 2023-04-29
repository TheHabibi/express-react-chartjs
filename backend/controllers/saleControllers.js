const asyncHandler = require("express-async-handler");
const fs = require("fs");
const { getCogsByMonth } = require("../config/readData");

const productData = fs.readFileSync("backend/data/parent_products.json");
const orderData = fs.readFileSync("backend/data/orders.json");
const products = JSON.parse(productData);
const orders = JSON.parse(orderData);

const totalSales = asyncHandler(async (req, res) => {
  const { vendorId } = req.body;

  const productList = products.filter((product) => product.vendor?.$oid === vendorId);

  const saleList = productList.map(({ _id, name }) => {
    const productId = _id.$oid;
    const saleCount = orders.reduce((acc, order) => {
      const cartItems = order.cart_item;
      if (!Array.isArray(cartItems)) return acc;
      return acc + cartItems.reduce((acc, { product }) => {
        if (product?.$oid === productId) {
          return acc + 1;
        }
        return acc;
      }, 0);
    }, 0);
    console.log(`${name} Sale Number: ${saleCount}`);
    return { name, totalSale: saleCount };
  });

  res.status(200).json({ saleList });
});

const monthlySales = asyncHandler(async(req,res)=>{
   const { vendorId } = req.body;

   const monthlySales = getCogsByMonth(vendorId);

    res.status(200).json({ monthlySales });
})


module.exports = { totalSales, monthlySales };
