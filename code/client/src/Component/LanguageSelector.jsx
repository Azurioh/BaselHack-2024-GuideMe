import React from 'react';
import { Select } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';

const { Option } = Select;

const LanguageSelector = ({ defaultValue = 'en', style = {}, size = 'large' }) => {
  const handleLanguageChange = (value) => {
    console.log("Language selected:", value);
  };

  return (
    <div style={{ marginTop: '2rem', textAlign: 'center', ...style }}>
      <Select
        defaultValue={defaultValue}
        onChange={handleLanguageChange}
        style={{ width: 250 }}
        suffixIcon={<GlobalOutlined />}
        size={size}
      >
        <Option value="en">🇬🇧 English</Option>
        <Option value="fr">🇫🇷 Français</Option>
        <Option value="de">🇩🇪 Deutsch</Option>
      </Select>
    </div>
  );
};

export default LanguageSelector;
