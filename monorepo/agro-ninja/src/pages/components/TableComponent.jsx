import React, { useEffect, useState } from 'react';
import { Table, Button, Segmented, Drawer, Tooltip, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';


const TableComponent = ({ data, columns, module, showDrawer }) => {
  const [records, setRecords] = useState([]);
  const [cols, setCols] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    if (data === undefined || data === null || data.length === 0) {
      setRecords([]);
    }
    setRecords(data);
    if (columns === undefined || columns === null || columns.length === 0) {
      setCols([]);
    }
    setCols(columns);
    if (module === undefined || module === null || module === '') {
      message.error("Module is empty");
      console.log("module is empty");
      navigate('/');
    }

  }, [data]);

  const goUpdate = async (id) => {
   // console.log("From table component: ", records, module);
    localStorage.clear();
    localStorage.setItem(
      `Selected${module}ToUpdate`,
      JSON.stringify(data.find((record) => record.id === id))
    );

    setTimeout(() => {
      localStorage.removeItem(`Selected${module}ToUpdate`);
    }, 300000);
    navigate(`/${module}/update/${id}`);
  };


  const dataSource = records.map((item) => ({
    ...item,
    key: item.id,
  }));

  const enhancedColumns = [
    ...cols,
    {
      title: 'Acciones',
      key: 'actions',
      render: (text, record) => (
        <span>
          {module === 'products' && <Button type='text' style={{ "color": "blue" }} onClick={() => showDrawer(record.name)}>Componentes</Button>}
          {module === 'diceases' && <Button type='text' style={{ "color": "blue" }} onClick={() => showDrawer(record.name)}>Productos</Button>}
          {/* {module === 'chemicals' &&  <Button type='text' style={{ "color": "blue" }} onClick={() => showDrawer(record.name)}>Componentes</Button>}   */}
          {/* {module === 'crops' && <Button type='text' style={{ "color": "blue" }} onClick={() => showDrawer(record.name)}>Productos</Button>} */}

          <Tooltip title="Editar" placement="bottom" >
            <Button type="text" style={{ "color": "blue" }} onClick={() => goUpdate(record.id)} >Editar</Button>
          </Tooltip>
          <Tooltip title="Detalles" placement="bottom" >
            <Button type="text" style={{ "color": "blue" }} onClick={() => navigate(`/${module}/details/${record.id}`)}>Detalles</Button>
          </Tooltip>

          {/* <Link to={`/${module}/update/${record.id}`}>
                        <Button type="link">Editar</Button>
                    </Link>
                    <Link to={`/${module}/details/${record.id}`}>
                        <Button type="link"> Detalles</Button>
                    </Link> */}
        </span>
      ),
    },
  ];

  return <div>
    <Table
      className='table-striped-rows'
      dataSource={dataSource}
      columns={enhancedColumns}

    />

  </div>
};

export default TableComponent;