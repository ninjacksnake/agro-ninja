import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Upload, Button, message, Image } from "antd";

const ImageUploader = ({ onFileSelected ,  entity}) => {
  const [fileList, setFileList] = useState([]);
  const [currentImage, setCurrentImage] = useState([]);


useEffect(() =>{
  try {
    if (entity?.photo){
      setCurrentImage(JSON.parse(entity.photo))
    }
} catch (error) {
  console.error('image is not valid try to set image again')
}
}, [])

  const props = {
    name: "photo",
    accept: "image/png, image/jpeg",
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      return false;
    },
    onChange: (info) => {
      setFileList([info.fileList[info.fileList.length - 1]]);
      const imageReader = new FileReader();
      imageReader.onloadend = () => {
        const base64Image = imageReader.result;
        setCurrentImage(base64Image);
        onFileSelected(base64Image);
      };
      imageReader.readAsDataURL(
        info.fileList[info.fileList.length - 1].originFileObj
      );
    },
    
    fileList,
  };

  return (
    <>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      <Image src={currentImage} width={"7rem"} />
    </>
  );
};

export default ImageUploader;
