import React, { useEffect, useState } from 'react'

import ApiService from "./../../services/Api.service";
import { Input, Space, Button } from "antd";
import ChemicalCardList from './components/ChemicalCardList';


const FindChemical = () => {
  const [Chemicals, setChemicals] = useState([]);
  const [filtredChemicals, setFiltredChemicals] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await ApiService.Chemicals.findAll();
        setChemicals((r) => result);
        setFiltredChemicals((r) => result);
      } catch (error) 
      {
        console.log(error)
      }
    }
    getData();

  }, []);

  const filterChemicals = (e) => {
    if (e.target.value === undefined || e.target.value === "") {
      e.target.value = document.getElementById("si").value;
    }
    console.log(e.target.value);
    const filteredChemicals = Chemicals.filter((chemical) =>
      chemical.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setFiltredChemicals(filteredChemicals);
  };

  return (
    <div>
      <Space.Compact style={{ width: "100%", marginBottom: "2rem" }}>
        <Input
          id="si"
          placeholder="Escriba aqui el producto que desea buscar"
          onKeyUp={filterChemicals}
        />
        <Button type="primary" onClick={filterChemicals}>
          Buscar
        </Button>
      </Space.Compact>
      <ChemicalCardList chemicals={filtredChemicals} />
    </div>
  );
};

export default FindChemical;
