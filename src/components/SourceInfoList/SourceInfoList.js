import * as React from 'react';
import './SourceInfoList.sass';
import {getAllProductInformations} from "../../services/SourcesService/SourcesServices";
import {Button, Table, Tag} from "antd";
import {CheckCircleOutlined, CloseCircleOutlined, LinkOutlined} from "@ant-design/icons";

export class SourceInfoList extends React.Component {
    columns = [
        {
            title: "Disponibilité",
            dataIndex: "status",
            key: "status",
            render: this.getItemStatus
        },
        {
            title: "Nom",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Magasin",
            dataIndex: "shop",
            key: "shop",
        },
        {
            title: "Lien",
            dataIndex: "url",
            key: "url",
            render: (text) => {
                return <a href={text} target="_blank" rel="noreferrer"><Button type="primary" shape="circle"><LinkOutlined /></Button></a>
            }
        },
    ]
    
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            loading: true,
            data: []
        };
    }

    componentDidMount() {
        getAllProductInformations().then(sources => {
            this.setState({
                loading: false,
                data: sources
            });
        }).catch(error => {
            this.setState({
                isLoaded: true,
                error
            });
        })
    }
    
    render() {
        return (
            <Table
                columns={this.columns}
                dataSource={this.state.data ? this.state.data : null}
                loading={this.state.loading}
            />
        );
    }

    getItemStatus(status) {
        const icon = status === 'inStock' ? <CheckCircleOutlined /> : <CloseCircleOutlined />;
        const color = status === 'inStock' ? 'green' : 'red';
        const text = status === 'inStock' ? 'en stock': 'rupture de stock';
        
        return <Tag icon={icon} color={color}>{text}</Tag>;
    }
}