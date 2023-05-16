import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Form, Input, Select, InputNumber } from "antd";

import ApiService from "../../../services/Api.service";
const Option = Select.Option;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const ProductForm = ({ isUpdate, product = null, id = null }) => {
  const [form] = Form.useForm();
  const [chemicals, setChemicals] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getInfo = async () => {
      const dbChemicals = await ApiService.Chemicals.findAll();
      setChemicals((c) => dbChemicals);
      const dbCategories = await ApiService.Categories.findAll();
      setCategories((c) => dbCategories);
    };
    getInfo();
  }, []);

 
  const onFinish = (values) => {
    console.log(values);
    values.id = product.id;
    if (isUpdate) {
    return  ApiService.Products.updateProduct(values)
        .then((result) => {})
        .catch((error) => {
          console.log(error);
        });
    }else{
    return  ApiService.Products.createProduct(values)
      .then((result) => {})
      .catch((error) => {
        console.log(error);
      });
    }
    };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      initialValues={isUpdate?{ name: product?.name ?? '',
        description: product?.description ?? '',
        category: product?.category ?? '',
        price: product?.price ?? 0,
        chemicals: product?.chemicals.map(chemical => chemical.name) ?? []}
        :null}
    >
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
      <Form.Item name="category" label="Categoría" rules={[{ required: true }]}>
        <Select
          placeholder="Select an option and change input text above"
          allowClear
        >
          {chemicals.map((categorie, index) => { //ojo con esto hay que chequear si es categoria en realidad o quimicos creo que es categoria pero se puso asi por probar
            return (
              <Option value={categorie.name} key={index}>
                {categorie.name}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item name="price" label="Precio" rules={[{ required: true }]}>
        <InputNumber
          placeholder="$1,000"
          formatter={(value) =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
        />
      </Form.Item>

      <Form.Item
        name="chemicals"
        label="Componentes"
        rules={[{ required: true }]}
      >
        <Select
          placeholder="Select an option and change input text above"
          mode="multiple"
          // defaultValue={product?.chemicals.map(chemical => chemical.name)}
          allowClear
        >
          {chemicals.map((chemical, index) => {
            return (
              <Option value={chemical.name} key={index}>
                {chemical.name}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.gender !== currentValues.gender
        }
      >
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

export default ProductForm;
