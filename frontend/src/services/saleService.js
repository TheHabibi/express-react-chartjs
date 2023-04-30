import axios from "axios";
const API_URL = "https://lonca-case-api.onrender.com";

const totalSales = async (vendorId) => {
  console.log("vendorId:", vendorId);
  const formData = new URLSearchParams();
  formData.append("vendorId", vendorId);

  const response = await axios.post(
    API_URL + "/api/sales/totalSales",
    formData.toString(),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data;
};

const monthlySales = async (vendorId) => {
  console.log("vendorId:", vendorId);
  const formData = new URLSearchParams();
  formData.append("vendorId", vendorId);

  const response = await axios.post(
    API_URL + "/api/sales/monthlySales",
    formData.toString(),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data;
};

const saleService = { totalSales, monthlySales };

export default saleService;
