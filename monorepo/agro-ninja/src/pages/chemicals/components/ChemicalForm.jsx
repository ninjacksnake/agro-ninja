import { Button, Form, Input, Select, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChemicalService from "../../../services/Chemical.service.jsx";
import ImageUploader1 from "../../components/ImageUploader1";
import ImageUploaderFB from "../../components/ImageUploaderFB.jsx";
import appConfig from "../../../app.config.js";
const noPhoto = require("../../../assets/images/no-photos.png");

const module = appConfig.development.modules.chemicals;

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
  isFromDrawer = false,
}) => {
  const [form] = Form.useForm();
  const [fileName, setFilename] = useState(""); // State to store the image URL
  const [chemicalTypes, setChemicalTypes] = useState([]);

  const navigate = useNavigate();
console.log(chemical)
  // Function to handle the form submission
  // Function to handle the form submission

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
      setFilename(chemical.photo);
    }
    const getInfo = async () => {
      const result = await ChemicalService.ChemicalTypes.findAll();
      console.log(result); // Add this line to log the result to the console
      setChemicalTypes(result);
    };
    getInfo();
  }, [isUpdate, chemical]);

  const onFinish = async (values) => {
    values.photo = fileName?.file?.name; // Add the image URL to the form values
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
        values.photo = fileName.file.name || noPhoto; // Use the uploaded photo or a default
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
        if (isFromDrawer == true) {
          onClose();
        } else {
          navigate(`/chemicals/details/${result.id}`);
        }
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

  const onCancel = () => {
    console.log(isUpdate == true)
    isUpdate == true ? navigate('/chemicals/find') : clearForm();
  }

  const handleFileSelected = (photoName) => {
    setFilename(photoName); // Set the uploaded photo URL
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
            chemicalTypeId: chemical?.chemicalType?.id || "",
          }
          : null
      }
    >
      <Form.Item name="photo" label="Foto" rules={[{ required: false }]}>
        <ImageUploaderFB
          setFileName={setFilename}
          module={module} />
        <input type="text" name="photo" value={fileName?.file?.name} hidden />
      </Form.Item>

      <Form.Item name="name" label="Nombre" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name= "chemicalTypeId" label="Tipo" rules={[{ required: true }]}>
        <Select
        allowClear
        placeholder="Seleccione un tipo de quimico"
        options={chemicalTypes.map((chemicalType) => ({label:chemicalType.name, value:chemicalType.id}))}
        
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

export default ChemicalForm;
