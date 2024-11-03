import React, { useState } from 'react';
import { Modal, Input, Button } from 'antd';
import FormCreateGuide from './formCreateGuide';
import { useTranslation } from 'react-i18next';

const ModalNewGuide = ({ isOpen, setOpen, onClose }) => {
    const {t} = useTranslation();
    const [reset, setReset] = useState(false);

    return (
    <Modal
      title= {t("components.model_guides.title")}
      open={isOpen}
      onCancel={() => {
        setReset(true);
        onClose();
      }}
      footer
      centered={true}
    >
      <FormCreateGuide closeModal={onClose} reset={reset}/>
    </Modal>
  );
}

export default ModalNewGuide;
