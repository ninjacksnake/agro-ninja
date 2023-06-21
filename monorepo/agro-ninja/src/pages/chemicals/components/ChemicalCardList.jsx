import React, { useState } from "react";
import { List, Drawer, Table } from "antd";
import { NavLink } from "react-router-dom";
import ChemicalCard from "./ChemicalCard";

const ChemicalCardList = ({ chemicals }) => {
  const [open, setOpen] = useState(false);
  const [selectedChemical, setSelectedChemical] = useState(null);
  const showDrawer = (name) => {
    const chosenChemicals =
      chemicals.find((chemical) => chemical.name === name) ?? null;
    setSelectedChemical((p) => chosenChemicals);
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <List
        grid={{ gutter: 26, column: 4 }}
        dataSource={chemicals}
        renderItem={(chemical, index) => (
          <List.Item key={index}>
            <ChemicalCard chemical={chemical} showDrawer={showDrawer} />
          </List.Item>
        )}
      />
      <Drawer
        title={selectedChemical?.name}
        placement="right"
        onClose={onClose}
        open={open}
      >
        <h2>Componentes Quimicos :</h2>
        <ol>
          <Table
            pagination={false}
            dataSource={selectedChemical?.dicease}
            columns={[
              {
                title: "Name",
                dataIndex: "name",
                key: "id",
                render: (text) => <NavLink to={"/"}>{text}</NavLink>,
              },
            ]}
          ></Table>
        </ol>
      </Drawer>
    </>
  );
};

export default ChemicalCardList;
