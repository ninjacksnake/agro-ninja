import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, Card, Row, Col, Typography, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { replace, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { setCredentials } from '../../features/auth/AuthSlice';

const { Title, Text } = Typography;

const Login = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            // authentication logic 
            const response = await api.post('/login', values)
 //           console.log('response data is ',response.data);
            dispatch(setCredentials({user: response.data.user, accessToken: response.data.accessToken}));
            notification.success({
                message: 'Success',
                description: 'Login successful!',
                placement: 'topRight'
            });
          navigate('/', {replace: true});
        } catch (error) {
            notification.error({
                message: 'Error',
                description: error.message.includes('Unauthorized')?"Check username or password" : "Failed to login" || 'Failed to login',
                placement: 'topRight'
            });
          // return navigate('/login', {replace: true});
        } finally {
            setLoading(false);
        }
    };

    return (
        <Row justify="center" align="middle" style={{ minHeight: '100vh', background: '#f0f2f5' }}>
            <Col xs={22} sm={16} md={12} lg={8} xl={6}>
                <Card bordered={false} style={{ boxShadow: '0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09)' }}>
                    <div style={{ textAlign: 'center', marginBottom: 32 }}>
                        <Title level={2}>Bienvenido </Title>
                        <Typography.Text type="secondary">
                            Por favor ingresa tus credenciales para iniciar sesión.
                        </Typography.Text>
                    </div>

                    <Form
                        form={form}
                        name="login"
                        onFinish={onFinish}
                        layout="vertical"
                        size="large"
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                { required: true, message: 'Please input your email!' },
                                { type: 'email', message: 'Please enter a valid email!' }
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="Email"
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                { required: true, message: 'Please input your password!' },
                                { min: 6, message: 'Password must be at least 6 characters!' }
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                placeholder="Password"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                block
                            >
                                Sign In
                            </Button>
                        </Form.Item>
                    </Form>
                    <Row justify={"center"}>
                        <Text type="secondary"> No tienes cuenta, registrate
                            <Button type='link' onClick={() => navigate('/register')}>
                                Aqui
                            </Button>
                        </Text>
                    </Row>
                </Card>
            </Col>
        </Row>
    );
};

export default Login;