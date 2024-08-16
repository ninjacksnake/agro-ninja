import { Button, Form, Input, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChemicalService from "../../../services/Chemical.service.jsx";
import ImageUploader1 from "../../components/ImageUploader1";
const noPhoto = require("../../../assets/images/no-photos.png");

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
  const [photo, setPhoto] = useState(""); // State to store the image URL
  const navigate = useNavigate();

  const clearForm = () => {
    form.resetFields();
  };

  const openNotification = (title, body) => {
    notification.open({
      message: title,
      description: body,
      placement: "topRight",
      style: {
        backgroundColor: title === "Error" ? "#EB8696" : "beige",
      },
    });
  };

  useEffect(() => {
    if (isUpdate && chemical) {
      setPhoto(chemical.photo);
    }
  }, [isUpdate, chemical]);

  const onFinish = async (values) => {
    values.photo = photo; // Add the image URL to the form values

    try {
      if (isUpdate) {
        values.id = chemical.id;
        await ChemicalService.Chemicals.updateChemical(values);
        openNotification(
          "Success",
          "Has actualizado el quimico sastifactoriamente"
        );
        navigate(`/chemicals/details/${chemical.id}`);
      } else {
        values.photo = photo || noPhoto; // Use the uploaded photo or a default
        const result = await ChemicalService.Chemicals.createChemical(values);
        openNotification(
          "Success",
          "El quimico ha sido creado sastifactoriamente"
        );
        if (addCatOrComp) {
          addCatOrComp("comp", values);
          clearForm();
          onClose();
        }
        navigate(`/chemicals/details/${result.id}`);
      }
    } catch (error) {
      console.log(error);
      openNotification(
        "Fail",
        isUpdate
          ? "Failed updating your Component"
          : "Failed creating your Component"
      );
    }
  };

  const onReset = () => {
    clearForm();
  };

  const handleFileSelected = (photoName) => {
    setPhoto(photoName); // Set the uploaded photo URL
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
              name: chemical?.name || "",
              photo: chemical?.photo || "",
              description: chemical?.description || "",
            }
          : null
      }
    >
      <Form.Item name="photo" label="Foto" rules={[{ required: false }]}>
        <ImageUploader1
          onFileSelected={handleFileSelected}
          initialPhoto={chemical?.photo || ""}
          folder="chemicals"
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
          Guardar
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Limpiar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ChemicalForm;
