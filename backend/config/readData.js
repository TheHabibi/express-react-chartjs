const fs = require("fs");

let orderData = fs.readFileSync("backend/data/orders.json");
let productData = fs.readFileSync("backend/data/parent_products.json");
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

  const cogsArray = Object.entries(cogsByMonth);

  cogsArray.sort((a, b) => {
    const aDate = new Date(a[0]);
    const bDate = new Date(b[0]);
    return aDate - bDate;
  });

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
