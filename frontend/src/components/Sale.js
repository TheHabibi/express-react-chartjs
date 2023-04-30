import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import saleService from "../services/saleService";
import Button from "@mui/material/Button";

function Sale() {
  const [sales, setSales] = useState([]);
  const [vendorId, setVendorId] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc"); 
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const parts = location.pathname.split("/");
    const vendorId = parts.pop();
    setVendorId(vendorId);
  }, [location.pathname]);

  useEffect(() => {
    if (vendorId) {
      saleService.totalSales(vendorId).then(
        (response) => {
          setSales(response.saleList);
          setVendorName(response.vendorName)
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, [vendorId]);

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
 
      setSortField(field);
      setSortDirection("asc");
    }
  };

const sortedSales = sales.sort((a, b) => {
  if (sortDirection === "asc") {
    if (a[sortField] < b[sortField]) return -1;
    if (a[sortField] > b[sortField]) return 1;
    return 0;
  } else {
    if (a[sortField] < b[sortField]) return 1;
    if (a[sortField] > b[sortField]) return -1;
    return 0;
  }
});

const navigateTotalSales = (selectedVendorId) => {
  navigate(`/vendor/totalSales/${selectedVendorId}`);
};
const navigateMonthlySales = (selectedVendorId) => {
  navigate(`/vendor/monthlySales/${selectedVendorId}`);
};

  return (
    <div className="Sale">
      {console.log(sales)}
      <h1 style={{ fontFamily: "RomanSerif" }}>TOTAL UNIT SALES</h1>
      <p>
        <strong>Vendor Name:</strong> {vendorName}
      </p>
      <Button
        onClick={() => navigateTotalSales(vendorId)}
        variant="contained"
        color="neutral"
        style={{ margin: "30px", padding: "7px 20px" }}
      >
        TOTAL UNIT SALES
      </Button>
      <Button
        onClick={() => navigateMonthlySales(vendorId)}
        variant="contained"
        color="neutral"
        style={{ margin: "30px", padding: "7px 20px" }}
      >
        Monthly Revenue
      </Button>
      <table style={{ margin: "0 auto" }}>
        <thead>
          <tr>
            <th onClick={() => handleSort("name")}>
              Code {sortField === "name" && sortDirection === "asc" && "▲"}
              {sortField === "name" && sortDirection === "desc" && "▼"}
            </th>
            <th>Category</th>
            <th>Color</th>
            <th onClick={() => handleSort("totalSale")}>
              Total Sale Amount{" "}
              {sortField === "totalSale" && sortDirection === "asc" && "▲"}
              {sortField === "totalSale" && sortDirection === "desc" && "▼"}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedSales.map((sale) => {
            const [code, cloth, color] = sale.name.split(" - ");
            return (
              <tr key={sale.id}>
                <td>{code}</td>
                <td>{cloth}</td>
                <td>{color}</td>
                <td>{sale.totalSale}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Sale;
