import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import AppLayout from "./../pages/Layout";
import Deceases from "../pages/deceases/Deceases";
import Chemicals from "../pages/chemicals/Chemicals";
import Products from "../pages/products/Products.jsx";
import CreateProduct from "../pages/products/CreateProduct";
import FindProducts from "../pages/products/FindProducts";
import UpdateProducts from "../pages/products/UpdateProducts";
import CreateDecease from "../pages/deceases/CreateDecease";
import FindDecease from "../pages/deceases/FindDecease";
import UpdateDecease from "../pages/deceases/UpdateDecease";
import CreateChemical from "./../pages/chemicals/CreateChemical";
import FindChemical from "./../pages/chemicals/FindChemical";
import UpdateChemical from "./../pages/chemicals/UpdateChemical";

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
        </Route>

        <Route path="deceases">
          <Route index element={<Deceases />} />
          <Route path="add" element={<CreateDecease />} />
          <Route path="find" element={<FindDecease />} />
          <Route path="update/:id" element={<UpdateDecease />} />
        </Route>

        <Route path="chemicals">
          <Route index element={<Chemicals />} />
          <Route path="add" element={<CreateChemical />} />
          <Route path="find" element={<FindChemical />} />
          <Route path="update/:id" element={<UpdateChemical />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
