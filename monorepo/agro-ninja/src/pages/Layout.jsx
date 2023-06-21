import React, { useState } from "react";
import { DesktopOutlined, PieChartOutlined, AimOutlined, FilterOutlined, FileAddFilled } from "@ant-design/icons";
// import { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import {  Outlet, NavLink } from "react-router-dom";
import BreadCrumbs from "./components/BreadCrumbs";

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
  getItem("Productos", "1",  <PieChartOutlined /> ,[
    getItem("Buscar", "2", <> <FilterOutlined /> <NavLink to="products/find"/></>),
    getItem("Agregar", "3", <> <FileAddFilled /> <NavLink to="products/add"/></>), 
    // getItem("Modificar", "4", <> <PieChartOutlined /> <NavLink to="products/update"/></>),
  ]),
  getItem("Enfermedades", "5",  <DesktopOutlined />,[
    getItem("Buscar", "6", <> <FilterOutlined /> <NavLink to="diceases/find"/></>),
    getItem("Agregar", "7", <> <FileAddFilled /> <NavLink to="diceases/add"/></>), 
    // getItem("Modificar", "8", <> <PieChartOutlined /> <NavLink to="diceases/update"/></>),
   
  ]),
  getItem("Quimicos", "9",  <AimOutlined /> ,[
    getItem("Buscar", "10", <> <FilterOutlined /> <NavLink to="Chemicals/find"/></>),
    getItem("Agregar", "11", <> <PieChartOutlined /> <NavLink to="Chemicals/add"/></>), 
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
            height: 32,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {" "}
          AGRO {" "}
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
         <BreadCrumbs />
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}l
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
