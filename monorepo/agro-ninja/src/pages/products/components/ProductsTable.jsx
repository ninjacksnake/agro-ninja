import { Button, Space, Table } from "antd"
import { Link } from 'react-router-dom'


const ProductsTable = ({ data }) => {
    const columns = [
        {
            title: 'Name',
            key: `name`,
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
                        <Button className="Action-Button-blue" size="small" >
                            <Link to={`/products/update/${record.id}`}>Editar</Link>
                        </Button>
                        <Button className="Action-Button-blue-dark" green size="small" >
                            <Link to={`/products/details/${record.id}`}>Detalles</Link>
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