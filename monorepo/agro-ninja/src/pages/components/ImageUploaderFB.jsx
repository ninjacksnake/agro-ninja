import React, { useState } from 'react';
import {UploadOutlined} from '@ant-design/icons';
import {Button, message, Upload, Space, Row} from 'antd';
import appConfig from '../../app.config';
import api from '../../services/api';
import axios from 'axios';


const ImageUploaderFB = ({setFileName=null, module ="", existingImagePath=null}) => {
  const uploadPath = appConfig.uploadPath;


  // Estado para controlar si se está subiendo un archivo
  const [uploading, setUploading] = useState(false);

 const handleUpload =  async (options) => { 
  
  const { file, onSuccess, onError } = options;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('module', module);

  setUploading(true);

  try {
    const response = await api.post(`${uploadPath}/${module}`,  formData , {headers: {'Content-Type': 'multipart/form-data'}});
    if (response.statusText === 'OK') {
      const data = response.data;
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
    
  <div style={{display:'flex', flexDirection:"row", justifyContent:"center"}}>
 
    <Upload
defaultFileList={[existingImagePath]}
      customRequest={handleUpload}
      listType="picture-circle"
      multiple={false}
      
      maxCount={1}
      onChange={setFileName}
      type="file"
     
 
    >
      <Button type='text' style={{textAlign:"match-parent"}} icon={<UploadOutlined />}>  </Button>
    </Upload>
    
  </div>

  );
};
   
export default ImageUploaderFB; 