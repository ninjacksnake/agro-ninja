import React, { useState } from "react";
import {  List, Drawer, Table } from "antd";
import { NavLink } from "react-router-dom";
import DeceaseCard from "./DeceaseCard";


const DeceaseCardList = ({ deceases }) => {
  const [open, setOpen] = useState(false);
  const [selectedDecease, setSelectedDecease] = useState(null);

  const showDrawer = (name) => {
    const chosenDeceases = deceases.find(decease => decease.name === name)?? null ;
    setSelectedDecease(p => chosenDeceases);
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <List
        grid={{ gutter: 26, column: 4 }}
        dataSource={deceases}
        renderItem={(decease, index) => (
          <List.Item>
           <DeceaseCard decease={decease} showDrawer={showDrawer}/>
          </List.Item>
        )}
      />
      <Drawer
        title={selectedDecease?.name}
        placement="right"
        onClose={onClose}
        open={open}
      >
        <h2>Componentes Quimicos :</h2>
        <ol>
          <Table
          pagination={false}
          dataSource={selectedDecease?.decease}
          columns={[{title: 'Name', dataIndex: 'name', key: 'id' , render: (text)=> <NavLink to={'/'}>{text}</NavLink>}]}
          >
          </Table>
        </ol>
      </Drawer>
    </>
  );
};

export default DeceaseCardList;
