// LandingPage.jsx
import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import LanguageSelector from '../Component/LanguageSelector.jsx';
import { useTranslation } from 'react-i18next';

function LandingPage() {
  const navigate = useNavigate();
  const {t} = useTranslation();

  const handleLanguageChange = (value) => {
    console.log("Language selected:", value);
  };

  const handleAccessApp = () => {
    navigate('/application');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 40px',
        color: '#172554',
      }}
    >
      <h1 style={{ fontSize: '3rem', color: '#1e40af', fontWeight: 'bold' }}>{t("pages.landing_page.title")}</h1>
      <p style={{ fontSize: '1.3rem', color: '#555', maxWidth: '800px', lineHeight: '1.6', textAlign: 'center' }}>
        {t("pages.landing_page.description")}
      </p>

      <div
        style={{
          maxWidth: '800px',
          textAlign: 'center',
          marginTop: '3rem',
          marginBottom: '3rem',
          backgroundColor: '#fff',
          padding: '40px',
          borderRadius: '8px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        }}
      >
        <h2 style={{ color: '#1e40af', fontSize: '2.2rem', marginBottom: '1.5rem' }}>
          {t("pages.landing_page.application.title")}
        </h2>
        <p style={{ color: '#666', marginBottom: '2rem', textAlign: 'center', fontSize: '1.3rem' }}>
          {t("pages.landing_page.application.description")}
        </p>
        <Button 
          type="primary"
          size="large"
          onClick={handleAccessApp}
          style={{
            backgroundColor: '#1e40af',
            borderColor: '#1e40af',
            marginTop: '30px',
            width: '100%',
            height: '60px',
            fontSize: '1.2rem',
          }}
        >
          {t("pages.landing_page.application.button")}
        </Button>
      </div>

      <LanguageSelector/>
    </div>
  );
}

export default LandingPage;
