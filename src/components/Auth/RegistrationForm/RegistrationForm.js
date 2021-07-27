import './RegistrationForm.sass';
import * as React from 'react';
import {Card, Form, Input} from "antd";
import {register, testPassword} from "../../../services/AuthService/AuthService";
import Modal from "antd/es/modal/Modal";
import {useState} from "react";

function registerUser() {
    console.log("coucou");
}

function registrationFailed() {
    console.log("holà");
}


function RegistrationForm(props) {
    const [form] = Form.useForm();
    const [registerLoading, setRegisterLoading] = useState(false);

    const handleSubmit = (event) => {
        setRegisterLoading(true);
        register(
            event,
            (sessionInfos) => { props.onLogged(sessionInfos); setRegisterLoading(false); props.setModal(false); },
            () => {setRegisterLoading(false);}
        );
    };

    return (
        <Modal
            title="S'enregistrer :"
            style={{ top: 20 }}
            visible={props.show}
            onOk={form.submit}
            confirmLoading={registerLoading}
            onCancel={() => props.setModal(false)}
        >
            <Form
                form={form}
                layout={"vertical"}
                labelCol={{span: 10}}
                wrapperCol={{span: 30}}
                name="registration"
                onFinish={handleSubmit}
                onFinishFailed={registrationFailed}
            >
                <Form.Item
                    label="Nom d'utilisateur :"
                    name="username"
                    rules={[{
                        required: true,
                        message: "Merci d'entrer un nom d'utilisateur"
                    }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Mot de passe :"
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
                    label="Confirmer le mot de passe :"
                    name="password_confirm"
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
                    label="Email :"
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
                    label="Prénom :"
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

            </Form>
        </Modal>
    );
}

export default RegistrationForm;