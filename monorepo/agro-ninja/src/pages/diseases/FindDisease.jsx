
import React, { useEffect, useState, useMemo } from "react";
import { Input, Space, Button, message, notification } from "antd";
import diseasesService from "../../services/Disease.service";
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
    dataIndex: ['diseaseType','name'],
  }
];

const FindDisease = () => {
  const [diseases, setDiseases] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedDisease, setSelectedDisease] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const result = await diseasesService.findAll();
        setDiseases(result);
      } catch (error) {
        notification.error({
          message: 'Error',
          description: 'Failed to load diseases'
        });
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const filteredDiseases = useMemo(() => {
    if (!diseases.length) return [];
    return diseases.filter((disease) =>
      disease.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [diseases, searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value || '');
  };

  const showDrawer = (name) => {
    const chosenDisease = diseases.find((disease) => disease.name === name) ?? null;
    setSelectedDisease(chosenDisease);
    setOpen(true);
  };

  const getProductId = (name) => {
    if (!selectedDisease?.products) return null;
    const product = selectedDisease.products.find((p) => p.name === name);
    return product?.id;
  };

  return (
    <div>
      <Space.Compact style={{ width: "100%", marginBottom: "2rem" }}>
        <Input
          placeholder="Search disease by name"
          onChange={handleSearch}
          value={searchTerm}
        />
        <Button type="primary">
          Search
        </Button>
      </Space.Compact>

      <TableComponent 
        data={filteredDiseases} 
        columns={columns} 
        module={'diseases'} 
        showDrawer={showDrawer}
        loading={loading}
      />

      <DrawerComponent
        caption={'Related Products'}
        open={open}
        onClose={() => setOpen(false)}
        title={selectedDisease?.name}
        columns={[
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
            render: (text) => {
              const id = getProductId(text);
              return id ? <NavLink to={`/products/details/${id}`}>{text}</NavLink> : text;
            }
          },
        {
          title: 'clasificación',
          key: 'classification',
          dataIndex: ['diseaseTypes', 'name'],
        },
        {
          title: 'Descripción',
          key: 'description',
          dataIndex: 'description',
        }, 
      ]}
        data={selectedDisease?.products}
      />
    </div>
  );
};

export default FindDisease;
