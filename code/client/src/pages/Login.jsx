import { Button } from 'antd';
import { useAuth } from '../auth/AuthContext';

function Login() {
    const {login} = useAuth();

    return (
        <div>
            <h1>Login</h1>
            <Button
                type='primary'
                onClick={() => login()}
            >
                Login
            </Button>
        </div>
    )
}

export default Login;