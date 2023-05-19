import React, { useState } from "react";
import {  List, Drawer, Table } from "antd";
import { NavLink } from "react-router-dom";
import ChemicalCard from "./ChemicalCard";


const ChemicalCardList = ({ chemicals }) => {
  const [open, setOpen] = useState(false);
  const [selectedChemical, setSelectedChemical] = useState(null);

  const showDrawer = (name) => {
    const chosenChemicals = chemicals.find(chemicals => chemicals.name === name)?? null ;
    setSelectedChemical(p => chosenChemicals);
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
          <List.Item>
           <ChemicalCard chemical={chemical} showDrawer={showDrawer}/>
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
          dataSource={selectedChemical?.chemicals}
          columns={[{title: 'Name', dataIndex: 'name', key: 'id' , render: (text)=> <NavLink to={'/'}>{text}</NavLink>}]}
          >
          </Table>
        </ol>
      </Drawer>
    </>
  );
};

export default ChemicalCardList;
