import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useState } from "react";
import { Button, Flex, Form, Input, Progress } from "antd";

function Signup() {
    const {login} = useAuth();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [strength, setStrength] = useState(0);
    const [color, setColor] = useState('gray');

    function handleSignup() {
        login();
        // TODO: call the api to signup
        navigate('/');
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
        <Flex>
            <Form
                layout='vertical'
                onFinish={handleSignup}
                initialValues={{ remember: true }}
            >
                {/* TODO: create a simple text */}
                <Form.Item
                    label='Firstname'
                    name='firstname'
                    rules={[{ required: true, message: 'Please input your firstname!' }]}
                >
                    <Input onChange={(e) => setFirstName(e.target.value)} />
                </Form.Item>
                <Form.Item
                    label='Lastname'
                    name='lastname'
                    rules={[{ required: true, message: 'Please input your lastname!' }]}
                >
                    <Input onChange={(e) => setLastName(e.target.value)} />
                </Form.Item>
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
                    <Input.Password onChange={handlePasswordChange}/>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                        <Progress
                            percent={(strength / 4) * 100}
                            showInfo={false}
                            strokeColor={color}
                        />
                        <span style={{ marginLeft: '10px', color }}>
                            {strength === 0 && 'Weak'}
                            {strength === 1 && 'Weak'}
                            {strength === 2 && 'Fair'}
                            {strength === 3 && 'Good'}
                            {strength === 4 && 'Strong'}
                        </span>
                    </div>
                </Form.Item>
                <Button
                    type='primary'
                    htmlType='submit'
                >
                    Signup
                </Button>
            </Form>
        </Flex>
    )
}

export default Signup;