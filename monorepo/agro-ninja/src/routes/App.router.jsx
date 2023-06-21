import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import AppLayout from "./../pages/Layout";
import Diceases from "../pages/diceases/Diceases";
import Chemicals from "../pages/chemicals/Chemicals";
import Products from "../pages/products/Products.jsx";
import CreateProduct from "../pages/products/CreateProduct";
import FindProducts from "../pages/products/FindProducts";
import UpdateProducts from "../pages/products/UpdateProducts";
import CreateDicease from "../pages/diceases/CreateDicease";
import FindDicease from "../pages/diceases/FindDicease";
import UpdateDicease from "../pages/diceases/UpdateDicease";
import CreateChemical from "./../pages/chemicals/CreateChemical";
import FindChemical from "./../pages/chemicals/FindChemical";
import UpdateChemical from "./../pages/chemicals/UpdateChemical";
import DetailPage from "../pages/DetailPage/DetailPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />

        <Route path="products">
          <Route index element={<Products />} />
          <Route path="add" element={<CreateProduct />} />
          <Route path="find" element={<FindProducts />} />
          <Route path="update/:id" element={<UpdateProducts />} />
          <Route path="details/:id" element={<DetailPage />} />
        </Route>

        <Route path="diceases">
          <Route index element={<diceases />} />
          <Route path="add" element={<CreateDicease />} />
          <Route path="find" element={<FindDicease />} />
          <Route path="update/:id" element={<UpdateDicease />} />
          <Route path="details/:id" element={<DetailPage />} />`
        </Route>

        <Route path="chemicals">
          <Route index element={<Chemicals />} />
          <Route path="add" element={<CreateChemical />} />
          <Route path="find" element={<FindChemical />} />
          <Route path="update/:id" element={<UpdateChemical />} />
          <Route path="details/:id" element={<DetailPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
