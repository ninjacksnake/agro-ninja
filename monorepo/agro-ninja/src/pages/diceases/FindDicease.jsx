
import React, { useEffect, useState } from "react";
import diseasesService from "./../../services/Dicease.service";
import { Input, Space, Button, message } from "antd";
import DiceaseCardList from './components/DiceaseCardList';
import TableComponent from "../components/TableComponent";
import DrawerComponent from "../components/DrawerComponent";
import { NavLink } from "react-router-dom";


const columns = [
  {
    title: 'Nombre',
    key: 'name',
    dataIndex: 'name',
  }, {
    title: 'Descripción',
    key: 'description',
    dataIndex: 'description',
  },
  {
    title: 'Clasificación',
    key: 'classification',
    dataIndex: 'classification',
  }
];



const FindDicease = () => {
  const [diseases, setDiseases] = useState([]);

  const [filtredDiseases, setFiltredDiseases] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedDicease, setSelectedDicease] = useState(null);


  useEffect(() => {
    const getData = async () => {
      try {
        const result = await diseasesService.diceases.findAll();
        console.log(result)
        setDiseases((r) => result);
        setFiltredDiseases((r) => result);
      } catch (error) {
        /// console.log(error);
        message.error('Error al cargar las enfermedades');
      }
    };
    getData();

  }, []);

 const getProductId = (name) => {
  console.log(name)
    return selectedDicease.products.find((product) => product.name === name).id;
 };

  const filterDiceases = (e) => {
    if (e.target.value === undefined || e.target.value === "") {
      e.target.value = document.getElementById("si").value;
    }
    const filteredDiceases = diseases.filter((diseases) =>
      diseases.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setFiltredDiseases(x => filteredDiceases);
  };

  const showDrawer = (name) => {

    const chosenDisease =
      filtredDiseases.find((disease) => disease.name === name) ?? null;
    setSelectedDicease((p) => chosenDisease);
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Space.Compact style={{ width: "100%", marginBottom: "2rem" }}>
        <Input
          id="si"
          placeholder="Escriba aqui el nombre de la enfermedad que desea buscar"
          onKeyUp={filterDiceases}
        />
        <Button type="primary" onClick={filterDiceases}>
          Buscar
        </Button>
      </Space.Compact>
      {/* <DiceaseCardList diseasess={filtredDiceases} /> */}
      <TableComponent data={filtredDiseases} columns={columns} module={'diceases'} showDrawer={showDrawer} />
      <DrawerComponent
        caption={'Productos relacionados'}
        open={open}
        onClose={onClose}
        title={selectedDicease?.name}
        columns={  [
          {
          title: 'Nombre',
          key: 'name',
          dataIndex: 'name',
          render: (text) => <NavLink to={`/products/details/${getProductId(text)}`}>{text}</NavLink> 
        },
        {
          title: 'Descripción',
          key: 'description',
          dataIndex: 'description',
        }, 
      ]}
        data={selectedDicease?.products}
        
       
      />
    </div>
  );
};

export default FindDicease;
