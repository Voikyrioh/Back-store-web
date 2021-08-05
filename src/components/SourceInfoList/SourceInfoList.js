import * as React from 'react';
import './SourceInfoList.sass';
import {getAllProductInformations} from "../../services/SourcesService/SourcesServices";
import {Button, Table, Tag} from "antd";
import {CheckCircleOutlined, CloseCircleOutlined, LinkOutlined} from "@ant-design/icons";
import {useState, useEffect} from "react";

export function SourceInfoList () {

    const [error, setError] = useState(null);
    const [productListRequest, setProductListRequest] = useState(null);
    const [listSpinner, setListSpinner] = useState(true);
    const [productList, setProductList] = useState([]);

    function getItemStatus(status) {
        const icon = status === 'inStock' ? <CheckCircleOutlined /> : <CloseCircleOutlined />;
        const color = status === 'inStock' ? 'green' : 'red';
        const text = status === 'inStock' ? 'en stock': 'rupture de stock';

        return <Tag icon={icon} color={color}>{text}</Tag>;
    }

    const columns = [
        {
            title: "Disponibilité",
            dataIndex: "status",
            key: "status",
            render: getItemStatus
        },
        {
            title: "Nom",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Magasin",
            dataIndex: "source",
            key: "source",
        },
        {
            title: "Lien",
            dataIndex: "url",
            key: "url",
            render: (text) => {
                return <a href={text} target="_blank" rel="noreferrer"><Button type="primary" shape="circle"><LinkOutlined /></Button></a>
            }
        },
    ];

    useEffect(() => {
        if (!productListRequest) {
            setProductListRequest(
                getAllProductInformations().then(sources => {
                    setListSpinner(false);
                    setProductList(sources);
                }).catch(error => {
                    setListSpinner(false);
                    setError(error);
                })
            );
        }
    }, [productListRequest]);

    return (
        <Table
            columns={columns}
            dataSource={productList ? productList : null}
            loading={listSpinner}
        />
    );
}
