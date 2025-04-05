import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import AppLayout from "./../pages/Layout";
import Diseases from "../pages/diseases/Diseases";
import Chemicals from "../pages/chemicals/Chemicals";
import Products from "../pages/products/Products.jsx";
import CreateProduct from "../pages/products/CreateProduct";
import FindProducts from "../pages/products/FindProducts";
import UpdateProducts from "../pages/products/UpdateProducts";
import CreateDisease from "../pages/diseases/CreateDisease";
import FindDisease from "../pages/diseases/FindDisease";
import UpdateDisease from "../pages/diseases/UpdateDisease";
import CreateChemical from "./../pages/chemicals/CreateChemical";
import FindChemical from "./../pages/chemicals/FindChemical";
import UpdateChemical from "./../pages/chemicals/UpdateChemical";
import DetailPage from "../pages/DetailPage/DetailPage";
import FindCrop from "../pages/crops/FindCrop.jsx"
import Crops from "../pages/crops/Crops.jsx"
import CreateCrop from "../pages/crops/CreateCrop.jsx"
import UpdateCrop from "../pages/crops/UpdateCrop.jsx"
import Login from "../pages/Auth/Login.jsx";
import Register from "../pages/Auth/Register.jsx";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route path="products">
          <Route index element={<Products />} />
          <Route path="add" element={<CreateProduct />} />
          <Route path="find" element={<FindProducts />} />
          <Route path="update/:id" element={<UpdateProducts />} />
          <Route path="details/:id" element={<DetailPage />} />
        </Route>

        <Route path="diseases">
          <Route index element={<Diseases />} />
          <Route path="add" element={<CreateDisease />} />
          <Route path="find" element={<FindDisease />} />
          <Route path="update/:id" element={<UpdateDisease />} />
          <Route path="details/:id" element={<DetailPage />} />`
        </Route>

        <Route path="chemicals">
          <Route index element={<Chemicals />} />
          <Route path="add" element={<CreateChemical />} />
          <Route path="find" element={<FindChemical />} />
          <Route path="update/:id" element={<UpdateChemical />} />
          <Route path="details/:id" element={<DetailPage />} />
        </Route>

        <Route path="crops">
          <Route index element={<Crops />} />
          <Route path="add" element={<CreateCrop />} />
          <Route path="find" element={<FindCrop />} />
          <Route path="update/:id" element={<UpdateCrop />} />
          <Route path="details/:id" element={<DetailPage />} />
        </Route>

      </Route>
    </Routes>
  );
};

export default AppRoutes;
