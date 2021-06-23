import './RegistrationForm.sass';
import * as React from 'react';
import {Button, Card, Form, Input} from "antd";
import {testPassword} from "../../../services/AuthService/AuthService";

function registerUser() {
    console.log("coucou");
}

function registrationFailed() {
    console.log("holà");
}


function RegistrationForm(props) {
    return (
        <Card>
            <Form
                labelAlign={"right"}
                layout={"horizontal"}
                labelCol={{span: 10}}
                wrapperCol={{span: 30}}
                name="registration"
                onFinish={registerUser}
                onFinishFailed={registrationFailed}
            >
                <Form.Item
                    label="Nom d'utilisateur"
                    name="username"
                    rules={[{
                        required: true,
                        message: "Merci d'entrer un nom d'utilisateur"
                    }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Mot de passe"
                    name="password"
                    hasFeedback
                    rules={[{
                        required: true,
                        message: "Merci d'entrer un mot de passe"
                    },
                        () => ({
                            validator(_, value) {
                                const passwordTestedResponse = testPassword(value);
                                if (!passwordTestedResponse) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(passwordTestedResponse);
                            }
                        })]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Confirmer"
                    name="password_check"
                    hasFeedback
                    rules={[{
                        required: true,
                        message: "Merci confirmer votre mot de passe"
                    },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (value !== getFieldValue('password')) {
                                    return Promise.reject("Les deux mots de passe doivent correspondre");
                                }
                                return Promise.resolve();
                            }
                        })]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    hasFeedback
                    rules={[{
                        required: true,
                        message: "Merci d'entrer votre adresse email"
                    }, {
                        type: 'email',
                        message: 'L\'email est invalide',
                    }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Prénom"
                    name="firstname"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Nom"
                    name="lastname"
                >
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Envoyer
                    </Button>
                </Form.Item>

            </Form>
        </Card>
    );
}

export default RegistrationForm;