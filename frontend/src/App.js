import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Vendor from "./components/Vendor";
import Sale from "./components/Sale"
import Graph from "./components/Graph";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
  const theme = createTheme({
    status: {
      danger: "#e53e3e",
    },
    palette: {
      primary: {
        main: "#ffb74d",
        darker: "#ffb74d",
      },
      neutral: {
        main: "#e3f2fd",
        contrastText: "#fffff",
      },
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Vendor />} />
            <Route path="/vendor/totalSales/:vendorId" element={<Sale />} />
            <Route path="/vendor/monthlySales/:vendorId" element={<Graph />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
