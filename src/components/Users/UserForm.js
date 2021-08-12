import React from 'react';
import {Form, Input} from "antd";
import {testPassword} from "../../services/AuthService/AuthService";

export function UserForm(props) {
    return (
        <Form
            form={props.form}
            layout={"vertical"}
            labelCol={{span: 10}}
            wrapperCol={{span: 30}}
            name={props.name}
            onFinish={props.handleSubmit}
            onFinishFailed={props.submitFail}
        >
            <Form.Item
                label="Nom d'utilisateur :"
                name="username"
                rules={[{
                    required: true,
                    message: "Merci d'entrer un nom d'utilisateur"
                }]}
            >
                <Input placeholder={'Pseudonyme'} />
            </Form.Item>

            <Form.Item label="Mot de passe :" required={props.passwordRequired ?? true}>
                <Input.Group compact>
                    <Form.Item
                        name="password"
                        hasFeedback
                        noStyle
                        rules={[{
                            required: props.passwordRequired ?? true,
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
                            })
                        ]}
                    >
                        <Input.Password placeholder={'Mot de passe'} style={{ width: '50%' }}/>
                    </Form.Item>

                    <Form.Item
                        name="password_confirm"
                        hasFeedback
                        noStyle
                        rules={[{
                            required: props.passwordRequired ?? true,
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
                        <Input.Password  placeholder={'Confirmation'} style={{ width: '50%' }}/>
                    </Form.Item>
                </Input.Group>
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
                <Input placeholder={'john.doe@any-mail-service.com'}/>
            </Form.Item>

            <Form.Item
                label="Prénom "
                name="firstname"
                style={{width: 'calc(50% - 5px)', float: 'left'}}
            >
                <Input placeholder={'John'}/>
            </Form.Item>

            <Form.Item
                label="Nom :"
                name="lastname"
                style={{width: 'calc(50% - 5px)', float: 'right'}}
            >
                <Input placeholder={'Doe'}/>
            </Form.Item>
        </Form>
    );
}
