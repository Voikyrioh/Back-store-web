import React, {useState, useEffect} from "react"
import {Table} from "antd";
import {getAllUsers} from "../../../services/UsersService/UsersService";

export function UserList() {
    const [userList, setUserList] = useState(null);
    const [userListRequest, setUserListRequest] = useState(null);
    const [listSpinner, setListSpinner] = useState(true);
    const [errors, setErrors] = useState(null);

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
        },
    ];

    useEffect(() => {
        if (!userListRequest) {
            setUserListRequest(
                getAllUsers().then(users => {
                    console.log(users);
                    users.map(user => { user.key = user.id; return user; });
                    setUserList(users);
                    setListSpinner(false);
                }).catch(error => {
                    setErrors(error);
                    setListSpinner(false);
                })
            );
        }
    }, [userListRequest, listSpinner]);

    return <Table
        columns={columns}
        dataSource={userList ? userList : null}
        loading={listSpinner}
    />;
}
