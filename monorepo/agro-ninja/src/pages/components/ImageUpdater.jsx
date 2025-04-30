
import React, { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload, setExistingImage, Space, Image } from 'antd';
import appConfig from '../../app.config';
import api from '../../services/api';

const ImageUpdater = ({ setFileName = null, module = "", file = null }) => {
    const uploadPath = appConfig.uploadPath;
    const [imageToUpload, setImageToUpload] = useState([]);
    const [existingImage, setExistingImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [uploading, setUploading] = useState(false);
    const [showButton, setShowButton] = useState(false);

    const handleUpload = async (options) => {
        const { file, onSuccess, onError } = options;
        const formData = new FormData();
        formData.append('file', file);
        formData.append('module', module);

        try {
            const response = await api.post(`${uploadPath}${module}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.status === 200) {
                const data = response.data;
                const name = data.file.filename;  
                const newFile = {
                    name,
                    url: `${appConfig.apiUrl}/upload${module}/${name}`,
                    thumbUrl: `${appConfig.apiUrl}/upload${module}/${name}`,
                    uid: name,
                    status: 'done'
                };
                
                //setExistingImage([newFile]);
                setImageUrl(newFile.url);
                setFileName(name);
                message.success('Image uploaded successfully!');
                onSuccess(newFile); // Pass the file object to onSuccess
            } else {
                throw new Error('Upload failed');
            }
        } catch (error) {
            console.error('Upload error:', error);
            message.error('Failed to upload image');
            onError(error);
        }
    };

    const handleChange = (info) => {
        console.log(info.file);
        if (info.file.status === 'removed') {
            setImageToUpload([]);
            setExistingImage(null);
            setShowButton(false);
            return;
        }
        if (info.file.status === 'uploading') {
            const uploadingFile = {
                ...info.file,
                status: 'uploading',
            }
            setExistingImage(null);
            setImageToUpload([uploadingFile]);
            return;

        }
        if (info.file.status === 'done') {


           
            return;
        }
    }

    const handleRemove = () => {
        setImageToUpload([]);
        setExistingImage(null);
        setShowButton(false);
        return true;
    }

    useEffect(() => {
        if (file) {
            setImageToUpload([file]);
            setExistingImage(file);
            setImageUrl(file.url);
            setShowButton(true);
        }
    }, [file,imageUrl]);

    return (
        <div>
            <Space>
                { <Image width={100} src={existingImage ? imageUrl : "" } />  }

                <Upload
                    fileList={imageToUpload}
                    customRequest={handleUpload}
                    onChange={handleChange}
                    onRemove={handleRemove}
                    multiple={false}
                    maxCount={1}
                >
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
            </Space>

        </div>
    )

}


export default ImageUpdater;