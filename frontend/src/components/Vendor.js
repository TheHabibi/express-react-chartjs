import React, { useEffect, useState } from "react";
import vendorService from "../services/vendorService";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import "../App.css";

function Vendor() {
  const [vendors, setVendors] = useState([]);
  const [selectedVendorId, setSelectedVendorId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    vendorService.getAllVendors().then(
      (response) => {
        setVendors(response.vendorList);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const handleClick = (selectedVendorId) => {
    navigate(`/vendor/totalSales/${selectedVendorId}`);
  };

  return (
    <div className="Vendor">
      <h1 style={{ fontFamily: "RomanSerif", fontSize: "100px" }}>LONCA</h1>
      <div>
        <select onChange={(e) => setSelectedVendorId(e.target.value)}>
          <option>SELECT A VENDOR</option>
          {vendors.map((vendor) => (
            <option key={vendor.id} value={vendor.id}>
              {vendor.name}
            </option>
          ))}
        </select>
        <Button
          onClick={() => handleClick(selectedVendorId)}
          variant="contained"
          color="neutral"
        >
          CHOOSE
        </Button>
      </div>
    </div>
  );
}
export default Vendor;
