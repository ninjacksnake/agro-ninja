import React, { useState } from "react";

import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ImageUploader = (moduleName) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([
    // {
    //   uid: "-1",
    //   name: "medbottle2.png",
    //   status: "done",
    //   url: '../../assets/images/productsImages/medbottle2.png'
    //     // "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    // }
  ]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    console.log(
      file.url
    )
    try {
      if (file?.url && file?.preview) {
        file.preview = await getBase64(file.url);
        console.log(file.preview);
      }

      setPreviewImage(file.url || file.preview);
      setPreviewOpen(true);
      setPreviewTitle(
        file?.name || file.url?.substring(file.url?.lastIndexOf("/") + 1)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileUpload = (name) => {
    const relativePath = `../../assets/images/products/${name}`;
    console.log(relativePath);
       
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload
        action=""
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={(info) => {
         const name = info.file.name;
         handleFileUpload(name);
         setFileList([{
          uid: "-1",
             name: name,
             status: "done",
             url: '../../assets/images/products/medbottle2.png'
         }]);
        }}
        beforeUpload={() => false}
      >
        {fileList.length === 0 ? uploadButton : null}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default ImageUploader;
