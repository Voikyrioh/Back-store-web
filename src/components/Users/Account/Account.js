import './Account.sass';
import React, {useContext, useState, useEffect} from 'react';
import {getUser, UserSessionContext} from "../../../services/AuthService/AuthService";
import {UserForm} from "../UserForm";
import {useForm} from "antd/es/form/Form";
import {Avatar, Card, Skeleton} from "antd";
import {getRandomBgColor} from "../../../services/Tools/Utils";

export function Account() {
    const {userSession, changeSession} = useContext(UserSessionContext)
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    const [form] = useForm();

    useEffect(() => {
        if (!currentUser) {
            getUser(userSession.id).then(user => {
                console.log(user);
                if (user) {
                    setCurrentUser(user);
                    form.setFieldsValue(user);
                    setLoading(false);
                }
            })
        }
    }, [currentUser]);

    function handleSubmit(event) {
        console.log(event);
    }

    function handleFail(event) {
        console.log(event);
    }

    return <>
        <Card className={'account-card'} title={<div className={'account-title'}><Avatar style={{backgroundColor: getRandomBgColor()}} size={80}>{userSession.username?.charAt(0)}</Avatar><span>{userSession.username}</span></div>}>
            <Skeleton loading={loading} avatar active={loading}>
                <UserForm form={form} name={'self'} handleSubmit={handleSubmit} submitFail={handleFail} />
            </Skeleton>
        </Card>
    </>;
}