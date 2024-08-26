import { IKContext, IKImage, IKUpload } from "imagekitio-react";
import React, { useState } from "react";
import Utils from "../../services/Utils";

const ImageUploader = ({
  onFileSelected,
  initialPhoto,
  folder,
  name = "newImage",
}) => {
  const [image, setImage] = useState(initialPhoto || "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const publicKey = Utils.publicKey;
  const authenticationEndpoint = Utils.authenticationEndpoint;
  const urlEndpoint = Utils.urlEndpoint;

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
    setUploading(true);
    setError("");
  };

  return (
    <div className="image-uploader">
      {uploading && <p className="loading-message">Uploading...</p>}
      {error && <p className="error-message">{error}</p>}

      <IKContext
        publicKey={publicKey}
        urlEndpoint={urlEndpoint}
        authenticator={authenticator}
      >
        {image && (
          <IKImage
            path={image}
            width="45%"
            style={{
              borderRadius: "5px",
              border: "solid 1px gray",
              margin: "10px",
            }}
          />
        )}

        <IKUpload
          fileName={`Chemical-${name}`}
          onError={onError}
          onSuccess={onSuccess}
          folder={folder}
          onUploadStart={handleUploadStart}
        />
      </IKContext>

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
