import { useState } from 'react'
import { Form, Input, Button } from 'antd';
import NavFooter from '../components/navFooter';

const RegistrationForm = () => {
    const [password, setPassword] = useState('');
    const [requirements, setRequirements] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        specialChar: false
    });

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        // Validación de la contraseña
        //const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!@#$%^&*()_+\-=\[\]{};:\\|,.<>?/~])[A-Za-z\d@$!@#$%^&*()_+\-=\[\]{};:\\|,.<>?/~]{10,}$/;
        setRequirements({
            length: newPassword.length >= 10,
            uppercase: /[A-Z]/.test(newPassword),
            lowercase: /[a-z]/.test(newPassword),
            number: /\d/.test(newPassword),
            specialChar: /[@$!@#$%^&*()_+\-=\\[\]{};:\\|,.<>?/~]/.test(newPassword)
        });
  };
  
    const handleRegister = (values) => {
      console.log('Valores del formulario de registro:', values);
      console.log('password:', password);
    };
  
  
    return (
        <>
            <Form name="register" onSubmit={handleRegister}  layout="vertical">
                <h2>Registrarse</h2>
                <Form.Item label="Nombre de usuario" name="username" rules={[{ required: true, message: 'Por favor ingresa tu Nombre de usuario' }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Nombre" name="name" rules={[{ required: true, message: 'Por favor ingresa tu nombre' }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Apellidos" name="surname" rules={[{ required: true, message: 'Por favor ingresa tus apellidos' }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Correo electrónico" name="email" rules={[{ required: true, message: 'Por favor ingresa tu correo electrónico' }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Contraseña" name="password" rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}>
                    <Input.Password onChange={handlePasswordChange} />
                </Form.Item>
                <ul>
                    <li>{requirements.length ? '✅' : '❌'} Al menos 10 caracteres</li>
                    <li>{requirements.uppercase ? '✅' : '❌'} Al menos 1 mayúscula</li>
                    <li>{requirements.lowercase ? '✅' : '❌'} Al menos 1 minúscula</li>
                    <li>{requirements.number ? '✅' : '❌'} Al menos 1 número</li>
                    <li>{requirements.specialChar ? '✅' : '❌'} Al menos un caracter especial</li>
                </ul>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Registrarse
                    </Button>
                </Form.Item>
            </Form>
            <NavFooter />
      </>
    );
  };
  
export default RegistrationForm;