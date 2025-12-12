import React from "react";
import { Image } from "antd";
import  noPhoto from "../../assets/images/no-photos.png";


const ImageViewer = ({ fileName = "", module = "", size = 200 }) => {
    const imageUrl = fileName
        ? fileName
        : noPhoto;

    return (
        <Image
            width={200}
            src={imageUrl}
            fallback={noPhoto}
            alt="Uploaded"
            placeholder={
                <Image
                    preview={false}
                    src={noPhoto}
                    width={size}
                />
            }
        />
    );
}
export default ImageViewer; 