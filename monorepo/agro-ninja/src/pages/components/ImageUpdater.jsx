import React, { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';

import { Button, message, Upload, Space, Image } from 'antd';
import appConfig from '../../app.config';
import api from '../../services/api';
const uploadPath = appConfig.uploadPath;

const noPhoto = [{
    name: "no-photo.png",
    url: `${appConfig.apiUrl}/upload/no-photo`,
    thumbUrl: `${appConfig.apiUrl}/upload/no-photo`,
    uid: "-1",
    status: 'done',
}];
/* Imageupdater is a function to update any image to the server
* setFileName: function to set the file name in the parent component
* module: module name to upload the image 
* setNewFile: function to set the new file object in the parent component
* handleRequest: custom request function to handle the upload
* file: initial file object to display

*/


const ImageUpdater = ({ setFileName = null, setNewFile = null, setCurrentImage=null,   file = noPhoto, module="" }) => {
    
    console.log("ImageUpdater file:", file);
    console.log("filename:", file?.name);
   
    const handleChange = info => {
       setFileName(info.file.name);
    }

    const handleRequest = async (options) => {
        const { file, onSuccess, onError } = options;
        const formData = new FormData();
        formData.append('file', file);
        formData.append('module', module);
        try {
            const response = await api.post(`${uploadPath}${module}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
           // console.log('Upload response:', response);
            if (response.status === 200) {
                const newImage = {
                    uid: -1,
                    name: response?.data.file.filename,
                    thumbUrl: response?.data.file.imgUrl,
                    status: 'done',
                    url: response?.data.file.imgUrl,
                }
                if (typeof setCurrentImage === 'function') {
                    setCurrentImage([newImage]); // Pass the new image
                } else {
                    console.error('setCurrentImage is not a function');
                }
    
                message.success('Image uploaded successfully');
                onSuccess(response.data);
            }
        } catch (error) {
            console.error('Upload error:', error);
            message.error('Failed to upload image');
            onError(error);
        }
    };


    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Space >
          

                <Upload
                    fileList={[file]}
                    onChange={handleChange}
                    customRequest={handleRequest}
                    defaultFileList={file}
                    listType='picture'
                    
                >
                    <Button icon={<UploadOutlined />}>
                        Upload</Button>
                </Upload>
            </Space>
        </div>
    );
}

export default ImageUpdater;