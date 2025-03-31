import React, { useState } from "react";
import {  List, Drawer, Table } from "antd";
import { NavLink } from "react-router-dom";
 import DiseaseCard from "./DiseaseCard";


const DiseaseCardList = ({ diseases }) => {
  const [open, setOpen] = useState(false);
  const [selectedDisease, setSelectedDisease] = useState(null);

  const showDrawer = (name) => {
    const chosendiseases = diseases.find(disease => disease.name === name)?? null ;
    setSelectedDisease(p => chosendiseases);
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <List
        grid={{ gutter: 26, column: 4 }}
        dataSource={diseases}
        renderItem={(disease, index) => (
         
          <List.Item>
           <DiseaseCard disease={disease} showDrawer={showDrawer}/>
          </List.Item>
        )}
      />
      <Drawer
        title={selectedDisease?.name}
        placement="right"
        onClose={onClose}
        open={open}
      >
        <h2>Componentes Quimicos :</h2>
        <ol>
          <Table
          pagination={false}
          dataSource={selectedDisease?.disease}
          columns={[{title: 'Name', dataIndex: 'name', key: 'id' , render: (text)=> <NavLink to={'/'}>{text}</NavLink>}]}
          >
          </Table>
        </ol>
      </Drawer>
    </>
  );
};

export default DiseaseCardList;
