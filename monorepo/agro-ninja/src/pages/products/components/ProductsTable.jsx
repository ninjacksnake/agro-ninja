import { Button, Space, Table } from "antd"
import { Link } from 'react-router-dom'


const ProductsTable = ({ data }) => {
    const columns = [
        {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
        }, {
            title: 'Description',
            key: 'description',
            dataIndex: 'description',
        }, {
            title: 'Category',
            key: 'category',
            dataIndex: ['category', 'name']
        },
        {
            title: 'Acciones',
            key: 'actions',
            render: (text, record) => (

                    <Space >
                        <Button type="primary" size="small">
                            <Link to={`/products/update/${record.id}`}>Editar</Link>
                        </Button>
                        <Button type="primary" danger size="small">
                            <Link to={`/products/details/${record.id}`}>Ver</Link>
                        </Button>
                    </Space>
            )

        }
    ];
    return (
        <Table
            // columns={columns}
            columns={columns
            }
            dataSource={data}
            className="table-striped-rows"
            loading={!data.length}

        />
    )
}
export default ProductsTable