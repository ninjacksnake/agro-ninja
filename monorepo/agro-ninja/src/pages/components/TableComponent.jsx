import React, { useEffect, useState, useMemo } from 'react';
import { Table, Button, Tooltip, message, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

const TableComponent = ({ data, columns, module, showDrawer }) => {
  const [dataSource, setDataSource] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!data?.length || !columns?.length || !module) {
      if (!module) {
        message.error("Module is empty");
        navigate('/');
      }
      setDataSource([]);
      return;
    }

    setDataSource(data.map((item) => ({
      ...item,
      key: item.id,
    })));
  }, [data, columns, module, navigate]);

  const goUpdate = async (id) => {
    localStorage.setItem(
      `Selected${module}ToUpdate`,
      JSON.stringify(data.find((record) => record.id === id))
    );

    setTimeout(() => {
      localStorage.removeItem(`Selected${module}ToUpdate`);
    }, 300000);
    navigate(`/${module}/update/${id}`);
  };

  const enhancedColumns = useMemo(() => [
    ...(columns || []),
    {
      title: 'Acciones',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Space size="small">
            {module === 'products' && (
              <Button
                color='default'
                variant='outlined'
                style={{ color: "blue" }}
                onClick={() => showDrawer(record.name)}
              >
                Componentes
              </Button>
            )}
            {module === 'diseases' && (
              <Button
                type='primary'
                
                style={{ color: "black", backgroundColor: "lightblue"  }}
                variant='outlined'
                size='small'
                onClick={() => showDrawer(record.name)}
              >
                Productos
              </Button>
            )}

            <Tooltip title="Editar" placement="bottom">
              <Button
              type='primary'
                style={{ color: "black", backgroundColor: "#7bc297" }}
                variant='outlined'
                size='small'
                onClick={() => goUpdate(record.id)}
              >
                Editar
              </Button>
            </Tooltip>
            <Tooltip title="Detalles" placement="bottom">
              <Button
              type='primary'
                color='default'
                style={{ color: "white",  }}
                variant='outlined'
                size='small'
                onClick={() => navigate(`/${module}/details/${record.id}`)}
              >
                Detalles
              </Button>
            </Tooltip>
          </Space>
        </span>
      ),
    },
  ], [columns, module, showDrawer, goUpdate, navigate]);

  return (
    <div>
      <Table
        className='table-striped-rows'
        dataSource={dataSource}
        columns={enhancedColumns}
        loading={!dataSource.length}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '30']
        }}
      />
    </div>
  );
};

export default TableComponent;