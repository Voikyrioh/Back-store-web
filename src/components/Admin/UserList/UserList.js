import React, {useState, useEffect, useReducer} from "react"
import {Alert, Button, Form, Modal, Popconfirm, Popover, Result, Table, Tooltip} from "antd";
import {getAllUsers, renderUserRoleTag, updateUser} from "../../../services/UsersService/UsersService";
import {userListActions, userListDefaultState, userListReducer} from "./userListActions";
import {DeleteOutlined, EditOutlined, StopOutlined} from "@ant-design/icons";
import {UserForm} from "../../Users/UserForm";
import './UserList.sass'

export function UserList() {
    const [userList, userListDispatch] = useReducer(userListReducer, userListDefaultState());
    const [userListRequest, setUserListRequest] = useState(null);
    const [errors, setErrors] = useState(null);
    const [userEditPopover, showUserEditPopover] = useState(null);
    const [form] = Form.useForm();

    function editUser(user) {
        updateUser(user).then(updateResponse => {
            if (updateResponse?.full?.status > 200 || !updateResponse?.body) {
                setErrors(updateResponse?.full?.statusText);
                showUserEditPopover(null);
                return;
            }

            userListDispatch({type: userListActions.EDIT, id: user.id, payload: updateResponse.body});
            Modal.info({
                icon: null,
                centered: true,
                visible: true,
                content: (
                    <Result
                        status="success"
                        title={"C'est fait"}
                        subTitle={"L'utilisateur " + user.username + " a bien été modifié !"}
                    />
                )
            });
            showUserEditPopover(null);
        });
    }

    function createUserEditPopOver (userId) {
        const user = userList.users?.find(user => user.id === userId);
        return (
            <Popover
                trigger={'click'}
                visible={userEditPopover === user.id}
                title={'Modification de ' + user.username}
                content={
                    <>
                        <UserForm
                            form={form}
                            passwordRequired={false}
                            name={user.username + '-edit'}
                            handleSubmit={(formResult) => {
                                editUser({id: user.id ,...formResult});
                            }}
                        />

                        <Button type={'primary'} style={{marginRight: 15}} onClick={() => {form.submit()}}>Valider</Button>
                        <Button type={'danger'} onClick={() => {showUserEditPopover(null)}}>Annuler</Button>
                    </>
                }
            >
                <Button
                    type={'primary'}
                    shape={'circle'}
                    icon={<EditOutlined/>}
                    onClick={() => {
                        form.resetFields();
                        form.setFieldsValue(user);
                        showUserEditPopover(user.id);
                    }}
                />
            </Popover>
        )
    }

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Pseudo",
            dataIndex: "username",
            key: "username",
        },
        {
            title: "Prénom",
            dataIndex: "firstname",
            key: "firstname",
        },
        {
            title: "Nom",
            dataIndex: "lastname",
            key: "lastname",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Rôle",
            dataIndex: "role",
            key: "role",
            render: renderUserRoleTag
        },
        {
            title: "Actions",
            dataIndex: "id",
            key: "actions",
            render: (userId) => {
                return <div className={'userActions'}>
                    <Tooltip title={'Supprimer'}>
                        <Popconfirm
                            title={"Supprimer l'utilisateur ?"}
                            onConfirm={
                                () => {
                                    userListDispatch({type: userListActions.REMOVE, id: userId}) }
                                }
                            okText={"Oui"}
                            cancelText={"Nope"}
                        >
                            <Button type={'danger'} shape={'circle'} icon={<DeleteOutlined/>}/>
                        </Popconfirm>
                    </Tooltip>

                    <Tooltip title={'Bannir'}>
                        <Popconfirm
                            title={"Bannir l'utilisateur ?"}
                            onConfirm={
                                () => {
                                    userListDispatch({type: userListActions.REMOVE, id: userId}) }
                            }
                            okText={"Oui"}
                            cancelText={"Nope"}
                        >
                            <Button type={'danger'} shape={"circle"} icon={<StopOutlined/>}/>
                        </Popconfirm>
                    </Tooltip>

                    <Tooltip title={'Modifier'}>
                        {createUserEditPopOver(userId)}
                    </Tooltip>
                </div>
            }
        },
    ];

    useEffect(() => {
        if (!userListRequest) {
            setUserListRequest(
                getAllUsers().then(users => {
                    users?.map(user => { user.key = user.id; return user; });
                    userListDispatch({type: userListActions.FINISHED, payload: users});
                }).catch(error => {
                    setErrors(error);
                })
            );
        }
    }, [userListRequest]);

    useEffect(() => {
        if (errors) {
            Modal.error({
                icon: null,
                centered: true,
                visible: true,
                content: (
                    <Result
                        status="error"
                        title={"Oupsie !"}
                        subTitle={`Une erreur est survenue : "${errors}"`}
                    />
                )
            });
        }
    }, [errors])

    return (
        <Table
            columns={columns}
            dataSource={(userList?.users?.length > 0) ? userList.users : null}
            loading={userList?.loading}
        />
    );
}
