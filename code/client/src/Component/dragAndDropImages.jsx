import React, { useState, useEffect } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { useTranslation } from 'react-i18next';

const { Dragger } = Upload;

const DragAndDrop = ({ onImagesChange }) => {
  const {t} = useTranslation();
  const [images, setImages] = useState([]);
  const [fileList, setFileList] = useState([]);

  const processImages = (files) => {
    const processFiles = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({ base64: reader.result, uid: file.uid });
        };
        reader.readAsDataURL(file instanceof File ? file : file.originFileObj);
      });
    });

    Promise.all(processFiles).then(results => {
      const newBase64Images = results.map(result => ({
        base64: result.base64,
        uid: result.uid
      }));
      
      const uniqueNewImages = newBase64Images.filter(newImg => 
        !images.some(img => img.base64 === newImg.base64)
      );

      if (uniqueNewImages.length > 0) {
        const updatedImages = [...images, ...uniqueNewImages];
        setImages(updatedImages);
        onImagesChange(updatedImages.map(img => img.base64));
        message.success('Images processed successfully.');
      }
    });
  };

  const handleOnChange = (info) => {
    const { fileList: newFileList } = info;
    setFileList(newFileList);

    // Handle removal
    if (info.file.status === 'removed') {
      const updatedImages = images.filter(img => img.uid !== info.file.uid);
      setImages(updatedImages);
      onImagesChange(updatedImages.map(img => img.base64));
      message.success('Image removed successfully.');
      return;
    }

    // Handle new files
    const newFiles = newFileList.filter(file => file.status !== 'removed');
    processImages(newFiles);
  };

  const handleDrop = e => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).map(file => ({
      ...file,
      uid: `${Date.now()}-${Math.random()}`
    }));
    processImages(files);
  };

  return (
    <Dragger
      name="file"
      multiple
      accept="image/*"
      beforeUpload={() => false}
      onChange={handleOnChange}
      onDrop={handleDrop}
      fileList={fileList}
      onRemove={true}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">{t("components.drag_drop_images.title")}</p>
      <p className="ant-upload-hint">
        {t("components.drag_drop_images.subtitle")}
      </p>
    </Dragger>
  );
};


export default DragAndDrop;