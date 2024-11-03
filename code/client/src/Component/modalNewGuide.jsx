import React, { useState } from 'react';
import { Modal, Input, Button } from 'antd';
import FormCreateGuide from './formCreateGuide';
import { useTranslation } from 'react-i18next';

const ModalNewGuide = ({ isOpen, setOpen, onClose }) => {
    const {t} = useTranslation();
    return (
    <Modal
      title= {t("components.model_guides.title")}
      open={isOpen}
      onCancel={onClose}
      footer
      centered={true}
    >
      <FormCreateGuide />
    </Modal>
  );
}

export default ModalNewGuide;
