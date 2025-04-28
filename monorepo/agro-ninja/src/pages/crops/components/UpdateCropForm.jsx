import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, message, notification } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import CropService from '../../../services/Crop.service';
import CropTypesService from '../../../services/CropType.service';
import ImageUploaderFB from '../../components/ImageUploaderFB';
import appConfig from '../../../app.config';
const module = appConfig.modules.crops;
const apiUrl = appConfig.apiUrl;

const { TextArea } = Input;

const UpdateCropForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const [cropTypes, setCropTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [cropTypesData, cropData] = await Promise.all([
          CropTypesService.getAll(),
          CropService.getById(id)
        ]);

        setCropTypes(cropTypesData);
        setInitialValues(cropData);
        setImageUrl(apiUrl+module+cropData.photo);
        form.setFieldsValue({
          name: cropData.name,
          description: cropData.description,
          cropTypeId: cropData.cropTypeId,
        });
      } catch (error) {
        notification.error({
          message: 'Error',
          description: 'Failed to load crop data'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, form]);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await CropService.update(id, {
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
    >
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

      <Form.Item label="Photo">
        <ImageUploaderFB
          setFileName={setImageUrl}
          module="crops"
          existingImagePath={imageUrl}
        />
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