import React, { useEffect, useState } from "react";

import { Button, Form, Input, notification, Select,Divider } from "antd";
import { useNavigate } from "react-router-dom";
import appConfig from "../../../app.config";
import diseaseService from "../../../services/Disease.service";
import DiseaseTypeService from "../../../services/DiseaseType.service";
import ImageUploaderFB from "../../components/ImageUploaderFB";
import { PlusOutlined } from "@ant-design/icons";

const noPhoto = require("../../../assets/images/diseases/no-photos.png"); // check the folder is for the module
const module = appConfig.modules.diseases;

 
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


const DiseaseForm = ({ isUpdate, disease = null }) => {
  const [form] = Form.useForm();
  const [fileName, setFileName] = useState("");
  const [diseaseTypeModal, setdiseaseTypeModal] = useState(false);
  const [diseaseType, setdiseaseType] = useState([]);
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
        setFileName(disease.photo);
      }
      const diseaseTypes = await DiseaseTypeService.findAll();
      console.log(diseaseTypes);
      setdiseaseType(diseaseTypes);
    };
    getInfo();
  }, []);

  const onFinish = (values) => {
    if (isUpdate) {
      values.id = disease.id;
      if (values.photo !== fileName?.file?.name) {
        values.photo = fileName?.file?.name;
      }
      return diseaseService.diseases
        .update(values)
        .then((result) => {
          openNotification("Success", "Your disease has been updated");
          navigate(`/diseases/details/${result.id}`);
        })
        .catch((error) => {
          console.log(error);
          openNotification("Fail", "Failed updating your disease  ");
        });
    } else {

      values.photo = fileName?.file?.name; // default no photo photo
      return diseaseService.diseases
        .create(values)
        .then((result) => {
          openNotification("Success", "Has creado una nueva enfermedad");
          navigate(`/diseases/details/${result.id}`);
        })
        .catch((error) => {
          console.log(error);
          openNotification("Fail", "Failed creating your disease");
        });
    }
  };

  const onCancel = () => {
    console.log(isUpdate == true)
    isUpdate == true ? navigate('/diseases/find') : clearForm();
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
            name: disease?.name ?? "",
            photo: disease?.photo ?? "",
            description: disease?.description ?? "",
            diseaseTypeId: disease?.diseaseTypeId ?? "",
            // products: disease?.products ??"",
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
        <Select options={diseaseType.map((item) => ({ value: item.id, label: item.name }))}
          placeholder="Seleccione una clasificación"
          allowClear
          showSearch
          dropdownRender={(menu) => (
                            <>
                                {menu}
                                <Divider style={{ margin: '4px 0' }} />
                                <Button type="link" onClick={() => setdiseaseTypeModal(true)}>
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

export default DiseaseForm;
