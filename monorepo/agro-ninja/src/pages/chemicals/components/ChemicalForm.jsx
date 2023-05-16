import React from "react";
import { Button, Form, Input, notification } from "antd";
import ApiService from "../../../services/Api.service";


const ChemicalForm = () => {


  const openNotification = (title, body )  => {
   notification.open({
      message: `${title}`,
      description: `${body}`,
      placement:'topRight',
      style:{
        backgroundColor: title === 'Error'? '#EB8696':'beige'
      }
    });
  };

  const onfinish = (values) => {
    console.log(values);
    return ApiService.Chemicals.createChemical(values)
      .then((result) =>{ 
        console.log(result)
        openNotification('Success','Your Chemical has been created')
      })
      .catch((err) => {
        console.log(err)
        openNotification('Error','Your Chemical creation failed')
      });
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  const [form] = Form.useForm();

  return (
    
    <Form
      {...layout}
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      style={{ maxWidth: 600 }}
      onFinish={onfinish}
      name="add_chem_form"
    >
      <Form.Item label="Nombre :" name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Descripción :"
        name="description"
        rules={[{ required: true }]}
      >
        <Input name="description" />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button
          type="primary"
          htmlType="submit"
          style={{ marginLeft: "10.5rem", clear: "both" }}
        >
          Guardar
        </Button>
      </Form.Item>
    </Form>
    
  );
};

export default ChemicalForm;
