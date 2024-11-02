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

    function handleLogin() {
        login();
        console.log("email: ", email);
        console.log("password: ", password);
        navigate('/');
    }

    return (
        <Flex className="justify-center p-5 bg-white w-1/5 rounded-lg mx-auto m-5" vertical>
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
                <Form.Item>
                    <div className="text-center">
                        <span>Don't have an account ? </span>
                        <Link to={"/register"}>Register</Link>
                    </div>
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
