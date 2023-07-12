import React from 'react';
import { Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import imageCompression from 'browser-image-compression';

const compressImage = async (file) => {
  try {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
      useWebWorker: true
    };
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error(error);
  }
};

const getBinary = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = () => {
      reject(reader.error);
    };
    reader.readAsArrayBuffer(file);
  });
};

const MyUploadComponent = () => {
  const handleBeforeUpload = async (file) => {
    const compressedFile = await compressImage(file);
    console.log('Compressed file size:', compressedFile.size / 1024 / 1024, 'MB');
    return compressedFile;
  };

  const handleChange = async (info) => {
    const { file } = info;
    if (file.status === 'done') {
      const binary = await getBinary(file.originFileObj);
      console.log('Compressed binary:', binary);
      // do something with binary
    }
  };

  return (
    <Upload
      name="file"
      multiple={true}
      action="/#"
      beforeUpload={handleBeforeUpload}
      onChange={handleChange}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
        band files
      </p>
    </Upload>
  );
};