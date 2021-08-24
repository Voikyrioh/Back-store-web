import './RegistrationModal.sass';
import * as React from 'react';
import {Form, notification} from "antd";
import {register} from "../../../services/AuthService/AuthService";
import Modal from "antd/es/modal/Modal";
import {useState} from "react";
import {UserForm} from "../../Users/UserForm";

function registrationFailed() {
    notification['error']({
        message: 'Formulaire incomplet',
        description:
            'Merci de renseigner correctement tous les champs.',
    });
}


function RegistrationModal(props) {
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
            <UserForm form={form} handleSubmit={handleSubmit} submitFail={registrationFailed}  name={"Registration"}/>
        </Modal>
    );
}

export default RegistrationModal;