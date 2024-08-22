import { IKContext, IKImage, IKUpload } from "imagekitio-react";
import React, { useState } from "react";

const ImageUploader = ({
  onFileSelected,
  initialPhoto,
  folder,
  name = "newImage",
}) => {
  const [image, setImage] = useState(initialPhoto || "");
  const [uploading, setUploading] = useState(false);

  //const authenticationEndpoint = "http://localhost:3004/auth";
  const authenticationEndpoint = "https://agroninjaapi.onrender.com/";
  const publicKey = "public_6/9NIuIR3FHdww7FEDSO88fb9vA=";
  const urlEndpoint = "https://ik.imagekit.io/kr9btn6cw/agroninja/auth";

  const authenticator = async () => {
    try {
      // You can pass headers as well and later validate the request source in the backend, or you can use headers for any other use case.

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
    console.log("Error", err);
  };
  const onSuccess = (res) => {
    console.log("Success", res);
    setImage(res.filePath);
    onFileSelected(res.filePath);
  };

  return (
    <div>
      <IKContext
        publicKey={publicKey}
        urlEndpoint={urlEndpoint}
        authenticator={authenticator}
      >
        <IKImage
          path={image}
          width={"45%"}
          style={{
            borderRadius: "5px",
            border: "solid 1px gray",
            margin: "10px",
          }}
        />

        <IKUpload
          fileName={`Chemical-${name}}`}
          onError={onError}
          onSuccess={onSuccess}
          folder={folder}
        />
      </IKContext>
    </div>
  );
};

export default ImageUploader;
