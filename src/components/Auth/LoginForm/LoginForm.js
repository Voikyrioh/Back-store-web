import './LoginForm.sass';
import * as React from 'react';
import {Button, Form, Input} from "antd";

function loginFailed() {}
function loginUser() {}

function LoginForm(props) {
    return (
        <Form
            name="login"
            onFinish={loginUser()}
            onFinishFailed={loginFailed()}
        >
            <Form.Item
                label="Nom d'utilisateur"
                name="username"
                rules={[{
                    required: true,
                    message: "Merci d'entrer votre nom d'utilisateur"
                }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Mot de passe"
                name="password"
                rules={[{
                    required: true,
                    message: "Merci d'entrer votre mot de passe"
                }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Valider
                </Button>
            </Form.Item>

        </Form>
    );
}

export default LoginForm;