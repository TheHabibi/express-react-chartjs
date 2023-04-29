import axios from "axios";
const API_URL = "http://localhost:3001";

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
