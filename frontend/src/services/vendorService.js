import axios from "axios";
const API_URL = "http://localhost:3001";

const getAllVendors = async () => {
  const response = await axios.get(API_URL + "/api/vendors/allVendors", {});
  return response.data;
};

const vendorService = { getAllVendors };

export default vendorService;
