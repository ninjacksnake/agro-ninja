import React, { useEffect, useState } from "react";
import { Button, Form, Input, notification, Select } from "antd";
import { useNavigate } from "react-router-dom";
import appConfig from "../../../app.config";
import DiseaseTypeService from "../../../services/DiseaseType.service";
import DiseaseService from "../../../services/Disease.service";
import ImageUpdater from "../../components/ImageUpdater";



const noPhoto = require("../../../assets/images/diseases/no-photos.png"); // check the folder is for the module
const module = appConfig.modules.diseases;


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const UpdateDiseaseForm = ({ id }) => {
  //console.log("Dicease", diseases);
  const [form] = Form.useForm();
  const [disease, setDisease] = useState({});
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
      const [dbDisease, dbDiseaseTypes] = await Promise.all([
        DiseaseService.findById(id.id),
        DiseaseTypeService.findAll(),
      ]);
      console.log(dbDisease);
      if (dbDisease.id) {
        setDisease(dbDisease);
      }
      if (dbDiseaseTypes.length > 0) {
        setDiseaseTypes(dbDiseaseTypes);
      }
    };
    getInfo();
  }, [id]);

  useEffect(() => {
    if (disease.id) {
      form.setFieldsValue({
        name: disease.name,
        description: disease.description,
        diseaseTypeId: disease.diseaseTypeId,
        photo: disease.photo,
      });
    }
  }, [disease, fileName]);

  var existingImagePath = {
    name: disease?.photo,
    url: appConfig.apiUrl + "/upload/diseases/" + disease?.photo,
    thumbUrl: appConfig.apiUrl + "/upload/diseases/" + disease?.photo,
    uid: disease?.photo,
    status: 'done',
  };

  const onFinish = (values) => {

    values.id = disease.id;
    if (values.photo !== fileName) {
      //values.photo = disease ?? "";
    }
    return DiseaseService
      .update(values)
      .then((result) => {
        openNotification("Success", "Your diseases has been updated");
        navigate(`/diseases/details/${result.id}`);
      })
      .catch((error) => {
        console.log(error);
        openNotification("Fail", "Falla al actualizar el registro");
      });
  };

  const onCancel = () => {
    navigate('/diseases/find');   
  }

  return (
    <Form
      {...layout}
      form={form}
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
   
    >
   <Form.Item style={{justifyItems:'center'}} >

   
      <ImageUpdater
        setFileName={setFileName}
        module={module}
        file={existingImagePath}
        />
        </Form.Item>
      <Form.Item name="photo" label="" rules={[{ required: false }]} hidden >
        <Input type="text" name="photo" value={fileName}  />
      </Form.Item>
      <Form.Item name="name" label="Nombre" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="diseaseTypeId" label="Clasificación" rules={[{ required: true }]}>
        <Select options={deseaseTypes.map((diseaseType) => ({ label: diseaseType.name, value: diseaseType.id }))}
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

export default UpdateDiseaseForm;
