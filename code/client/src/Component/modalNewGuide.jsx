import React, { useState } from 'react';
import { Modal, Input, Button } from 'antd';
import FormCreateGuide from './formCreateGuide';

const ModalNewGuide = ({ isOpen, setOpen, onClose }) => {
  return (
    <Modal
      title="Create a new guide"
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
