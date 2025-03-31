import {
  AimOutlined,
  DesktopOutlined,
  FileAddFilled,
  FilterOutlined,
  PieChartOutlined,
  BgColorsOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
// import { MenuProps } from "antd";
import { Image, Layout, Menu, theme } from "antd";
import { NavLink, Outlet } from "react-router-dom";
import BreadCrumbs from "./components/BreadCrumbs";

import logo from "../assets/images/AgroNinja.png";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children, onTitleClick) {
  return {
    key,
    icon,
    children,
    label,
    onTitleClick,
  };
}

const items = [
  getItem("Productos", "1", <PieChartOutlined style={{marginRight: "0px"}} />, [
    getItem(
      "Buscar",
      "2",
      <> 
        <FilterOutlined style={{marginRight: "5px"}} /> <NavLink to="products/find" />
      </>
    ),
    getItem(
      "Agregar",
      "3",
      <>
        <FileAddFilled style={{marginRight: "5px"}} /> <NavLink to="products/add" />
      </>
    ),
    // getItem("Modificar", "4", <> <PieChartOutlined /> <NavLink to="products/update"/></>),
  ]),
  getItem("Enfermedades", "4", <DesktopOutlined />, [
    getItem(
      "Buscar",
      "5",
      <>
        {" "}
        <FilterOutlined style={{marginRight: "5px"}} /> <NavLink to="diseases/find" />
      </>
    ),
    getItem(
      "Agregar",
      "6",
      <>
        {" "}
        <FileAddFilled  style={{marginRight: "5px"}} /> <NavLink to="diseases/add" />
      </>
    ),
    // getItem("Modificar", "8", <> <PieChartOutlined /> <NavLink to="diseases/update"/></>),
  ]),
  getItem("Quimicos", "7", <AimOutlined />, [
    getItem(
      "Buscar",
      "8",
      <>
        {" "}
        <FilterOutlined  style={{marginRight: "5px"}}/> <NavLink to="Chemicals/find" />
      </>
    ),
    getItem(
      "Agregar",
      "9",
      <>
        {" "}
        <PieChartOutlined  style={{marginRight: "5px"}}/> <NavLink to="Chemicals/add" />
      </>
    ),
    // getItem("Modificar", "12", <> <PieChartOutlined /> <NavLink to="Chemicals/update"/></>),
  ]),
  getItem("Cultivos", "10", <BgColorsOutlined />, [
    getItem(
      "Buscar",
      "11",
      <>
        {" "}
        <FilterOutlined style={{marginRight: "5px"}}/> <NavLink to="Crops/find" />
      </>
    ),
    getItem(
      "Agregar",
      "12",
      <>
        {" "}
        <PieChartOutlined style={{marginRight: "5px"}}/> <NavLink to="Crops/add" />
      </>
    ),
    // getItem("Modificar", "12", <> <PieChartOutlined /> <NavLink to="Chemicals/update"/></>),
  ]),
];

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image src={logo} width={85} height={85} />
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
          <BreadCrumbs  />
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Dominican Republic ©2023 Created by Michael Fermin
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
