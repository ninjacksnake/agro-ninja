import React, { useEffect, useState } from "react";

import { Button, Form, Input, notification, Select,Divider } from "antd";
import { useNavigate } from "react-router-dom";
import appConfig from "../../../app.config";
import DiceaseService from "../../../services/Dicease.service";
import ImageUploaderFB from "../../components/ImageUploaderFB";
import { PlusOutlined } from "@ant-design/icons";

const noPhoto = require("../../../assets/images/diceases/no-photos.png"); // check the folder is for the module
const module = appConfig.development.modules.diceases;


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const selectOptions = [
  { value: 1, label: <span>Plaga</span> },
  { value: 2, label: <span>Bactería</span> }
];


const DiceaseForm = ({ isUpdate, dicease = null }) => {
  const [form] = Form.useForm();
  const [fileName, setFileName] = useState("");
  const [DiceaseTypeModal, setDiceaseTypeModal] = useState(false);
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
        setFileName(dicease.photo);
      }
    };
    getInfo();
  }, []);

  const onFinish = (values) => {
    if (isUpdate) {
      values.id = dicease.id;
      if (values.photo !== fileName?.file?.name) {
        values.photo = fileName?.file?.name;
      }
      return DiceaseService.diceases
        .update(values)
        .then((result) => {
          openNotification("Success", "Your dicease has been updated");
          navigate(`/diceases/details/${result.id}`);
        })
        .catch((error) => {
          console.log(error);
          openNotification("Fail", "Failed updating your dicease  ");
        });
    } else {

      values.photo = fileName?.file?.name; // default no photo photo
      return DiceaseService.diceases
        .create(values)
        .then((result) => {
          openNotification("Success", "Has creado una nueva enfermedad");
          navigate(`/diceases/details/${result.id}`);
        })
        .catch((error) => {
          console.log(error);
          openNotification("Fail", "Failed creating your dicease");
        });
    }
  };

  const onCancel = () => {
    console.log(isUpdate == true)
    isUpdate == true ? navigate('/diceases/find') : clearForm();
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
            name: dicease?.name ?? "",
            photo: dicease?.photo ?? "",
            description: dicease?.description ?? "",
            // products: dicease?.products ??"",
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
        <Select options={selectOptions}
          dropdownRender={(menu) => (
                            <>
                                {menu}
                                <Divider style={{ margin: '4px 0' }} />
                                <Button type="link" onClick={() => setDiceaseTypeModal(true)}>
                                    <PlusOutlined /> Agregar clasificación
                                </Button>
                            </>
                            )}
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

export default DiceaseForm;
