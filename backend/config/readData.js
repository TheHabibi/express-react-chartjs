
const fs = require("fs");

let vendorData = fs.readFileSync("backend/data/vendors.json");
let orderData = fs.readFileSync("backend/data/orders.json");
let productData = fs.readFileSync("backend/data/parent_products.json");
let vendor = JSON.parse(vendorData);
let order = JSON.parse(orderData);
let product = JSON.parse(productData);

function getCogsByMonth(vendorId) {
  const cogsByMonth = {};
  const productList = getProductList(vendorId);
  order.forEach((o) => {
    o.cart_item.forEach((c) => {
      if (c.product && c.product.$oid) {
        productList.forEach((p) => {
          const productId = p._id.$oid;
          if (c.product.$oid == productId) {
            const unixTimestamp = o.payment_at.$date.$numberLong;
            const date = new Date(unixTimestamp * 1);
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            const cogs = parseFloat(c.cogs);
            const monthKey = `${year}-${month}`;
            if (!cogsByMonth[monthKey]) {
              cogsByMonth[monthKey] = 0;
            }
            cogsByMonth[monthKey] += cogs;
          }
        });
      }
    });
  });

  // Convert object to array of key-value pairs
  const cogsArray = Object.entries(cogsByMonth);

  // Sort array by keys (which represent the months)
  cogsArray.sort((a, b) => {
    const aDate = new Date(a[0]);
    const bDate = new Date(b[0]);
    return aDate - bDate;
  });

  // Map array to required format
  const formattedCogsArray = cogsArray.map(([key, value]) => {
    const [year, month] = key.split("-");
    return {
      time: `${year}-${month}`,
      amount: value,
    };
  });

  return formattedCogsArray;
}




function getProductList(vendorId) {
  const productList = product.filter(
    (p) => p.vendor && p.vendor.$oid === vendorId
  );
  return productList;
}

module.exports = { getCogsByMonth };