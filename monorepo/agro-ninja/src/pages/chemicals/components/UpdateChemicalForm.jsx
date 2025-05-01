
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Space, Select } from "antd";
import ImageUpdater from "../../components/ImageUpdater";
import ChemicalService from "../../../services/Chemical.service";
import ChemicalTypesService from "../../../services/ChemicalTypes.service";
import appConfig from "../../../app.config";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";


const UpdateChemicalForm = ({ id }) => {
    const [form] = Form.useForm();
    const [fileName, setFileName] = useState("");
    const [currentChemical, setCurrentChemical] = useState(null);
    const [chemicalTypes, setChemicalTypes] = useState([]);
    const module = appConfig.modules.chemicals;
    const apiUrl = appConfig.apiUrl;
    const uploadPath = appConfig.uploadPath;
    const navigate = useNavigate();
  
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
      };

      const headLayout = {
        wrapperCol: { offset: 0, span: 12 },
      };
    // First useEffect for data fetching
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [chemical, types] = await Promise.all([
                    ChemicalService.findById(id),
                    ChemicalTypesService.getAll()
                ]);
                setFileName(chemical.photo);
                setCurrentChemical(chemical);
                setChemicalTypes(types.map(type => ({
                    value: type.id,
                    label: type.name
                })));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [id]);

    //  updates based on state changes
    useEffect(() => {
        if (currentChemical) {
            form.setFieldsValue({
                photo: fileName,
                name: currentChemical.name,
                description: currentChemical.description,
                type: currentChemical.chemicalType.id
            });
        }
    }, [currentChemical, fileName, form]);

    const onFinish = async (values) => {
        console.log(values);
        try {
            api.put(`${module}/${id}`, {
                id: id,
                photo: values.photo,
                name: values.name,
                description: values.description,
                type: values.type
            });
        } catch (error) {
            console.error('Error updating chemical:', error);
        }

    }


    return (
        <div>
            <Form form={form}
                onFinish={onFinish}
                autoComplete="off"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 8 }}
            >
                

                    <Form.Item name='imgUploader' {...headLayout} >
                        <ImageUpdater
                            setFileName={setFileName}
                            module={module}
                            file={{
                                name: fileName,
                                url: `${apiUrl}${uploadPath}${module}/${fileName}`,
                                thumbUrl: `${apiUrl}${uploadPath}${module}/${fileName}`,
                                uid: -1,
                                status: 'done'
                            }}
                        />
                    </Form.Item>
            
                <Form.Item name='photo' label='photo' hidden>
                    <Input type="text" placeholder="photo" />
                </Form.Item>
                <Form.Item name='name' label='Nombre'
                    rules={[{ required: true, message: "Este campo no puede estar vacío" }
                    ]}>
                    <Input type="text" placeholder="Name" />
                </Form.Item>
                <Form.Item name='description' label='Descripcion'
                    rules={[{ required: true, message: "Este campo no puede estar vacío" }
                    ]}>
                    <Input type="text" placeholder="Description" />
                </Form.Item>
                <Form.Item name='type' label='Tipo'
                    rules={[{ required: true, message: "Este campo no puede estar vacío" }
                    ]}>
                    <Select type="text" placeholder="Type" options={chemicalTypes} />
                </Form.Item>
                <Form.Item label=''{...tailLayout}>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            Guardar
                        </Button>
                        <Button variant="solid" color="danger"
                            onClick={() => {
                                navigate('/chemicals')
                            }}>
                            Cancelar
                        </Button>
                    </Space>
                </Form.Item>
            </Form>


        </div>
    )


}

export default UpdateChemicalForm;