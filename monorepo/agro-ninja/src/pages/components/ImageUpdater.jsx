
import React, { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload, Space, Image, Flex } from 'antd';
import appConfig from '../../app.config';
import api from '../../services/api';

const ImageUpdater = ({ setFileName = null, module = "", file = null }) => {
    const uploadPath = appConfig.uploadPath;
    const [imageObj, setImageObj] = useState(null);
    const [imageChange, setImageChange] = useState(false);

    const noPhoto = {
        name: "no-photo.png",
        url: `${appConfig.apiUrl}/upload/no-photo`,
        thumbUrl: `${appConfig.apiUrl}/upload/no-photo`,
        uid: "-1",
        status: 'done',
    };

    useEffect(() => {
        if (file && imageChange === false) {
            setImageObj(file);
        }
    }, [file]);

    const handleRequest = async (fileInfo) => {
        const formData = new FormData();
        formData.append('file', fileInfo.file);
        formData.append('module', module);
        try {
            const response = await api.post(`${uploadPath}${module}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (response.status === 200) {
                const data = response.data;
                console.log(data);
                const name = data.file.filename;
                console.log(name);
                const newImage = {
                    uid: -1,
                    name: name,
                    status: 'done',
                    url: data.file.imgUrl,
                }
                // Update both states together
                setImageObj(newImage);
                if (setFileName) {
                    setImageChange(true);
                    setFileName(name);
                }
                message.success('Image uploaded successfully');
            }
        } catch (error) {
            console.error('Upload error:', error);
            message.error('Failed to upload image');
            // Reset states on error
            setImageObj(null);
            if (setFileName) {
                setFileName("");
                setImageChange(false);
            }
        }
    }

    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            //  setImageUrl(null);
            return;
        }

    }
 
    return (
        <div style={{display:'flex', justifyContent:'center'}}>
            <Space >
                <Image
                    src={imageObj?.url}
                    width={100}
                    height={100}
                    fallback={noPhoto.url} />
                <Upload
                    customRequest={handleRequest}
                    maxCount={1}
                    onChange={handleChange}
                    fileList={imageObj ? [imageObj] : []}
                    onRemove={() => {
                        setImageObj(null);
                        if (setFileName) {
                            setFileName("");
                            setImageChange(false);
                        }
                    }}

                >
                    <Button>
                        <UploadOutlined /> Upload
                    </Button>
                </Upload>
            </Space>
        </div>
    );
}

export default ImageUpdater;