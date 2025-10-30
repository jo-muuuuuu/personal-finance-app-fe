import React, { useRef, useState } from "react";
import { Modal, Button } from "antd";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const CropAvatar = ({ visible, originalImage, onCancel, onCropComplete }) => {
  const imgRef = useRef(null);
  const [crop, setCrop] = useState({ aspect: 1 });
  const [completedCrop, setCompletedCrop] = useState(null);

  const getCroppedImg = (image, crop, fileName) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            console.error("Canvas is empty");
            return;
          }
          blob.name = fileName;
          resolve(blob);
        },
        "image/jpeg",
        0.9
      );
    });
  };

  const handleCropComplete = async () => {
    if (!imgRef.current || !completedCrop?.width || !completedCrop?.height) {
      return;
    }

    try {
      const croppedImageBlob = await getCroppedImg(
        imgRef.current,
        completedCrop,
        "cropped-avatar.jpg"
      );
      onCropComplete(croppedImageBlob);
    } catch (error) {
      console.error("Error cropping image:", error);
    }
  };

  return (
    <Modal
      title="Crop Your Avatar"
      style={{ textAlign: "center" }}
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="crop" type="primary" onClick={handleCropComplete}>
          Confirm Crop
        </Button>,
      ]}
      width={600}
    >
      {originalImage && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ReactCrop
            crop={crop}
            onChange={(newCrop) => setCrop(newCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={1}
            circularCrop={true}
          >
            <img
              ref={imgRef}
              src={originalImage}
              alt="Crop preview"
              style={{ maxWidth: "100%", maxHeight: "400px" }}
            />
          </ReactCrop>
        </div>
      )}
      <div style={{ marginTop: "16px", textAlign: "center", color: "#666" }}>
        <p>Drag to select the area for your avatar</p>
      </div>
    </Modal>
  );
};

export default CropAvatar;
