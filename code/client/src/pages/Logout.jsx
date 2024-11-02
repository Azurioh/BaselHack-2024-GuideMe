import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Spin } from 'antd';
import { useAuth } from '../auth/AuthContext';

const { Title, Text } = Typography;

const Logout = () => {
  const navigate = useNavigate();
  const {logout} = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
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
      <Title level={3}>You are logged out</Title>
      <Text type="secondary">You are being redirected to the login page...</Text>
    </div>
  );
};

export default Logout;
