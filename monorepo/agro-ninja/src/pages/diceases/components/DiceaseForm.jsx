import React, { useEffect, useState } from "react";

import { Button, Form, Input, notification } from "antd";
import { useNavigate } from "react-router-dom";
import DiceaseService from "../../../services/Dicease.service";
import ImageUploader1 from "../../components/ImageUploader1";
const noPhoto = require("../../../assets/images/diceases/no-photos.png"); // check the folder is for the module
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const DiceaseForm = ({ isUpdate, dicease = null }) => {
  const [form] = Form.useForm();
  const [photo, setPhoto] = useState("");
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

  useEffect(() => {
    const getInfo = async () => {
      if (isUpdate) {
        setPhoto(dicease.photo);
      }
    };
    getInfo();
  }, []);

  const onFinish = (values) => {
    if (isUpdate) {
      values.id = dicease.id;
      if (values.photo !== photo) {
        values.photo = photo;
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
      values.photo = photo || noPhoto; // default no photo photo
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

  const onReset = () => {
    form.resetFields();
  };

  const handleFileSelected = (photName) => {
    setPhoto(photName);
  };

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
        <ImageUploader1
          onFileSelected={handleFileSelected}
          initialPhoto={dicease?.photo || noPhoto}
          folder="diceases"
        />
        <input type="text" name="photo" value={photo} />
      </Form.Item>
      <Form.Item name="name" label="Nombre" rules={[{ required: true }]}>
        <Input />
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
          Submit
        </Button>

        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DiceaseForm;
