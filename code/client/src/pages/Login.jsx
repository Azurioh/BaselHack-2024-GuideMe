import { Button, Flex, Form, Input } from 'antd';
import { useAuth } from '../auth/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Title from 'antd/es/typography/Title';


function Login() {
    const {login} = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin() {
        try {
            await axios.post('/api/auth/login', {
                email: email,
                password: password
            });
            login();
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Flex className="justify-center pt-5 bg-white w-1/5 rounded-lg" vertical align="center">
                <Title level={2} className="text-center">Login</Title>
                <Form
                    layout='vertical'
                    onFinish={handleLogin}
                    initialValues={{ remember: true }}
                >
                    <Form.Item
                        label='Email'
                        name='email'
                        rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
                    >
                        <Input onChange={(e) => setEmail(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        label='Password'
                        name='password'
                        rules={[{ required: true, message: 'Please input your password!'}]}
                    >
                        <Input.Password onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Item>
                    <Form.Item className="flex justify-center">
                        <Button
                            type='primary'
                            htmlType='submit'
                        >
                            Login
                        </Button>
                    </Form.Item>
                </Form>
                <Button onClick={() => navigate('/register')} type='link' className='mb-5'>Don't have an account? Register here</Button>
            </Flex>
        </div>
    )
}

export default Login;
