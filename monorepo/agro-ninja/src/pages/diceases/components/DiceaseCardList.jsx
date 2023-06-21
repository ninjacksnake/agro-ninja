import React, { useState } from "react";
import {  List, Drawer, Table } from "antd";
import { NavLink } from "react-router-dom";
import DiceaseCard from "./DiceaseCard";


const DiceaseCardList = ({ diceases }) => {
  const [open, setOpen] = useState(false);
  const [selecteddicease, setSelecteddicease] = useState(null);

  const showDrawer = (name) => {
    const chosendiceases = diceases.find(dicease => dicease.name === name)?? null ;
    setSelecteddicease(p => chosendiceases);
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <List
        grid={{ gutter: 26, column: 4 }}
        dataSource={diceases}
        renderItem={(dicease, index) => (
         
          <List.Item>
           <DiceaseCard dicease={dicease} showDrawer={showDrawer}/>
          </List.Item>
        )}
      />
      <Drawer
        title={selecteddicease?.name}
        placement="right"
        onClose={onClose}
        open={open}
      >
        <h2>Componentes Quimicos :</h2>
        <ol>
          <Table
          pagination={false}
          dataSource={selecteddicease?.dicease}
          columns={[{title: 'Name', dataIndex: 'name', key: 'id' , render: (text)=> <NavLink to={'/'}>{text}</NavLink>}]}
          >
          </Table>
        </ol>
      </Drawer>
    </>
  );
};

export default DiceaseCardList;
