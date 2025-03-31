import React, { useEffect, useState } from "react";
import { Button, Form, Input, notification, Select } from "antd";
import { useNavigate } from "react-router-dom";
import appConfig from "../../../app.config";
import DiseaseTypeService from "../../../services/DiseaseType.service";
import DiseaseService from "../../../services/Disease.service";
import ImageUploaderFB from "../../components/ImageUploaderFB";


const noPhoto = require("../../../assets/images/diseases/no-photos.png"); // check the folder is for the module
const module = appConfig.development.modules.diseases;


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};         

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const DiseaseForm2 = ({ isUpdate, diseases = null }) => {
  //console.log("Dicease", diseases);
  const [form] = Form.useForm();
  const [fileName, setFileName] = useState("");
  const [deseaseTypes, setDiseaseTypes] = useState([]);
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
      const diseaseTypes = await DiseaseTypeService.diseaseTypes.findAll();
      setDiseaseTypes(diseaseTypes);
     // console.log(diseaseTypes);
    };
    getInfo();
  }, [isUpdate]);

  const onFinish = (values) => {
    if (isUpdate) {
      values.id = diseases.id;
      if (values.photo !== fileName?.file?.name) {
        values.photo = fileName?.file?.name;
      }
      return DiseaseService.diseases
        .update(values)
        .then((result) => {
          openNotification("Success", "Your diseases has been updated");
          navigate(`/diseases/details/${result.id}`);
        })
        .catch((error) => {
          console.log(error);
          openNotification("Fail", "Falla al actualizar el registro");
        });
    } else {
      values.photo = fileName?.file?.name; // default no photo photo
      return DiseaseService.diseases
        .create(values)
        .then((result) => {
          openNotification("Success", "Has creado un nuevo registro");
          navigate(`/diseases/details/${result.id}`);
        })
        .catch((error) => {
          console.log(error);
          openNotification("Fail", "Failed creating your diseases");
        });
    }
  };

  const onCancel = () => {
    console.log(isUpdate === true)
    isUpdate === true ? navigate('/diseases/find') : clearForm();
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
            diseaseTypeId: diseases?.diseaseType?.name ?? "",
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
      <Form.Item name="diseaseTypeId" label="Clasificación" rules={[{ required: true }]}>
        <Select options={deseaseTypes.map((diseaseType) => ({label: diseaseType.name, value: diseaseType.id}))}
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

export default DiseaseForm2;
