import React, { useState } from "react";
import {  List, Drawer, Table } from "antd";
import { NavLink } from "react-router-dom";
import CropCard from "./CropCard";


const CropCardList = ({ crops }) => {
  const [open, setOpen] = useState(false);
  const [selectedcrop, setSelectedcrop] = useState(null);

  const showDrawer = (name) => {
    const chosencrops = crops.find(crop => crop.name === name)?? null ;
    setSelectedcrop(p => chosencrops);
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <List
        grid={{ gutter: 26, column: 4 }}
        dataSource={crops}
        renderItem={(crop, index) => (
         
          <List.Item>
           <CropCard crop={crop} showDrawer={showDrawer}/>
          </List.Item>
        )}
      />
      <Drawer
        title={selectedcrop?.name}
        placement="right"
        onClose={onClose}
        open={open}
      >
        <h2>Componentes Quimicos :</h2>
        <ol>
          <Table
          pagination={false}
          dataSource={selectedcrop?.crop}
          columns={[{title: 'Name', dataIndex: 'name', key: 'id' , render: (text)=> <NavLink to={'/'}>{text}</NavLink>}]}
          >
          </Table>
        </ol>
      </Drawer>
    </>
  );
};

export default CropCardList;
