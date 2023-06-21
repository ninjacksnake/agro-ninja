
import React, { useEffect, useState } from "react";

import diceaseService from "./../../services/Dicease.service";
import { Input, Space, Button } from "antd";
import DiceaseCardList from './components/DiceaseCardList';

const FindDicease = () => {
  const [diceases, setdiceases] = useState([]);
  const [filtredDiceases, setFiltredDiceases] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await diceaseService.diceases.findAll();
        setdiceases((r) => result);
        setFiltredDiceases((r) => result);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const filterDiceases = (e) => {
    if (e.target.value === undefined || e.target.value === "") {
      e.target.value = document.getElementById("si").value;
    }
    const filteredDiceases = diceases.filter((dicease) =>
      dicease.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setFiltredDiceases(filteredDiceases);
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
      <DiceaseCardList diceases={filtredDiceases} />
    </div>
  );
};

export default FindDicease;
