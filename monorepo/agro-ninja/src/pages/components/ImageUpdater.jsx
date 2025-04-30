
import React, { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import appConfig from '../../app.config';
import api from '../../services/api';

const ImageUpdater = ({ setFileName = null, module = "", file = null }) => {
    // const uploadPath = appConfig.uploadPath;
     const [fileList, setFileList] = useState([]);
     useEffect(() => {
        if (file) {
            const name = file.name;
            setFileList([{
                name,
                url: `${appConfig.apiUrl}/upload${module}/${name}`,
                thumbUrl: `${appConfig.apiUrl}/upload${module}/${name}`,
                uid: name || '-1',
                status: 'done'
            }]);
            console.log('File list ',fileList);
        } else {
            setFileList([{}]);
        }
     },[file])

     const handleUpload = async (options) => {
         
     }

    const noPhoto = {
        name: "no-photo.png",
        url: `${appConfig.apiUrl}/upload/no-photo`,
        thumbUrl: `${appConfig.apiUrl}/upload/no-photo`,
        uid: "-1",
        status: 'done',
    };

    const onchange = (info) => {
        const { file } = info;

        if (file.status ==='uploading') {
            console.log(info.file, info.fileList);
            //setFileName("");

        }
    }

    // useEffect(() => {
    //     if (existingImagePath !== null) {
    //         const name = typeof existingImagePath === 'string' ? existingImagePath : existingImagePath.name;
    //         setFileList([{
    //             name,
    //             url: `${appConfig.apiUrl}/upload/${module}/${name}`,
    //             thumbUrl: `${appConfig.apiUrl}/upload/${module}/${name}`,
    //             uid: name || '-1',
    //             status: 'done'
    //         }]);
    //     } else {
    //         setFileList([noPhoto]);
    //     }
    // }, [existingImagePath,  module]);

    // const handleUpload = async (options) => {
    //     const { file, onSuccess, onError } = options;
    //     const formData = new FormData();
    //     formData.append('file', file);
    //     formData.append('module', module);

    //     try {
    //         const response = await api.post(`${uploadPath}${module}`, formData, {
    //             headers: { 'Content-Type': 'multipart/form-data' }
    //         });

    //         if (response.status === 200) {
    //             const data = response.data;
    //             const name = data.file.filename;
                
    //             const newFile = {
    //                 name,
    //                 url: `${appConfig.apiUrl}/upload/${module}/${name}`,
    //                 thumbUrl: `${appConfig.apiUrl}/upload/${module}/${name}`,
    //                 uid: name,
    //                 status: 'done'
    //             };
                
    //             setFileList([newFile]);
    //             setFileName(name);
    //             message.success('Image uploaded successfully!');
    //             onSuccess(newFile); // Pass the file object to onSuccess
    //         } else {
    //             throw new Error('Upload failed');
    //         }
    //     } catch (error) {
    //         console.error('Upload error:', error);
    //         message.error('Failed to upload image');
    //         onError(error);
    //     }
    // };

    // const handleChange = (info) => {
    //     const { file } = info;
        
    //     if (file.status === 'removed') {
    //         setFileList([noPhoto]);
    //         setFileName("");
    //         return;
    //     }

    //     if (file.status === 'uploading') {
    //         const uploadingFile = {
    //             ...file,
    //             status: 'uploading'
    //         };
    //         setFileList([uploadingFile]);
    //         return;
    //     }

    //     // Don't handle 'done' state here as it's handled in handleUpload
    // };

    return (
        <div style={{ display: 'flex', flexDirection: "row", justifyContent: "center" }}>
            <Upload
                fileList={fileList}
                customRequest={handleUpload}
                listType="picture-circle"
                multiple={false}
                maxCount={1}
              //  onChange={handleChange}
                onRemove={() => {
                    setFileList([noPhoto]);
                    setFileName("");
                    return true;
                }}
            >
                <Button 
                    type='text' 
                    style={{ textAlign: "center" }} 
                    icon={<UploadOutlined />}
                />
            </Upload>
        </div>
    );
};

export default ImageUpdater;