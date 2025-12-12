import { UploadOutlined } from "@ant-design/icons";
import { Button, Image, message, Upload } from "antd";
import React, { useEffect, useState } from "react";

function fileParser(file) {
  // return new Promise((resolve, reject) => {
  //   try {
  // const imageReader = new FileReader();
  // imageReader.onloadend = () => {
  // const base64Image = imageReader.result;
  // console.log(base64Image);
  //   resolve(base64Image);
  // };
 ``  
  // imageReader.readAsDataURL(file);
  //   } catch (error) {
  //     reject(error);
  //   }
  // });
}

const ImageUploader = ({ onFileSelected,  module }) => {
  const [fileList, setFileList] = useState([]);
  const [currentImage, setCurrentImage] = useState([]);
  useEffect(() => {
    try {
      if (module?.photo) {
        setCurrentImage(module.photo);
      }
    } catch (error) {
      message.error("image is not valid try to set image again");
    }
  }, [module?.photo]);

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
      // fileParser(info.file)
      //   .then((parsed) => {
      onFileSelected(info.file);
      setCurrentImage(info.file);
      // setFileList((x) => [info.fileList[info.fileList.length - 1]]);
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
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
