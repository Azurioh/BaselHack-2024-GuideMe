import React from 'react';
import { Select } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { changeLanguage } from 'i18next';

const { Option } = Select;

const LanguageSelector = ({ defaultValue = 'en', style = {}, size = 'large' }) => {
  const [languageSelected, setLanguageSelected] = React.useState(localStorage.getItem('savedLanguage') || defaultValue);

  const handleLanguageChange = (value) => {
    setLanguageSelected(value);
    localStorage.setItem('savedLanguage', value);
    changeLanguage(value);
    console.log("Language selected:", value);
  };

  return (
    <div style={{ marginTop: '2rem', textAlign: 'center', ...style }}>
      <Select
        defaultValue={languageSelected}
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
