import './Login.sass';
import * as React from 'react';
import {Button, Card, Form, Input, notification} from "antd";
import {loginUser} from "../../../services/AuthService/AuthService";
import {useState} from "react";

function loginFailed(event) {
    notification['error']({
        message: 'Formulaire incomplet',
        description:
            'Merci de renseigner correctement tous les champs.',
    });
}

function Login(props) {
    const [loginLoading, setLoginLoading] = useState(false);

    const handleSubmit = (event) => {
        setLoginLoading(true);
        loginUser(
            event,
            (sessionInfos) => {props.onLogged(sessionInfos); setLoginLoading(false);},
            () => {setLoginLoading(false);}
        );
    }


    return (
        <Card>
            <Form
                labelAlign={"left"}
                layout={"horizontal"}
                labelCol={{span: 10}}
                wrapperCol={{span: 30}}
                name="login"
                onFinish={handleSubmit}
                onFinishFailed={loginFailed}
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
                    <Button type="primary" htmlType="submit" loading={loginLoading}>
                        Valider
                    </Button>
                </Form.Item>

            </Form>
        </Card>
    );
}

export default Login;