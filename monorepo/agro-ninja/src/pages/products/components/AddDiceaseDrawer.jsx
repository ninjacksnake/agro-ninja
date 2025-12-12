import React, { useEffect, useState } from 'react'
import { Button, Col, Drawer, Form, Input, Row, Select, Space } from "antd";
import DiseaseService from '../../../services/Disease.service';
import ImageUploaderFB from '../../components/ImageUploaderFB';
import appConfig from '../../../app.config';
import DiseaseTypeService from '../../../services/DiseaseType.service';

const AddiseaseDrawer = ({ open, onClose, openNotification, addCatOrComp }) => {
  const [form] = Form.useForm();
  const [fileName, setFileName] = useState(null);
  const [diseaseTypes, setDiseaseTypes] = useState([]);
  const module = appConfig.modules.diseases;

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await DiseaseTypeService.findAll();
        setDiseaseTypes(response);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  },[])

  const onReset = () => {
    form.resetFields();
  };
  const onFinish = (values) => {
 
  values.photo = fileName;
    try {
      DiseaseService.create(values)
        .then((result) => {
          // console.log(result)
          openNotification("Success", "El Registro ha sido actualizado");
        })
        .catch((error) => {
          console.log(error);
          openNotification("Fail", "El Registro no ha sido actualizado");
        });
      onReset();
      onClose();
      return addCatOrComp('dic', values);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Drawer
        placement="left"
        title="Agregar nueva Enfermedad"
        width={500}
        onClose={onClose}
        open={open}

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
          <Form.Item name="photo" label="Foto" rules={[{ required: false }]}>
            <ImageUploaderFB
              setFileName={setFileName}
              module={module}
            />
          
          </Form.Item>
          <Row gutter={16}>
            <Col span={20}>
              <Form.Item
                name="name"
                label="Nombre"
                rules={[{ required: true, message: "Please enter name" }]}
              >
                <Input placeholder="Por favor incluir la descripción aqui" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={20}>
              <Form.Item
                name="description"
                label="Descripción"
                rules={[
                  { required: true, message: "Favor añadir una descripción" },
                ]}
              >
                <Input placeholder="Por favor incluir la descripción aqui" />
              </Form.Item>
           
              <Form.Item
                name="diseaseTypeId"
                label="Clasificación"
                rules={[{ required: false, message: "Favor colocar la clasificación" }]}
              >
                <Select placeholder="Seleccione una opción" 
                allowClear
                options={diseaseTypes.map((type) => ({label: type.name, value: type.id}))}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
            </Col>
            <Col span={12}>
              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ float: 'right' }}>
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


export default AddiseaseDrawer