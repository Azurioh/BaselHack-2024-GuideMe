import { Button, Flex, Form, Input, message } from 'antd';
import { useAuth } from '../auth/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Title from 'antd/es/typography/Title';
import axios from 'axios';


function Login() {
    const {login} = useAuth();
    const navigate = useNavigate();
    const {t} = useTranslation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin() {
        try {
            const response = await axios.post('/api/auth/login', {
                email: email,
                password: password
            });
            localStorage.setItem('token', response.data.data.token);
            login();
            navigate('/application');
        } catch (error) {
            console.error(error);
            if (error.status === 404)
                message.error('User not found');
            else if (error.status === 401)
                message.error('Invalid password');
            else
                message.error('An error occurred');
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Flex className="justify-center pt-5 bg-white w-1/5 rounded-lg" vertical align="center">
                <Title level={2} className="text-center">{t("pages.login.title")}</Title>
                <Form
                    layout='vertical'
                    onFinish={handleLogin}
                    initialValues={{ remember: true }}
                >
                    <Form.Item
                        label={t("pages.login.email")}
                        name='email'
                        rules={[{ required: true, message: t("pages.login.input_email"), type: 'email' }]}
                    >
                        <Input onChange={(e) => setEmail(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        label={t("pages.login.password")}
                        name='password'
                        rules={[{ required: true, message: t("pages.login.input_password")}]}
                    >
                        <Input.Password onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Item>
                    <Form.Item className="flex justify-center">
                        <Button
                            type='primary'
                            htmlType='submit'
                        >
                            {t("pages.login.button")}
                        </Button>
                    </Form.Item>
                </Form>
                <Button onClick={() => navigate('/register')} type='link' className='mb-5'>{t("pages.login.no_account")}</Button>
            </Flex>
        </div>
    )
}

export default Login;
