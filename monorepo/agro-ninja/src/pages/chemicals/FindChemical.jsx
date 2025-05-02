import React, { useEffect, useState } from "react";

import ChemicalService from "./../../services/Chemical.service";
import { Input, Space, Button, Tooltip } from "antd";

import { NavLink } from "react-router-dom";
import ChemicalTable from "./components/ChemicalTable";

const FindChemical = () => {
  const [chemicals, setChemicals] = useState([]);
  const [filtredChemicals, setFiltredChemicals] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await ChemicalService.findAll();
        setChemicals((r) => result);
        setFiltredChemicals((r) => result);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const filterChemicals = (e) => {
    if (e.target.value === undefined || e.target.value === "") {
      e.target.value = document.getElementById("si").value;
    }
    const filteredChemicals = chemicals.filter((chemical) =>
      chemical.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFiltredChemicals(filteredChemicals);
  };

  return (
    <div>
      <Space.Compact style={{ width: "100%", marginBottom: "2rem" }}>
        <Tooltip title="Agregar Quimico" placement="bottomRight">
          <NavLink to={"/chemicals/add"} >
            <Button type="primary" > + </Button>
          </NavLink>
        </Tooltip>
        <Input
          id="si"
          placeholder="Escriba aqui el quimico que desea buscar"
          onKeyUp={filterChemicals}
        />
        <Button type="primary" onClick={filterChemicals} >
          Buscar
        </Button>
      </Space.Compact>
    <ChemicalTable chemicals={filtredChemicals} />
      {/* <ChemicalCardList chemicals={filtredChemicals} /> */}
    </div>
  );
};

export default FindChemical;
