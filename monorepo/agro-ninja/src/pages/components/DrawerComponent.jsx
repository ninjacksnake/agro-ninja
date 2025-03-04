import React from 'react';
import { Drawer, Button, Table } from 'antd';

const DrawerComponent = ({ open, onClose, title, columns, data, caption}) => {
    return (
        <Drawer
            title={title}
            placement="right"
            closable={true}
            onClose={onClose}
            open={open}
            width={720}
        >
            {/* <Button onClick={onClose} style={{ marginBottom: 16 }}>
                Close
            </Button> */}
            <Table columns={columns} dataSource={data} bordered caption={caption}  />
        </Drawer>
    );
};

export default DrawerComponent;