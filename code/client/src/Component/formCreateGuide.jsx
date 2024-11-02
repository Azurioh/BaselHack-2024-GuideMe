import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "antd";
import DragAndDrop from "./dragAndDropImages";
import TagInput from "./tagInput";

const FormCreateGuide = (closeModal) => {
  const [form] = Form.useForm();
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);

  const handleSubmit = (values) => {
    console.log('Form Submitted:', values);
    console.log('Tags:', tags);
    console.log('Images:', images);
    setTags([]);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  useEffect(() => {
    console.log(images);
  }, [images]);

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
        rules={[{ required: true, message: "Please input the title!" }]}
      >
        <Input placeholder="Title" />
      </Form.Item>
      <Form.Item
        label=""
        name="description"
        rules={[{
          required: true,
          validator: (_, value) => {
              if (images.length <= 1) {
                console.log(images);
                return Promise.reject(new Error("Please put at least 2 images!"));
            }
            return Promise.resolve();
          },
        }]}
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
                return Promise.reject(new Error("Please input at least one tag!"));
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
