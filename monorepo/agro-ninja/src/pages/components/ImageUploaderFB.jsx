import React, { useState } from 'react';
import {UploadOutlined} from '@ant-design/icons';
import {Button, message, Upload, Space} from 'antd';
import appConfig from '../../app.config';


const ImageUploaderFB = ({setFileName, module =""}) => {
  const uploadPath = appConfig.development.uploadPath;
  const [uploading, setUploading] = useState(false);

 const handleUpload =  async (options) => { 
  
  const { file, onSuccess, onError } = options;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('module', module);

  setUploading(true);

  try {
    const response = await fetch(`${appConfig.development.apiUrl+uploadPath+module}`, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      setFileName(data.file.path); // Save the uploaded image path   
         
      message.success('Imagen Almacenada!');
      onSuccess('Imagen almacenada');
    } else {
      throw new Error('Error almacenando Imagen');
    }
  } catch (error) {
    console.error(error);
    message.error('Error almacenando imagen');
    onError(error);
  } finally {
    setUploading(false);
  }
 }

  return (
    
  <div>
 
    <Upload
      customRequest={handleUpload}
      listType="picture"
      maxCount={1}
      onChange={setFileName}
      type="file"
 
    >
      <Button icon={<UploadOutlined />}>Upload Photo</Button>
    </Upload>
    
  </div>

  );
};
   
export default ImageUploaderFB; 