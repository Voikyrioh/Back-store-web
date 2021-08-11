import React, {useState, useEffect, useReducer} from "react"
import {Button, Table, Tooltip} from "antd";
import {getAllUsers, renderUserRoleTag} from "../../../services/UsersService/UsersService";
import {userListActions, userListDefaultState, userListReducer} from "./userListActions";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";

export function UserList() {
    const [userList, userListDispatch] = useReducer(userListReducer, userListDefaultState());
    const [userListRequest, setUserListRequest] = useState(null);
    const [errors, setErrors] = useState(null);


    const userEditTooltip =
        <Tooltip>
            {/*userListDispatch({type: userListActions.EDIT, id: userId}) })*/ 'test'}
        </Tooltip>

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
                return <>
                    <Button
                        type={'danger'}
                        shape={'circle'}
                        icon={<DeleteOutlined/>}
                        onClick={() => { userListDispatch({type: userListActions.REMOVE, id: userId}) }}
                    />
                    <Button
                        type={'primary'}
                        shape={'circle'}
                        icon={<EditOutlined/>}
                        onClick={() => {}}
                    />
                </>
            }
        },
    ];

    useEffect(() => {
        if (!userListRequest) {
            setUserListRequest(
                getAllUsers().then(users => {
                    users.map(user => { user.key = user.id; return user; });
                    userListDispatch({type: userListActions.FINISHED, payload: users});
                }).catch(error => {
                    setErrors(error);
                })
            );
        }
    }, [userListRequest]);

    return (
        <Table
            columns={columns}
            dataSource={(userList?.users?.length > 0) ? userList.users : null}
            loading={userList?.loading}
        />
    );
}