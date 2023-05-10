import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import AppLayout from './../pages/Layout';
import Deceases from '../pages/deceases/Deceases';
import Chemicals from "../pages/chemicals/Chemicals";
import Products from "../pages/Products/Products";

const AppRoutes = () => {
  return(
  <Routes>
    <Route path="/" element={<AppLayout />}>
      <Route index element={<Home />} />
      <Route path="products" element={<Products />} />
      <Route path="deceases" element={<Deceases />} />
      <Route path="chemicals" element={<Chemicals />} />
    </Route>
  </Routes>
  );
};

export default AppRoutes