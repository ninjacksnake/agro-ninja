import { Navigate, Route, Routes } from "react-router-dom";

import Home from "../pages/Home.jsx";
import AppLayout from "../pages/Layout.jsx";
import Diseases from "../pages/diseases/Diseases.jsx";
import Chemicals from "../pages/chemicals/Chemicals.jsx";
import Products from "../pages/products/Products.jsx";
import CreateProduct from "../pages/products/CreateProduct.jsx";
import FindProducts from "../pages/products/FindProducts.jsx";
import UpdateProducts from "../pages/products/UpdateProducts.jsx";
import CreateDisease from "../pages/diseases/CreateDisease.jsx";
import FindDisease from "../pages/diseases/FindDisease.jsx";
import UpdateDisease from "../pages/diseases/UpdateDisease.jsx";
import CreateChemical from "../pages/chemicals/CreateChemical.jsx";
import FindChemical from "../pages/chemicals/FindChemical.jsx";
import UpdateChemical from "../pages/chemicals/UpdateChemical.jsx";
import DetailPage from "../pages/DetailPage/DetailPage.jsx";
import FindCrop from "../pages/crops/FindCrop.jsx"
import Crops from "../pages/crops/Crops.jsx"
import CreateCrop from "../pages/crops/CreateCrop.jsx"
import UpdateCrop from "../pages/crops/UpdateCrop.jsx"
import Login from "../pages/Auth/Login.jsx";
import Register from "../pages/Auth/Register.jsx";
import AppPrivateRoute from "./App.private.route.jsx";
import Unauthorized from "../pages/Unauthorized.jsx";





const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<AppLayout />} />
      <Route path="" element={<Navigate to="/home" replace />} />
      <Route path="/" element={<AppLayout />}>
        <Route index element={
           <AppPrivateRoute roles={['user']}>
            <Home />
          </AppPrivateRoute> 
       
      } />

        <Route path="products">
          <Route index element={
            <AppPrivateRoute roles={['user']}>
              <Products />
            </AppPrivateRoute>
          } />
          <Route path="add" element={
            <AppPrivateRoute roles={["user"]}>
              <CreateProduct />
            </AppPrivateRoute>
          } />
          <Route path="find" element={
            <AppPrivateRoute roles={['user']}>
              <FindProducts />
            </AppPrivateRoute>
          } />
          <Route path="update/:id" element={
            <AppPrivateRoute roles={["user"]}>
              <UpdateProducts />
            </AppPrivateRoute>
          } />
          <Route path="details/:id" element={
            <AppPrivateRoute roles={["user"]}>
              <DetailPage />
            </AppPrivateRoute>
          } />
        </Route>


        {/*  diseases routes */}
        <Route path="diseases">
          <Route index element={
            <AppPrivateRoute roles={["user"]}>
              <Diseases />
            </AppPrivateRoute>
          } />
          <Route path="add" element={
            <AppPrivateRoute roles={["user"]}>
              <CreateDisease />
            </AppPrivateRoute>
          } />
          <Route path="find" element={
            <AppPrivateRoute roles={["user"]}>
              <FindDisease />
            </AppPrivateRoute>
          } />
          <Route path="update/:id" element={
            <AppPrivateRoute roles={["user"]}>
              <UpdateDisease />
            </AppPrivateRoute>
          } />
          <Route path="details/:id" element={
            <AppPrivateRoute roles={["user"]}>
              <DetailPage />
            </AppPrivateRoute>
          } />
        </Route>

        {/*  chemicals routes */}
        <Route path="chemicals">
          <Route index element={
            <AppPrivateRoute roles={["user"]}>
              <Chemicals />
            </AppPrivateRoute>
          } />
          <Route path="add" element={
            <AppPrivateRoute roles={["user"]}>
              <CreateChemical />
            </AppPrivateRoute>
          } />
          <Route path="find" element={
            <AppPrivateRoute roles={["user"]}>
              <FindChemical />
            </AppPrivateRoute>
          } />
          <Route path="update/:id" element={
            <AppPrivateRoute roles={["user"]}>
              <UpdateChemical />
            </AppPrivateRoute>
          } />
          <Route path="details/:id" element={
            <AppPrivateRoute roles={["user"]}>
              <DetailPage />
            </AppPrivateRoute>
          } />
        </Route>

        {/*  crops routes */}
        <Route path="crops">
          <Route index element={
            <AppPrivateRoute roles={["user"]}>
              <Crops />
            </AppPrivateRoute>
          } />
          <Route path="add" element={
            <AppPrivateRoute roles={["user"]}>
              <CreateCrop />
            </AppPrivateRoute>
          } />
          <Route path="find" element={
            <AppPrivateRoute roles={["user"]}>
              <FindCrop />
            </AppPrivateRoute>
          } />
          <Route path="update/:id" element={
            <AppPrivateRoute roles={["user"]}>
              <UpdateCrop />
            </AppPrivateRoute>
          } />
          <Route path="details/:id" element={
            <AppPrivateRoute roles={["user"]}>
              <DetailPage />
            </AppPrivateRoute>
          } />
        </Route>

      </Route>
          <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
};

export default AppRoutes;
