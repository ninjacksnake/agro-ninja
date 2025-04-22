
import React, { useState } from "react";
import { Upload , Button, message, UploadProps} from "antd";
import { UploadOutlined } from "@ant-design/icons"
import appConfig from "../../app.config";


const ImageUploader = ({
  onFileSelected,
  initialPhoto,
  folder,
  name = "newImage",
}) => {
  const [image, setImage] = useState(initialPhoto || "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [fileList, setFileList] = useState([]);
  const authenticationEndpoint = appConfig.authenticationEndpoint;
  // const urlEndpoint = Utils.urlEndpoint;

  //const handleChange = UploadProps['onChange'] = ({})

  const handleUpload = async () => {
    console.log('Clicked', 'filelist_length = '+fileList.length)
    setUploading(true);
    setError("");
    
    if (fileList.length === 0) {
      message.error("Please select at least one photo!");
      setUploading(false);
      return;
    }
  };


  const authenticator = async () => {
    try {
      const response = await fetch(authenticationEndpoint);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error) {
      throw new Error(`Authentication request failed: ${error.message}`);
    }
  };

  const onError = (err) => {
    console.error("Upload Error:", err);
    setUploading(false);
    setError("Failed to upload image. Please try again.");
  };

  const onSuccess = (res) => {
    console.log("Upload Success:", res);
    setImage(res.filePath);
    setUploading(false);
    setError("");
    onFileSelected(res.filePath);
  };

  const handleUploadStart = () => {
   
  };

  return (
    <div className="image-uploader">
      {uploading && <p className="loading-message">Uploading...</p>}
      {error && <p className="error-message">{error}</p>}


  <Upload
        multiple
        beforeUpload={(file) => {
          setFileList((prev) => [...prev, file]);
          return false; // Prevent automatic upload
        }}
      >
        <Button icon={<UploadOutlined />}>Foto</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        style={{ marginTop: 16 }}
      >
        Guardar Foto
      </Button>

      <style jsx>{`
        .image-uploader {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .loading-message {
          color: blue;
          font-size: 14px;
          margin-bottom: 10px;
        }
        .error-message {
          color: red;
          font-size: 14px;
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
};

export default ImageUploader;
