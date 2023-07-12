import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Upload, Button, message, Image } from "antd";
import ImageResizer from "../../utils/ImageResizer";
function fileParser(file) {
  return new Promise((resolve, reject) => {
    try {
      const imageReader = new FileReader();
      imageReader.onloadend = () => {
        const base64Image = imageReader.result;
        console.log(base64Image)
        resolve(base64Image);
      };
      imageReader.readAsDataURL(file);
    } catch (error) {
      reject(error);
    }
  });
}

const ImageUploader = ({ onFileSelected, entity }) => {
  const [fileList, setFileList] = useState([]);
  const [currentImage, setCurrentImage] = useState([]);
  useEffect(() => {
    try {
      if (entity?.photo) {
        setCurrentImage(JSON.parse(entity.photo));
      }
    } catch (error) {
      message.error("image is not valid try to set image again");
    }
  }, [entity?.photo]);

  const props = {
    preview: false,
    name: "photo",
    listType: "picture",
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
      fileParser(info.file)
        .then((parsed) => {
             console.log(parsed)
              onFileSelected(parsed);
              setCurrentImage(parsed);
              setFileList(x => [info.fileList[info.fileList.length - 1]])    
        })
        .catch((err) => {
          console.log(err);
        });
    },
  };

  return (
    <>
      <Image src={currentImage} width={"7rem"} />
      <br />
      <br />
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Seleccionar Archivo</Button>
      </Upload>
      {/* <img src={currentImage} alt="Photos" /> */}
    </>
  );
};

export default ImageUploader;
