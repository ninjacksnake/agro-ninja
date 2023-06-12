import React, { useEffect, useState } from "react";

import { Button, Form, Input, Select, InputNumber, notification } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import ApiService from "../../../services/Api.service";
import ImageUploader from "../../components/ImageUploader";
import AddCategoryDrawer from "./AddCategoryDrawer";
import AddComponentDrawer from "./AddComponentDrawer";
import ChemicalService from "../../../services/Chemical.service";
import categoryService from "../../../services/CategoriesService";
import DeceaseService from "../../../services/Decease.service";
import AddDeceaseDrawer from "./AddDeceaseDrawer";
const noPhoto = require("../../../assets/images/products/no-photos.png");
const Option = Select.Option;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const ProductForm = ({ isUpdate, product = null }) => {
  const [form] = Form.useForm();
  const [components, setComponents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [deceases, setDeceases] = useState([]);
  const [photoBinary, setPhotoBinary] = useState([]);
  const [openCCDrawer, setOpenCCDrawer] = useState(false); //CC = Create Category
  const [openCChemicalDrawer, setOpenCChemicalDrawer] = useState(false); //CCH = Create Chemical
  const [openDeceaseDrawer, setOpenDeceaseDrawer] = useState(false);

  const openCatDrawer = () => {
    setOpenCCDrawer(true);
  };
  const onCloseCatDrawer = () => {
    setOpenCCDrawer(false);
  };

  const openChemDrawer = () => {
    setOpenCChemicalDrawer(true);
  };
  const onCloseChemDrawer = () => {
    setOpenCChemicalDrawer(false);
  };

  const onCloseDeceaseDrawer = () => {
    setOpenDeceaseDrawer(false);
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

  const addToList = (listName, values) => {
    // console.log(selector, values);
    try {
      if (listName === "cat") {
        setCategories([...categories, values]);
      } else if (listName === "comp") {
        setComponents([...components, values]);
      }  else if (listName === "dec") {

      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getInfo = async () => {
      const dbChemicals = await ChemicalService.Chemicals.findAll();
      setComponents((ch) => dbChemicals);
      const dbCategories = await categoryService.Categories.FindAll();
      // console.log(categories);
      setCategories((ca) => dbCategories);
      const dbDeceases = await DeceaseService.Deceases.findAll();
      //  console.log(dbDeceases);
      setDeceases((d) => dbDeceases);
      if (isUpdate) {
        setPhotoBinary(product.photo);
      }
    };
    getInfo();
  }, []);

  const onFinish = (values) => {
    //console.log("onFinish", values);
    if (isUpdate) {
      values.id = product.id;
      values.photo = JSON.stringify(photoBinary);
      return ApiService.Products.updateProduct(values)
        .then((result) => {
          openNotification("Success", "El Registro ha sido actualizado");
        })
        .catch((error) => {
          console.log(error);
          openNotification("Fail", "El Registro no ha sido actualizado");
        });
    } else {
      values.photo = photoBinary === "" ? noPhoto : JSON.stringify(photoBinary); // default no photo photo
      return ApiService.Products.createProduct(values)
        .then((result) => {
          openNotification("Success", "El producto ha sido creado");
        })
        .catch((error) => {
          console.log(error);
          openNotification("Fail", "El producto no ha sido creado");
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
    <>
      <Form
        {...layout}
        form={form}
        //  name="control-hooks"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        initialValues={
          isUpdate
            ? {
                name: product?.name ?? "",
                photo: product?.photo ?? "",
                description: product?.description ?? "",
                imageLocation: product?.photo ?? "",
                category: product?.category ?? "",
                price: product?.price ?? 0,
                chemicals:
                  product?.chemicals.map((chemical) => chemical.name) ?? [],
              }
            : null
        }
      >
        <Form.Item name={"photo"} label="Foto" rules={[{ required: false }]}>
          <ImageUploader onFileSelected={handleFileSelected} entity={product} />
          <br />
          {/* {isUpdate ? <Image src={photoBinary} alt="Image" width="100px" /> : ""} */}
        </Form.Item>
        <Form.Item
          name="name"
          label="Nombre"
          rules={[
            { required: true, message: "El nombre no puede estar vacío" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Descripción"
          rules={[
            { required: true, message: "La descripción no puede estar vacío" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="category"
          label="Categoría"
          rules={[
            { required: false, message: "La categoría no puede estar vacío" },
          ]}
        >
          <Select
            name="category"
            placeholder="Seleccione una categoría"
            allowClear
            size="middle"
          >
            {categories.map((category, index) => (
              <Option value={category.name} key={index}>
                {" "}
                {category.name}{" "}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Argegar Categoría">
          <Button
            type="dashed"
            shape="round"
            icon={<PlusCircleFilled />}
            onClick={openCatDrawer}
            //style={{ marginLeft: 10, marginRight: 10, marginTop: 10 }}
          />
        </Form.Item>

        <Form.Item
          name="chemicals"
          label="Componentes"
          rules={[
            { required: true, message: "El quimico no puede estar vacío" },
          ]}
        >
          <Select
            name="chemicals"
            placeholder="Seleccionar un componente quimico"
            mode="multiple"
            // defaultValue={product?.chemicals.map(chemical => chemical.name)}
            allowClear
          >
            {components.map((chemical, index) => {
              return (
                <Option value={chemical.name} key={index}>
                  {chemical.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="Agregar Componente :">
          <Button
            type="dashed"
            shape="round"
            icon={<PlusCircleFilled />}
            onClick={openChemDrawer}
            //  style={{ marginLeft: 10, marginRight: 10, marginTop: 10 }}
          />
        </Form.Item>
        <Form.Item
          name="deceases"
          label="Enfermedades"
          rules={[
            { required: true, message: "Este campo no puede estar vacío" },
          ]}
        >
          <Select
            name="deceases"
            mode="multiple"
            placeholder="Seleccionar una opción"
            allowClear
          >
            {deceases.map((decease, index) => {
              return (
                <Option value={decease.name} key={index}>
                  {decease.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item label="Agregar Enfermedad :">
          <Button
            type="dashed"
            shape="round"
            icon={<PlusCircleFilled />}
            onClick={openChemDrawer}
            //  style={{ marginLeft: 10, marginRight: 10, marginTop: 10 }}
          />
        </Form.Item>

        <Form.Item
          name="price"
          label="Precio"
          rules={[
            { required: true, message: "El precio no puede estar vacío" },
          ]}
        >
          <InputNumber
            placeholder="$1,000"
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          />
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.gender !== currentValues.gender
          }
        ></Form.Item>
        <Form.Item {...tailLayout}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: "8px" }}
          >
            Guardar
          </Button>

          <Button htmlType="button" onClick={onReset}>
            Cancelar
          </Button>
        </Form.Item>
      </Form>
      <AddCategoryDrawer
        open={openCCDrawer}
        onClose={onCloseCatDrawer}
        openNotification={openNotification}
        addCatOrComp={addToList}
      />
      <AddComponentDrawer
        open={openCChemicalDrawer}
        onClose={onCloseChemDrawer}
        addCatOrComp={addToList}
      />
      <addDeceaseDrawer
        open={openDeceaseDrawer}
        onClose={onCloseDeceaseDrawer}
      />
    </>
  );
};

export default ProductForm;
