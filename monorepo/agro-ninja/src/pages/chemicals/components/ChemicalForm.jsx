import React, { useEffect, useState } from "react";

import { Button, Form, Input, notification } from "antd";
import ChemicalService from "../../../services/Chemical.service.jsx";
import ImageUploader from "../../components/ImageUploader";
import { useNavigate } from "react-router-dom";
const noPhoto = require("../../../assets/images/diceases/no-photos.png"); // check the folder is for the module

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const ChemicalForm = ({
  isUpdate,
  chemical = null,
  addCatOrComp = null,
  onClose = null,
}) => {
  const [form] = Form.useForm();
  const [photoBinary, setPhotoBinary] = useState([]);
const navigate = useNavigate();
  const clearForm = () => {
    form.resetFields();
  };

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
        setPhotoBinary(chemical.photo);
      }
    };
    getInfo();
  }, []);

  const onFinish = (values) => {
    if (isUpdate) {
      values.id = chemical.id;
      if(values.photo !== photoBinary){
        values.photo = JSON.stringify(photoBinary);
      }
      return ChemicalService.Chemicals.updateChemical(values)
        .then((result) => {
          openNotification("Success", "Your Component has been updated");
          navigate(`/chemicals/details/${chemical.id}`)
        })
        .catch((error) => {
          console.log(error);
          openNotification("Fail", "Failed updating your Component  ");
        });
    } else {
      values.photo = photoBinary === "" ? noPhoto : JSON.stringify(photoBinary); // default no photo photo
      return ChemicalService.Chemicals.createChemical(values)
        .then((result) => {
          openNotification("Success", "Your Component has been created");
          if (addCatOrComp) {
            addCatOrComp("comp", values);
            clearForm();
            onClose();
          }
          navigate(`/chemicals/details/${chemical.id}`)

        })
        .catch((error) => {
          console.log(error);
          openNotification("Fail", "Failed creating your Component");
        });
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  const handleFileSelected = (photobinaries) => {
    setPhotoBinary(`${photobinaries}`);
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
              name: chemical?.name ?? "",
              photo: chemical?.photo ?? "",
              description: chemical?.description ?? "",
             
            }
          : null
      }
    >
      <Form.Item name={"photo"} label="Foto" rules={[{ required: false }]}>
        <ImageUploader onFileSelected={handleFileSelected} entity={chemical} />
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
        <>
        <Button type="primary" htmlType="submit" style={{ marginRight: "8px" }}>
          Guardar
        </Button>

        <Button htmlType="button" onClick={onReset}>
          Limpiar
        </Button>
        </>
      </Form.Item>
    </Form>
  );
};

export default ChemicalForm;
