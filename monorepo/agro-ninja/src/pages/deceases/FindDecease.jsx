
import React, { useEffect, useState } from "react";

import ApiService from "./../../services/Api.service";
import { Input, Space, Button } from "antd";
import DeceaseCardList from './components/DeceaseCardList';

const FindDecease = () => {
  const [deceases, setDeceases] = useState([]);
  const [filtredDeceases, setFiltredDeceases] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await ApiService.Deceases.findAll();
        setDeceases((r) => result);
        setFiltredDeceases((r) => result);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const filterDeceases = (e) => {
    if (e.target.value === undefined || e.target.value === "") {
      e.target.value = document.getElementById("si").value;
    }
    console.log(e.target.value);
    const filteredDeceases = deceases.filter((decease) =>
      decease.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setFiltredDeceases(filteredDeceases);
  };

  return (
    <div>
      <Space.Compact style={{ width: "100%", marginBottom: "2rem" }}>
        <Input
          id="si"
          placeholder="Escriba aqui el nombre de la enfermedad que desea buscar"
          onKeyUp={filterDeceases}
        />
        <Button type="primary" onClick={filterDeceases}>
          Buscar
        </Button>
      </Space.Compact>
      <DeceaseCardList deceases={filtredDeceases} />
    </div>
  );
};

export default FindDecease;
