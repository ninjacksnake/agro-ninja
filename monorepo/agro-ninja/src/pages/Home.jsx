import axios from "axios";
import React, { useEffect, useState } from "react";
import DataCards from "./components/HomeCards";
import "./Home.css"; // Import the CSS file
import {useSelector} from "react-redux";
import appConfig from "../app.config";


const ParentComponent = () => {
  const [data, setData] = useState({ chemicals: 0, products: 0, diseases: 0 });
  const user = useSelector((state) => state.auth.user);
  console.log(user); // Log the use

  useEffect(() => {
    axios
      .get(appConfig.apiUrl + "/home"
      )
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
