import axios from "axios";
const API_URL = "https://lonca-case-api.onrender.com";

const getAllVendors = async () => {
  const response = await axios.get(API_URL + "/api/vendors/allVendors", {});
  return response.data;
};

const vendorService = { getAllVendors };

export default vendorService;
