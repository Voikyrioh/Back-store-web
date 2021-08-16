import './HomePage.sass';
import * as React from 'react';
import {Content} from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import Text from "antd/es/typography/Text";
import {InputPhone} from "../Inputs/InputPhone";
import {Button, Card, Form} from "antd";

export function HomePage() {
    const [form] = Form.useForm();

    const handleSubmit = (form) => {
        console.log(form);
    }

    return (
        <Content>
            <Title>Bienvenue sur <Text type="success">Stock for Retarded</Text></Title>
            <Paragraph>
                Contrairement à ce que peut faire penser le nom, ce site n'a pas pour but de parler de la bourse.
            </Paragraph>
            <Paragraph>
                Le but est de vous permettre de savoir quand des articles d'une boutique en ligne est disponible en
                temps réel ! Pour cela, Stock for Retarded utilise sa propre API développé par notre seigneur et
                grand maitre à tous Voikyrioh. Nan plus sérieusement en mettant cette blague totalement fausse et de
                mauvais goût de côté, l'API utilise une librairie de scrapping qui lui permet d'aller récupérer
                directement les pages web des site de revendeurs et grace à une configuration spécifique peut
                vérifier si un produit est en stock ou non.
            </Paragraph>


            <Card style={{width: '50%'}} >
                <Form form={form} onFinish={handleSubmit}>
                    <InputPhone defaultCountry={'FR'} form={form} name={'test-phone'} />
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Valider
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Content>
    );
}