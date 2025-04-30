import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import CropService from '../../../services/Crop.service';
import CropTypeService from '../../../services/CropType.service';
import ImageUpdater from '../../components/ImageUpdater';
import appConfig from '../../../app.config';


const { TextArea } = Input;
const module = appConfig.modules.crops;
const apiUrl = appConfig.apiUrl;

const UpdateCropForm = ({ id }) => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [cropTypes, setCropTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [initialValues, setInitialValues] = useState(null);



    const handleImageUpload = (url) => {
        if(typeof(url) === 'object'){
            console.log(url)
            url = url.file.name;
        }
        setImageUrl(url);
       console.log(typeof(url))
        form.setFieldValue('photo', url);
    };
   
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [cropTypesData, cropData] = await Promise.all([
                    CropTypeService.getAll(),
                    CropService.findById(id.id)
                ]);

                setCropTypes((x)=>cropTypesData);
                setInitialValues((x)=>cropData);
               handleImageUpload(cropData?.photo);

                // Set form values after data is loaded
                if (cropData) {
                    form.setFieldsValue({
                        name: cropData.name,
                        description: cropData.description,
                        cropTypeId: cropData.cropTypeId,
                        photo: cropData.photo || '',
                    });
                }
            } catch (error) {
                console.error('Error loading crop data:', error);
                notification.error({
                    message: 'Error',
                    description: 'Failed to load crop data'
                });
            } finally {
                setLoading(false);
            }
        };

        if (id?.id) {
            fetchData();
        }
    }, [id, form ]);

  

    const onFinish = async (values) => {
        try {
            setLoading(true);
            await CropService.updateCrop(id.id, {
                ...values,
                photo: imageUrl
            });

            notification.success({
                message: 'Success',
                description: 'Crop updated successfully'
            });
            navigate('/crops');
        } catch (error) {
            notification.error({
                message: 'Error',
                description: 'Failed to update crop'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            disabled={loading}
            style={{ maxWidth: 600 }}
            initialValues={initialValues}
        >
            {console.log(initialValues)}
            <Form.Item
                name="photoUploader"
                label="Guardar Imagen"
                rules={[{ required: false }]}
            >
                {console.log('Initial values',initialValues)}
                <ImageUpdater
                    setFileName={handleImageUpload}
                    module={module}
                    existingImagePath={
                        initialValues?.photo ? {
                            url: `${apiUrl}/upload${module}/${initialValues.photo}`,
                            uid: initialValues.photo,  // Use the photo name as uid
                            name: initialValues.photo,
                            status: 'done',
                            thumbUrl: `${apiUrl}/upload${module}/${initialValues.photo}` // Add thumbUrl for preview
                        } : null
                    }
                />
            </Form.Item>

            <Form.Item
                name="photo"
                label="Photo">
            
                <Input  value={imageUrl}  />
            </Form.Item>


            <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Please input crop name!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true, message: 'Please input description!' }]}
            >
                <TextArea rows={4} />
            </Form.Item>

            <Form.Item
                name="cropTypeId"
                label="Crop Type"
                rules={[{ required: true, message: 'Please select crop type!' }]}
            >
                <Select>
                    {cropTypes.map(type => (
                        <Select.Option key={type.id} value={type.id}>
                            {type.name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Update Crop
                </Button>
                <Button
                    style={{ marginLeft: 8 }}
                    onClick={() => navigate('/crops')}
                >
                    Cancel
                </Button>
            </Form.Item>
        </Form>
    );
};

export default UpdateCropForm;