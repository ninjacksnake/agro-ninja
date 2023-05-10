import React, { useState } from "react";
import { DesktopOutlined, PieChartOutlined, AimOutlined } from "@ant-design/icons";
// import { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Navigate, Outlet, NavLink } from "react-router-dom";

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
  getItem("Productos", "1", <div> <PieChartOutlined /> <NavLink to="products"/></div>,[
    getItem("Buscar", "2", <div> <PieChartOutlined /> <NavLink to="products"/></div>),
    getItem("Agregar", "2", <div> <PieChartOutlined /> <NavLink to="products"/></div>), 
    getItem("Modificar", "3", <div> <PieChartOutlined /> <NavLink to="products"/></div>),
  ]),
  getItem("Enfermedades", "4", <div> <DesktopOutlined /> <NavLink to="deceases"/></div>,[
    getItem("Buscar", "2", <div> <PieChartOutlined /> <NavLink to="products"/></div>),
    getItem("Agregar", "5", <div> <PieChartOutlined /> <NavLink to="products"/></div>), 
    getItem("Modificar", "6", <div> <PieChartOutlined /> <NavLink to="products"/></div>),
   
  ]),
  getItem("Quimicos", "7", <div> <AimOutlined /> <NavLink to="chemicals"/></div>,[
    getItem("Buscar", "2", <div> <PieChartOutlined /> <NavLink to="products"/></div>),
    getItem("Agregar", "8", <div> <PieChartOutlined /> <NavLink to="products"/></div>), 
    getItem("Modificar", "9", <div> <PieChartOutlined /> <NavLink to="products"/></div>),
  ]),

  // getItem("Usearios", "sub1", <UserOutlined />, [
  //   getItem("Tom", "3"),
  //   getItem("Bill", "4"),
  //   getItem("Alex", "5"),
  // ]),
  // getItem("Team", "sub2", <TeamOutlined />, [
  //   getItem("Team 1", "6"),
  //   getItem("Team 2", "8"),
  // ]),
  // getItem("Files", "9", <FileOutlined />),
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
          Agro Ninja{" "}
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
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
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
