import React, { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import DragAndDrop from "./dragAndDropImages";
import TagInput from "./tagInput";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import { use } from "i18next";

const FormCreateGuide = (closeModal, reset) => {
  const [form] = Form.useForm();
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);
  const {t} = useTranslation();

  function extractBase64(dataUrl) {
    if (!dataUrl.includes(',')) {
        console.error("Invalid data URL: no comma found.");
        return null;
    }

    const base64String = dataUrl.split(',')[1];

    if (!base64String) {
        console.error("Invalid data URL: base64 data is missing.");
        return null;
    }

    return base64String;
  }

  function processedImages(images) {
    return images.map(image => extractBase64(image)).filter(Boolean);
  }

  const handleSubmit = async (values) => {
    try {
      console.log('Form Submitted:', values);
      console.log('Tags:', tags);
      console.log('Images:', images);
      await axios.post('/api/guidelines', {
        title: values.title,
        keywords: tags,
        imgs: processedImages(images),
        creatorId: -1
      },
      {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });
      setTags([]);
      closeModal();
    } catch (error) {
      console.error(error);
      form.resetFields();
      closeModal();
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  useEffect(() => {
    console.log(images);
  }, [images]);

  useEffect(() => {
    form.resetFields();
  }, [reset]);

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      onKeyDown={handleKeyPress}
    >
      <Form.Item
        className="pt-4"
        label=""
        name="title"
        rules={[{ required: true, message: t("components.create_guide.title") }]}
      >
        <Input placeholder="Title" />
      </Form.Item>
      <Form.Item
        label=""
        name="description"
      >
        <DragAndDrop onImagesChange={setImages}/>
      </Form.Item>
      <Form.Item
        label=""
        name="tags"
        rules={[{
          required: true,
          validator: (_, value) => {
              if (tags.length === 0)
                return Promise.reject(new Error(t("components.create_guide.tags")));
              return Promise.resolve();
          },
        }]}
      >
        <TagInput onTagsChange={setTags} />
      </Form.Item>
      <Form.Item className="flex flex-row justify-center">
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormCreateGuide;
