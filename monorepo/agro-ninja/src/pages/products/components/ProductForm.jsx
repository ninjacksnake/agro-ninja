import React, { useEffect, useState } from "react";

import { PlusCircleFilled } from "@ant-design/icons";
import { Button, Form, Input, notification, Select } from "antd";
import { useNavigate } from "react-router-dom";
import categoryService from "../../../services/CategoriesService";
import ChemicalService from "../../../services/Chemical.service";
import DiceaseService from "../../../services/Dicease.service";
import ProductService from "../../../services/Product.service";
import ImageUploader1 from "../../components/ImageUploader1";
import AddCategoryDrawer from "./AddCategoryDrawer";
import AddComponentDrawer from "./AddComponentDrawer";
import AddDiceaseDrawer from "./AddDiceaseDrawer";

const noPhoto = "../../../assets/images/no-photos.png";
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
  const [diceases, setDiceases] = useState([]);
  const [photo, setPhoto] = useState([]);
  const [openCCDrawer, setOpenCCDrawer] = useState(false); //CC = Create Category
  const [openCChemicalDrawer, setOpenCChemicalDrawer] = useState(false); //CCH = Create Chemical
  const [openDiceaseDrawer, setOpenDiceaseDrawer] = useState(false);
  const navigate = useNavigate();

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
  const openDicDrawer = () => {
    setOpenDiceaseDrawer(true);
  };

  const onCloseDiceaseDrawer = () => {
    setOpenDiceaseDrawer(false);
  };

  const openNotification = (title, body, reason = "") => {
    notification.open({
      message: `${title}`,
      description: `${body} ${reason}`,
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
      } else if (listName === "dic") {
        setDiceases([...diceases, values]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // function toBase64(arr) {
  //   arr = new Uint8Array(arr) //if it's an ArrayBuffer
  //   return btoa(
  //      arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
  //   );
  // }
  useEffect(() => {
    const getInfo = async () => {
      const dbChemicals = await ChemicalService.Chemicals.findAll();
      setComponents((ch) => dbChemicals);
      const dbCategories = await categoryService.Categories.FindAll();
      // console.log(categories);
      setCategories((ca) => dbCategories);
      const dbdiceases = await DiceaseService.diceases.findAll();
      setDiceases((d) => dbdiceases);
      if (isUpdate) {
        setPhoto(product?.photo);
      }
    };
    getInfo();
  }, [product?.photo, isUpdate]);

  const onFinish = (values) => {
    //console.log("onFinish", values);
    if (isUpdate) {
      values.id = product.id;
      if (values.photo !== photo) {
        values.photo = photo;
      }
      return ProductService.Products.updateProduct(values)
        .then((result) => {
          openNotification("Success", "El Producto ha sido actualizado");
          navigate(`/products/details/${values.id}`, { state: result });
        })
        .catch((error) => {
          console.log(error);
          openNotification("Fail", "El Producto no ha sido actualizado");
        });
    } else {
      values.photo = photo || noPhoto;
      return ProductService.Products.createProduct(values)
        .then((result) => {
          openNotification("Success", "El producto ha sido creado");
          navigate(`/products/details/${result.id}`, { state: result });
        })
        .catch((error) => {
          console.log(error);
          openNotification(
            "Fail",
            "El producto no ha sido creado, ",
            error.request.response
          );
        });
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  const handleFileSelected = (photo) => {
    setPhoto(photo);
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
                dossage: product?.dossage ?? 0,
                chemicals:
                  product?.chemicals.map((chemical) => chemical.name) ?? [],
                diceases:
                  product?.diceases.map((chemical) => chemical.name) ?? [],
              }
            : null
        }
      >
        <Form.Item name={"photo"} label="Foto" rules={[{ required: false }]}>
          <ImageUploader1
            onFileSelected={handleFileSelected}
            folder="products"
            initialPhoto={product?.photo || noPhoto}
          />
          <input type="text" name="photo" value={photo} hidden />
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
          name="diceases"
          label="Enfermedades"
          rules={[
            { required: true, message: "Este campo no puede estar vacío" },
          ]}
        >
          <Select
            name="diceases"
            mode="multiple"
            placeholder="Seleccionar una opción"
            allowClear
            //  defaultValue={}
          >
            {diceases.map((dicease, index) => {
              return (
                <Option value={dicease.name} key={index}>
                  {dicease.name}
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
            onClick={openDicDrawer}
          />
        </Form.Item>

        <Form.Item
          name="dossage"
          label="Dosificacion Recomendada"
          rules={[
            { required: true, message: "Este campo no puede estar vacío" },
          ]}
        >
          <Input placeholder="500ml/H" />
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
      <AddDiceaseDrawer
        open={openDiceaseDrawer}
        onClose={onCloseDiceaseDrawer}
        addCatOrComp={addToList}
      />
    </>
  );
};

export default ProductForm;
