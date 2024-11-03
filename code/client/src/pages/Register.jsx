import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useState } from "react";
import { Button, Flex, Form, Input, message, Progress } from "antd";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import Title from "antd/es/typography/Title";

function Register() {
    const {login} = useAuth();
    const navigate = useNavigate();
    const {t} = useTranslation();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [strength, setStrength] = useState(0);
    const [color, setColor] = useState('gray');

    async function handleRegister() {
        try {
            await axios.post('/api/auth/register', {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            });
            login();
            navigate('/application');
        } catch (error) {
            console.error(error);
            message.error('An error occurred, please try again');
        }
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
        evaluatePasswordStrength(e.target.value);
    }

    const evaluatePasswordStrength = (password) => {
        let strengthScore = 0;

        // Increase score based on password criteria
        if (password.length >= 8) strengthScore += 1; // Minimum length
        if (/[A-Z]/.test(password)) strengthScore += 1; // Contains uppercase letter
        if (/\d/.test(password)) strengthScore += 1; // Contains a number
        if (/[@$!%*?&#]/.test(password)) strengthScore += 1; // Contains a special character

        setStrength(strengthScore);

        // Set color based on score
        switch (strengthScore) {
            case 1:
                setColor('#dc2626');
                break;
            case 2:
                setColor('#ea580c');
                break;
            case 3:
                setColor('#facc15');
                break;
            case 4:
                setColor('#84cc16');
                break;
            default:
                setColor('gray');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Flex className="justify-center p-5 bg-white w-1/5 rounded-lg" vertical align="center">
                <Title level={2} className="text-center">{t("pages.register.title")}</Title>
                <Form
                    layout='vertical'
                    onFinish={handleRegister}
                    initialValues={{ remember: true }}
                >
                    <Form.Item
                        label={t("pages.register.firstname")}
                        name='firstname'
                        rules={[{ required: true, message: t("pages.register.firstname_enter") }]}
                    >
                        <Input onChange={(e) => setFirstName(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        label={t("pages.register.lastname")}
                        name='lastname'
                        rules={[{ required: true, message: t("pages.register.lastname_enter") }]}
                    >
                        <Input onChange={(e) => setLastName(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        label={t("pages.register.email")}
                        name='email'
                        rules={[{ required: true, message: t("pages.register.email_enter"), type: 'email' }]}
                    >
                        <Input onChange={(e) => setEmail(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        label={t("pages.register.password")}
                        name='password'
                        rules={[{
                            required: true,
                            validator: (_, value) => {
                                if (password == "")
                                    return Promise.reject(new Error(t("pages.register.password_enter")));
                                return Promise.resolve();
                            },
                        }]}
                    >
                        <Input.Password onChange={handlePasswordChange}/>
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                            <Progress
                                percent={(strength / 4) * 100}
                                showInfo={false}
                                strokeColor={color}
                            />
                            <span style={{ marginLeft: '10px', color }}>
                                {strength === 0 && t("pages.register.password_stage.weak")}
                                {strength === 1 && t("pages.register.password_stage.weak")}
                                {strength === 2 && t("pages.register.password_stage.fair")}
                                {strength === 3 && t("pages.register.password_stage.good")}
                                {strength === 4 && t("pages.register.password_stage.strong")}
                            </span>
                        </div>
                    </Form.Item>
                    <Form.Item className="flex justify-center">
                        <Button
                            type='primary'
                            htmlType='submit'
                        >
                            Register
                        </Button>
                    </Form.Item>
                </Form>
                <Button className="mb-4" onClick={() => navigate('/login')} type='link'>Already have an account ? Login here</Button>
            </Flex>
        </div>
    )
}

export default Register;
