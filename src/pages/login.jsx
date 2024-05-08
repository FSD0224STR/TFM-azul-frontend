import { Form, Input, Button } from 'antd';
import NavFooter from '../components/navFooter';
import { useState } from 'react';
import Password from 'antd/es/input/Password';
import { login } from '../apiservice/userApi';
import { useNavigate } from 'react-router-dom/dist';

// Componente del formulario de inicio de sesión
const LoginForm = () => {

    const [username, setUsername] = useState ('')
    const [password, setPassword] = useState ('')

    const navigate = useNavigate()

    const handleLogin = async () => {
      // Aquí puedes enviar una solicitud al servidor para autenticar al usuario
      const response = await login(username, password)
      console.log('A ver el token:', response.token);
      console.log ('A ver el id del usuario', response.id)
      localStorage.setItem('access_token', response.token)
      localStorage.setItem ('id', response.id)
      navigate('/home')
    };
  
    return (
      <>
        <Form  name="login" onSubmit={handleLogin} layout="vertical">
          <h2>Iniciar sesión</h2>
          <Form.Item label="Correo electrónico" name="email" rules={[{ required: true, message: 'Por favor ingresa tu correo electrónico' }]}>
            <Input value={username} onChange={e => setUsername (e.currentTarget.value)} />
          </Form.Item>

          <Form.Item label="Contraseña" name="password" rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}>
            <Input.Password value={Password} onChange={e => setPassword (e.currentTarget.value)} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={handleLogin}  block>
              Iniciar sesión
            </Button>
          </Form.Item>
        </Form>
        <NavFooter />
      </>
    );
  };
  export default LoginForm;