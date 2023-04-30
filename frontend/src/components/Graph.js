import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import saleService from "../services/saleService";
import Chart from "chart.js/auto";
import Button from "@mui/material/Button";

function Sale() {
  const [sales, setSales] = useState([]);
  const [vendorId, setVendorId] = useState("");
  const [vendorName, setVendorName] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const parts = location.pathname.split("/");
    const vendorId = parts.pop();
    setVendorId(vendorId);
  }, [location.pathname]);

  useEffect(() => {
    if (vendorId) {
      saleService.monthlySales(vendorId).then(
        (response) => {
          setSales(response.monthlySales);
           setVendorName(response.vendorName);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, [vendorId]);

  const chartRef = useRef();

  useEffect(() => {
    const times = sales.map((item) => item.time);
    const amounts = sales.map((item) => item.amount);

    if (times.length > 0 && amounts.length > 0) {
      const ctx = chartRef.current.getContext("2d");
      const myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: times,
          datasets: [
            {
              label: "Sales over Time",
              data: amounts,
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  callback: function (value, index, values) {
                    return "₺" + value;
                  },
                },
              },
            ],
          },
          tooltips: {
            callbacks: {
              label: function (tooltipItem, data) {
                return (
                  data.labels[tooltipItem.index] +
                  ": ₺" +
                  data.datasets[0].data[tooltipItem.index]
                );
              },
            },
          },
        },
      });

      return () => {
        myChart.destroy();
      };
    }
  }, [sales]);

  const navigateTotalSales = (selectedVendorId) => {
    navigate(`/vendor/totalSales/${selectedVendorId}`);
  };
  const navigateMonthlySales = (selectedVendorId) => {
    navigate(`/vendor/monthlySales/${selectedVendorId}`);
  };

  return (
    <div className="Sale">
      <h1 style={{ fontFamily: "RomanSerif" }}>MONTHLY REVENUE GRAPH</h1>
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
        MONTHLY REVENUE
      </Button>
      <div style={{ width: "1000px", margin: "0 auto" }}>
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
}

export default Sale;
