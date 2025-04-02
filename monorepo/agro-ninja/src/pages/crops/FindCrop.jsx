import React, { useState, useEffect } from "react";

// import CropCardList from "./components/CropCardList";
import TableComponent from "../components/TableComponent";

import CropService from "../../services/Crop.service";
import { Input, Space, Button, Tooltip } from "antd";
import { NavLink } from "react-router-dom";
import DrawerComponent from "../components/DrawerComponent";


const FindCrop = () => {
    const [crops, setCrops] = useState([]);
    const [filtredCrops, setFiltredCrops] = useState([]);
    const [selectedCrop, setSelectedCrop] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await CropService.Crops.findAll();
                setCrops((r) => result);
                setFiltredCrops((r) => result);
            } catch (error) {
                console.log(error)
            }
        }
        getData();

    }, []);

    const filterCrops = (e) => {
        if (e.target.value === undefined || e.target.value === "") {
            e.target.value = document.getElementById("si").value;
        }

        const filteredCrops = crops.filter((crop) =>
            crop.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFiltredCrops(filteredCrops);
    };

    const showDrawer = (name) => {
        const chosenProduct =
            filtredCrops.find((crop) => crop.name === name) ?? null;
        setSelectedCrop((p) => chosenProduct);
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    const getCropId = (name) => {
        const crop = crops.find((crop) => crop.name === name);
        return crop.id;
    }

    return (
        <div>
            <Space.Compact style={{ width: "100%", marginBottom: "2rem" }}>
                <Tooltip title="Agregar Crop" placement="rightBottom">
                    <NavLink to={"/crops/add"} >
                        <Button type="primary" > + </Button>
                    </NavLink>
                </Tooltip>
                <Input
                    id="si"
                    placeholder="Escriba aqui el producto que desea buscar"
                    onKeyUp={filterCrops}
                />
                <Button type="primary" onClick={filterCrops}>
                    Buscar
                </Button>
            </Space.Compact>
            {/* <CropCardList crops={filtredCrops} /> */}
            {console.log("filtredCrops ", filtredCrops)}
            <TableComponent data={filtredCrops ?? []} columns=
                {[
                    {
                        title: "Nombre",
                        dataIndex: "name",
                        key: "name",
                    },
                    {
                        title: "Descripción",
                        dataIndex: "description",
                        key: "description",
                    },

                ]}
                module="crops"
                showDrawer={showDrawer}
            />
            {/* <DrawerComponent
                open={open}
                onClose={onClose}
                title={selectedCrop?.name}
                caption={"Productos Relacionados"}
                columns={[
                    {
                        title: "Name",
                        dataIndex: "name",
                        key: "id",
                        render: (text) => <NavLink to={`/chemicals/details/${getCropId(text)}`}>{text}</NavLink>,
                    },
                ]}
                data={selectedCrop?.chemicals}

            /> */}
        </div>
    );
}



export default FindCrop;
