"use client";

import { useState, useEffect } from "react";
import { Card, Spin, Button, Descriptions } from "antd";
import { ArrowLeftOutlined, FileImageOutlined, MedicineBoxOutlined } from "@ant-design/icons";
import Link from "next/link";
import axios from "axios";
import styles from "./[id].module.css";

export default function RemedyPage({ params }) {
    const [remedy, setRemedy] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchRemedy = async (id) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/remedios/${id}`);
            let data = response.data;
            if (Array.isArray(data)) {
                setRemedy(data.length > 0 ? data[0] : null);
            } else if (data && Object.keys(data).length > 0) {
                setRemedy(data);
            } else {
                setRemedy(null);
            }
        } catch (error) {
            setRemedy(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (params.id) {
            fetchRemedy(params.id);
        }
    }, [params.id]);

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingWrapper}>
                    <Spin size="large" />
                    <p className={styles.loadingText}>Carregando detalhes...</p>
                </div>
            </div>
        );
    }

    if (!remedy) {
        return (
            <div className={styles.container}>
                <div className={styles.errorWrapper}>
                    <h3>Chá não encontrado</h3>
                    <p>O chá que você está procurando não existe ou foi removido.</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.backButton}>
                <Link href="/products">
                    <Button icon={<ArrowLeftOutlined />}>
                        Voltar para lista
                    </Button>
                </Link>
            </div>
            <Card
                className={styles.card}
                title={remedy.nome_remedio}
                bordered={false}
                style={{ width: 400, margin: "0 auto" }}
                cover={
                    remedy.photo ? (
                        <img alt={remedy.nome_remedio} src={remedy.photo} style={{ borderRadius: 12 }} />
                    ) : (
                        <FileImageOutlined style={{ fontSize: 80, color: "#aaa", margin: "2rem auto" }} />
                    )
                }
            >
                <Descriptions column={1} bordered>
                    <Descriptions.Item label={<MedicineBoxOutlined />}>
                        <strong>Efeito:</strong> {remedy.efeito_remedio || "Não informado"}
                    </Descriptions.Item>
                    <Descriptions.Item label={<MedicineBoxOutlined />}>
                        <strong>Modo de Preparo:</strong> {remedy.modo_preparo || "Não informado"}
                    </Descriptions.Item>
                    <Descriptions.Item label={<MedicineBoxOutlined />}>
                        <strong>Contraindicações:</strong> {remedy.contraindicacoes || "Não informado"}
                    </Descriptions.Item>
                    <Descriptions.Item label={<MedicineBoxOutlined />}>
                        <strong>Categoria:</strong> {remedy.categoria_id || "Não informado"}
                    </Descriptions.Item>
                </Descriptions>
            </Card>
        </div>
    );
}