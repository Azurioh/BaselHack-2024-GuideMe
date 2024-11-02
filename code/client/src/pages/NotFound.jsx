import { Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

function NotFound() {
  const navigate = useNavigate();

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
        textAlign: 'center'
      }}
    >
      <Title style={{ fontSize: '4rem', color: '#1e40af' }}>404</Title>
      <Title level={2} style={{ color: '#172554' }}>Page Not Found</Title>
      <Text style={{ fontSize: '1.2rem', color: '#666', marginBottom: '2rem' }}>
        The page you are looking for doesn't exist or has been moved.
      </Text>
      <Button 
        type="primary"
        size="large"
        onClick={() => navigate('/')}
        style={{
          backgroundColor: '#1e40af',
          borderColor: '#1e40af',
          height: '50px',
          fontSize: '1.1rem',
          width: '200px'
        }}
      >
        Back to Home
      </Button>
    </div>
  );
}

export default NotFound;
