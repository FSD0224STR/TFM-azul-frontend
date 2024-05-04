 import { Form, Input, Button } from 'antd';
 import NavFooter from '../components/navFooter';

// Componente del formulario de inicio de sesión
const LoginForm = () => {
    const handleLogin = (values) => {
      // Aquí puedes enviar una solicitud al servidor para autenticar al usuario
      console.log('Valores del formulario de inicio de sesión:', values);
    };
  
    return (
      <>
        <Form  name="login" onSubmit={handleLogin} layout="vertical">
          <h2>Iniciar sesión</h2>
          <Form.Item label="Correo electrónico" name="email" rules={[{ required: true, message: 'Por favor ingresa tu correo electrónico' }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Contraseña" name="password" rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Iniciar sesión
            </Button>
          </Form.Item>
        </Form>
        <NavFooter />
      </>
    );
  };
  export default LoginForm;