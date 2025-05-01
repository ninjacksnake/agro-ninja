import React, { useEffect, useState } from 'react';
import { Table, Space, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Api from '../../../services/api';

const ChemicalTable = ({ chemicals, loading, onDelete }) => {
  const [types, setTypes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  //console.log(chemicals)
  }, []);

  const onEdit = (chemical) => {
    console.log(chemical)
    navigate(`/chemicals/update/${chemical.id}`);

  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Type',
      dataIndex: ['chemicalType', 'name'],
      key: 'type',
      filters: types,
      onFilter: (value, record) => record.type === value,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="primary" 
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
          >
            Edit
          </Button>
          <Button 
            type="primary" 
            danger 
            icon={<DeleteOutlined />}
            onClick={() => onDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    }
  ];

  return (
    <Table
      columns={columns}
      dataSource={chemicals}
      loading={loading}
      rowKey="id"
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
      }}
      scroll={{ x: true }}
    />
  );
};

export default ChemicalTable;
