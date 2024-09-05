import axios from "axios";
import React, { useEffect, useState } from "react";
import DataCards from "./components/HomeCards";
import "./Home.css"; // Import the CSS file

const ParentComponent = () => {
  const [data, setData] = useState({ chemicals: 0, products: 0, diseases: 0 });

  useEffect(() => {
    axios
      .get("/api/data-endpoint")
      .then((response) => {
        setData({
          chemicals: response.data.chemicals,
          products: response.data.products,
          diseases: response.data.diseases,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="parent-container">
      <DataCards
        chemicals={data.chemicals}
        products={data.products}
        diseases={data.diseases}
      />
    </div>
  );
};

export default ParentComponent;
