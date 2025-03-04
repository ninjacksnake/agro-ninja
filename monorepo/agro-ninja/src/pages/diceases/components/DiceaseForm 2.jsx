import React, { useEffect, useState } from "react";

import { Button, Form, Input, notification, Select } from "antd";
import { useNavigate } from "react-router-dom";
import appConfig from "../../../app.config";
import DiceaseService from "../../../services/Dicease.service";
import ImageUploaderFB from "../../components/ImageUploaderFB";

const noPhoto = require("../../../assets/images/diceases/no-photos.png"); // check the folder is for the module
const module = appConfig.development.modules.diceases;


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const DiceaseForm2 = ({ isUpdate, diseases = null }) => {
  console.log("Dicease", diseases);
  const [form] = Form.useForm();
  const [fileName, setFileName] = useState("");
  const navigate = useNavigate();

  const openNotification = (title, body) => {
    notification.open({
      message: `${title}`,
      description: `${body}`,
      placement: "topRight",
      style: {
        backgroundColor: title === "Error" ? "#EB8696" : "beige",
      },
    });
  };

  const clearForm = () => {
    form.resetFields();
  };


  useEffect(() => {
    const getInfo = async () => {
      if (isUpdate) {
        setFileName(diseases?.photo);
      }
    };
    getInfo();
  }, []);

  const onFinish = (values) => {
    if (isUpdate) {
      values.id = diseases.id;
      if (values.photo !== fileName?.file?.name) {
        values.photo = fileName?.file?.name;
      }
      return DiceaseService.diseasess
        .update(values)
        .then((result) => {
          openNotification("Success", "Your diseases has been updated");
          navigate(`/diseasess/details/${result.id}`);
        })
        .catch((error) => {
          console.log(error);
          openNotification("Fail", "Failed updating your diseases  ");
        });
    } else {

      values.photo = fileName?.file?.name; // default no photo photo
      return DiceaseService.diseasess
        .create(values)
        .then((result) => {
          openNotification("Success", "Has creado una nueva enfermedad");
          navigate(`/diseasess/details/${result.id}`);
        })
        .catch((error) => {
          console.log(error);
          openNotification("Fail", "Failed creating your diseases");
        });
    }
  };

  const onCancel = () => {
    console.log(isUpdate == true)
    isUpdate == true ? navigate('/diseasess/find') : clearForm();
  }

  return (
    <Form
      {...layout}
      form={form}
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      initialValues={
        isUpdate
          ? {
            name: diseases?.name ?? "",
            photo: diseases?.photo ?? "",
            description: diseases?.description ?? "",
            // products: diseases?.products ??"",
          }
          : null
      }
    >
      <Form.Item name="photo" label="Foto" rules={[{ required: false }]}>
        <ImageUploaderFB
          setFileName={setFileName}
          module={module}
        />
        <input type="text" name="photo" value={fileName?.file?.name} hidden />
      </Form.Item>
      <Form.Item name="name" label="Nombre" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="clasificacion" label="Clasificación" rules={[{ required: true }]}>
        <Select options={[
          { value: 1, label: <span>Plaga</span> },
          { value: 2, label: <span>Bactería</span> }
          
        ]}
        />
      </Form.Item>
      <Form.Item
        name="description"
        label="Descripción"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" style={{ marginRight: "8px" }}>
          Guardar
        </Button>

        <Button htmlType="button" onClick={onCancel}>
          Cancelar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DiceaseForm2;
