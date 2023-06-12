import React, { useEffect, useState } from "react";

import {
  Button,
  Form,
  Input,
  notification,

} from "antd";
import DeceaseService from "../../../services/Decease.service";
import ImageUploader from "../../components/ImageUploader";
const noPhoto = require("../../../assets/images/deceases/no-photos.png"); // check the folder is for the module

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const DeceaseForm = ({ isUpdate, decease = null }) => {
  const [form] = Form.useForm();
  const [photoBinary, setPhotoBinary] = useState([]);

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
      //  console.log(decease.photo)
        setPhotoBinary(decease.photo);
      }
    };
    getInfo();
  }, []);

  const onFinish = (values) => {
    if (isUpdate) {
      values.id = decease.id;
      values.photo = JSON.stringify(photoBinary);
     // console.log(values);
      return DeceaseService.Deceases.updateDecease(values)
        .then((result) => {
          openNotification("Success", "Your decease has been updated");
        })
        .catch((error) => {
          console.log(error);
          openNotification("Fail", "Failed updating your Decease  ");
        });
    } else {
      values.photo = photoBinary === "" ? noPhoto : JSON.stringify(photoBinary); // default no photo photo
      return DeceaseService.Deceases.createDecease(values)
        .then((result) => {
          openNotification("Success", "Your decease has been created");
        })
        .catch((error) => {
          console.log(error);
          openNotification("Fail", "Failed creating your Decease");
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
              name: decease?.name ?? "",
              photo: decease?.photo ?? "",
              description: decease?.description ?? "",
             // products: decease?.products ??"", 
            }
          : null
      }
    >
      <Form.Item name={"photo"} label="Foto" rules={[{ required: false }]}>
        <ImageUploader
          onFileSelected={handleFileSelected}
          entity={decease}
        />
        <br />
        {/* {isUpdate ? <Image src={photoBinary} alt="Image" width="100px" /> : ""} */}
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

export default DeceaseForm;
