import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Spin } from 'antd';
import { useAuth } from '../auth/AuthContext';
import { useTranslation } from 'react-i18next';

const { Title, Text } = Typography;

const Logout = () => {
  const navigate = useNavigate();
  const {logout} = useAuth();
  const {t} = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
      localStorage.removeItem('token');
      logout();
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <Spin size="large" style={{ marginBottom: '20px' }} />
      <Title level={3}>{t("pages.logout.title")}</Title>
      <Text type="secondary">{t("pages.logout.subtitle")}</Text>
    </div>
  );
};

export default Logout;
