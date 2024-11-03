import React, { useState, useEffect } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { useTranslation } from 'react-i18next';

const { Dragger } = Upload;

const DragAndDrop = ({ onImagesChange }) => {
  const {t} = useTranslation();
  const [images, setImages] = useState([]);

  const handleOnChange = (info) => {
    const fileList = Array.isArray(info.fileList) ? info.fileList : [info.file];

    fileList.forEach(fileInfo => {
      const file = {
        ...fileInfo,
        status: 'done'
      };

      if (file.status === 'done') {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Data = reader.result;
          setImages(prevImages => {
            const newImages = [...prevImages, base64Data];
            onImagesChange(newImages);
            return newImages;
          });
          message.success(`${fileInfo.name} stored in cache successfully.`);
        };
        reader.readAsDataURL(fileInfo.originFileObj || fileInfo);
      }
    });
  };

  return (
    <Dragger
      name="file"
      multiple
      accept="image/*"
      beforeUpload={(_) => {
        return false;
      }}
      onChange={handleOnChange}
      onDrop={(e) => console.log('Dropped files', e.dataTransfer.files)}
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
