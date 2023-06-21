import { Button, Col, Drawer, Form, Input, Row, Space } from "antd";
import categoryService from "../../../services/CategoriesService";

const AddCategoryDrawer = ({ open, onClose, openNotification , addCatOrComp}) => {
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };
  const onFinish = (values) => {
    // console.log("hey entonfces ", values);
    try {
       categoryService.Categories.Create(values)
        .then((result) => {
             //console.log(result)
            openNotification("Success", "El Registro ha sido actualizado");
        })
        .catch((error) => {
          console.log(error);
          openNotification("Fail", "El Registro no ha sido actualizado");
        });
       onReset();
       onClose();
       return addCatOrComp('cat', values);
       } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Drawer
        placement="left"
        title="Agregar nueva Categoría"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={onReset}>Limpiar</Button>
          </Space>
        }
      >
        <Form
          layout="vertical"
          // requiredMark="false"
          onFinish={onFinish}
          form={form}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Nombre"
                rules={[{ required: true, message: "Please enter user name" }]}
              >
                <Input placeholder="Por favor incluir la descripción aqui" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="description"
                label="Descripción"
                rules={[
                  { required: true, message: "Favor añadir una descripción" },
                ]}
              >
                <Input placeholder="Por favor incluir la descripción aqui" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="category"
                label="Tipo"
                rules={[{ required: false, message: "Favor colocar el tipo" }]}
              >
                <Input placeholder="Por favor escribir el tipo de la categoría aqui" />
              </Form.Item>
            </Col>
            <Col span={12}>
              </Col>
            <Col span={12}>
              <Form.Item>
                <Button type="primary" htmlType="submit"  style={{float: 'right'}}>
                  Guardar
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default AddCategoryDrawer;
