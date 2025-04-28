import React, { useState } from 'react';
import { Form, Input, Button, Card, Row, Col, Typography, notification, Space, Divider } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Title, Text } = Typography;


const Register = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            await form.validateFields([
                'email',
                'password',
                'confirm',
                'firstName',
                'lastName',
                'phoneNumber'
            ]);
            
            // Get all form values
            const formData = form.getFieldsValue();
            console.log('Form Data:', formData);
            // Remove the confirm password field before sending
            const { confirm, ...registrationData } = formData;

            const response = await axios.post(process.env.REACT_APP_API_BASE_URL_DEVELOPMENT+'/register', registrationData);
            console.log(response.data);
            if (response.data.status === 'success') {
                console.log('Registration successful!');
               
            }
            console.log('Registration values:', values);
            notification.success({
                message: 'Success',
                description: 'Registration successful!',
                placement: 'topRight'
            });
            navigate('/login');
        } catch (error) {
            notification.error({
                message: 'Error',
                description: error.message || 'Failed to register',
                placement: 'topRight'
            });
        } finally {
            setLoading(false);
        }
    };

    const nextStep = async () => {
        try {
            await form.validateFields(['email', 'password', 'confirm']);
            setCurrentStep(1);
        } catch (error) {
            console.error('Validation failed:', error);
        }
    };

    const prevStep = () => {
        setCurrentStep(0);
    };

    return (
        <Row justify="center" align="middle" style={{ minHeight: '100vh', background: '#f0f2f5' }}>
            <Col xs={23} sm={20} md={16} lg={12} xl={8}>
                <Card 
                    bordered={false} 
                    style={{ 
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                        borderRadius: '8px'
                    }}
                >
                    <div style={{ textAlign: 'center', marginBottom: 24 }}>
                        <Title level={2} style={{ marginBottom: 8 }}>Create Account</Title>
                        <Text type="secondary">Join our community today</Text>
                    </div>

                    <Form
                        form={form}
                        name="register"
                        onFinish={onFinish}
                        layout="vertical"
                        size="large"
                    >
                        
                            <>
                                <Form.Item
                                    name="email"
                                    rules={[
                                        { required: true, message: 'Please input your email!' },
                                        { type: 'email', message: 'Please enter a valid email!' }
                                    ]}
                                >
                                    <Input
                                        prefix={<MailOutlined />}
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
                                        prefix={<LockOutlined />}
                                        placeholder="Password"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="confirm"
                                    dependencies={['password']}
                                    rules={[
                                        { required: true, message: 'Please confirm your password!' },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject('Passwords do not match!');
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password
                                        prefix={<LockOutlined />}
                                        placeholder="Confirm Password"
                                    />
                                </Form.Item>
                                                    
                                <Form.Item
                                    name="firstName"
                                    rules={[{ required: true, message: 'Please input your first name!' }]}
                                >
                                    <Input
                                        prefix={<UserOutlined />}
                                        placeholder="First Name"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="lastName"
                                    rules={[{ required: true, message: 'Please input your last name!' }]}
                                >
                                    <Input
                                        prefix={<UserOutlined />}
                                        placeholder="Last Name"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="phoneNumber"
                                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                                >
                                    <Input
                                        prefix={<PhoneOutlined />}
                                        placeholder="Phone Number"
                                    />
                                </Form.Item>
                            </>
                        

                        <Form.Item>
                            <Space style={{ width: '100%', justifyContent: 'center' }}>                                
                                    <Button  type="primary" htmlType="submit" loading={loading} block>
                                        Register
                                    </Button>
                            </Space>
                        </Form.Item>
                    </Form>

                    <Divider />
                    
                    <Row justify="center">
                        <Text type="secondary">
                           Ya tienes una cuenta?{' '}
                            <Button type="link" onClick={() => navigate('/login')}>
                                Iniciar Sesión
                            </Button>
                        </Text>
                    </Row>
                </Card>
            </Col>
        </Row>
    );
};

export default Register;