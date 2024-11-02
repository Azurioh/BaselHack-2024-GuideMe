import { Button, Flex, Form, Input } from 'antd';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


function Login() {
    const {login} = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin() {
        login();
        console.log("email: ", email);
        console.log("password: ", password);
        // TODO: call the api to login
        navigate('/');
    }

    return (
        <Flex>
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
                <Button
                    type='primary'
                    htmlType='submit'
                >
                    Login
                </Button>
            </Form>
        </Flex>
    )
}

export default Login;