import { Button, Col, Drawer, Form, Input, Row, Select, Space } from "antd";
import ChemicalForm from "../../chemicals/components/ChemicalForm";

const AddComponentDrawer = ({ open, onClose, addCatOrComp }) => {
 
  return (
    <>
      <Drawer
        placement="left"
        title="Agregar nuevo componente quimico"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancelar</Button>
          </Space>
        }
      >
        <ChemicalForm addCatOrComp={addCatOrComp} onClose={onClose}/>
      </Drawer>
    </>
  );
};

export default AddComponentDrawer;
