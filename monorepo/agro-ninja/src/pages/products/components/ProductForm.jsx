import React, { useEffect, useState } from "react";

import { PlusCircleFilled } from "@ant-design/icons";
import { Button, Form, Input, notification, Select } from "antd";
import { useNavigate } from "react-router-dom";
import CategoryService from "../../../services/CategoriesService";
import ChemicalService from "../../../services/Chemical.service";
import DiseaseService from "../../../services/Disease.service";
import ProductService from "../../../services/Product.service";
import AddCategoryDrawer from "./AddCategoryDrawer";
import AddComponentDrawer from "./AddComponentDrawer";
import AddDiceaseDrawer from "./AddDiceaseDrawer";
import ImageUploaderFB from "../../components/ImageUploaderFB";
import appConfig from "../../../app.config";
import CropService from "../../../services/Crop.service";


const noPhoto = "../assets/images/no-photos.png";

const Option = Select.Option;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const ProductForm = ({id}) => {
  const defaultDirectory = "../assets/images/products/";
  const [form] = Form.useForm();
  const [components, setComponents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [crops, setCrops] = useState([]);
  const [diceases, setDiceases] = useState([]);
  const [fileName, setFileName] = useState(" ");
  const [openCCDrawer, setOpenCCDrawer] = useState(false); //CC = Create Category
  const [openCChemicalDrawer, setOpenCChemicalDrawer] = useState(false); //CCH = Create Chemical
  const [openDiceaseDrawer, setOpenDiceaseDrawer] = useState(false);
  const [openCropsDrawer, setOpenCropsDrawer] = useState(false);
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  // open drawer functions
  const openCatDrawer = () => {
    setOpenCCDrawer(true);
  };
  // close drawer cat
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

  const openCropDrawer = () => {
    setOpenCropsDrawer(true);
  };
  const onCloseCropDrawer = () => {
    setOpenCropsDrawer(false);
  };

  // notification functions
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

  const clearForm = () => {
    form.resetFields();
  };


  // function to add to list
  const addToList = (listName, values) => {
    // console.log(selector, values);
    try {
      if (listName === "cat") {
        setCategories([...categories, values]);
      } else if (listName === "comp") {
        setComponents([...components, values]);
      } else if (listName === "dic") {
        setDiceases([...diceases, values]);
      }else if (listName === "crop"){
        setCrops([...crops, values])
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get info from db
  useEffect(() => {
    const getInfo = async () => {
      const product = await ProductService.findById(id)
      const dbChemicals = await ChemicalService.findAll();
      setComponents((ch) => dbChemicals);
      const dbCategories = await CategoryService.FindAll();
      // console.log(categories);
      setCategories((ca) => dbCategories);
      const dbdiceases = await DiseaseService.findAll();
      setDiceases((d) => dbdiceases);
      const dbCrops = await CropService.findAll();
      setCrops(dbCrops);
    };
    getInfo();

  }, []);

  // function to finish the form
  const onFinish = (values) => {
      values.photo = fileName?.file?.name || "";
      return ProductService.createProduct(values)
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
    // }
  };

  // function to reset the form
  const onCancel = () => {
    navigate('/products/find');
  }

  const module = appConfig.modules.products;

  //component ui
  return (
    <>
      <Form
        {...layout}
        form={form}
        //  name="control-hooks"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
     // }
      // initialValues={
      //   isUpdate
      //     ? {
      //       name: product?.name ?? "",
      //       photo: product?.photo ?? "",
      //       description: product?.description ?? "",
      //       imageLocation: product?.photo ?? "",
      //       category: product?.category ?? "",
      //       dossage: product?.dossage ?? 0,
      //       chemicals:
      //         product?.chemicals?.map((chemical) => chemical.name) ?? [],
      //       diceases:
      //         product?.diceases?.map((chemical) => chemical.name) ?? [],
      //       crops: product?.crops?.map((crop) => crop.id) ?? []
      //     }
      //     : null
      >
        <Form.Item name="photo" label="Foto" rules={[{ required: false }]}>
          <ImageUploaderFB setFileName={setFileName} module={module} />
          <input type="text" name="photo" value={fileName?.file?.name} hidden />

          {/*  Image uploader Component */}
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
          name="categoryId"
          label="Categoría"
          rules={[
            { required: false, message: "La categoría no puede estar vacío" },
          ]}
        >
          <Select
            placeholder="Seleccione una categoría"
            allowClear
            size="middle"
          >
            {/* {console.log('Hya cat', categories)} */}
            {categories.map((category, index) => (
              <Option value={category.id} key={category.id}>
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
                <Option value={chemical.name} key={chemical.id}>
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
                <Option value={dicease.name} key={dicease.id}>
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

        {/* Crops select  */}
        <Form.Item
          name="crops"
          label="Cultivos"
          rules={[
            { required: false, message: "Los cultivos no pueden estar vacío" },
          ]}
        >
          <Select
            name="crops"
            placeholder="Seleccionar un cultivo"
            mode="multiple"
            // defaultValue={product?.chemicals.map(chemical => chemical.name)}
            allowClear
          >
            {crops.map((crop, index) => {
              return (
                <Option value={crop.id} key={crop.id}>
                  {crop.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        {/* Dossage Input */}
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

          <Button htmlType="button" onClick={onCancel}>
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
        openNotification={openNotification}
      />
      <AddDiceaseDrawer
        open={openDiceaseDrawer}
        onClose={onCloseDiceaseDrawer}
        addCatOrComp={addToList}
        openNotification={openNotification}
      />
    </>
  );
};

export default ProductForm;
