const express = require("express")
const vendorRoutes = require("./routes/vendorRoutes");
const saleRoutes = require("./routes/saleRoutes");
const cors = require("cors");
const app = express();
app.use(express.urlencoded({ extended: false }));
const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));


app.get("/", (req, res) => {
  res.send("API is Running");
});

app.use("/api/vendors", vendorRoutes);
app.use("/api/sales", saleRoutes);

app.listen(3001, console.log("Server started on PORT 3001"))