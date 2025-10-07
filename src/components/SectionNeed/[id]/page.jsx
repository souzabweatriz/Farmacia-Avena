"use client";

import { useState, useEffect, use } from "react";
import { Card, Spin, Button, Descriptions } from "antd";
import { ArrowLeftOutlined, UserOutlined, EnvironmentOutlined, BankOutlined } from "@ant-design/icons";
import Link from "next/link";
import axios from "axios";

export default function RemedyDetail({ params }) {
    const [remedy, setRemedy] = useState(null);
    const [loading, setLoading] = useState(true);

    const resolvedParams = use(params);

    useEffect(() => {
        if (!id) return;
        const fetchRemedy = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/remedios/categoria/${id}`);
                setRemedy(response.data)
            } catch (error) {
                console.error("Error when looking for medicine")
                setRemedy(null)
            } finally {
                setLoading(false);
            }
            fetchRemedy();
        }
    }, [id]);

    useEffect(() => {
        if (resolvedParams?.id) {
            fetchUser(resolvedParams.id);
        }
    }, [resolvedParams?.id]);

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.loadingWrapper}>
                    <Spin size="large" />
                    <p className={styles.loadingText}>Carregando detalhes do usuário...</p>
                </div>
            </div>
        );
    }

    if (!remedy) {
        return (
            <div className={styles.container}>
                <div className={styles.errorWrapper}>
                    <h3>Remedy not found</h3>
                    <Link href="/products">
                        <Button type="primary" icon={<ArrowLeftOutlined />}>
                            Voltar para lista
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Link href="/products">
                    <Button icon={<ArrowLeftOutlined />} className={styles.backButton}>
                        Voltar
                    </Button>
                </Link>
                <h2 className={styles.title}>Detalhes do Remédio</h2>
            </div>

            <div className={styles.contentWrapper}>
                <Card className={styles.mainCard}>
                    <div className={styles.remedyHeader}>
                        <div className={styles.photo}>
                            {remedy.photo ? (
                                <img src={remedy.photo} alt={remedy.nome_remedio} className={styles.remedyPhoto} />
                            ) : (
                                <FileImageOutlined className={styles.photoIcon} />
                            )}
                        </div>
                        <div className={styles.remedyInfo}>
                            <h3 className={styles.remedyName}>{remedy.nome_remedio}</h3>
                            <p className={styles.remedyCategory}>Categoria ID: {remedy.categoria_id}</p>
                        </div>
                    </div>
                </Card>

                <Card
                    title={<><MedicineBoxOutlined /> Informações Gerais</>}
                    className={styles.detailCard}
                >
                    <Descriptions column={1} bordered>
                        <Descriptions.Item label="Nome do Remédio">
                            {remedy.nome_remedio}
                        </Descriptions.Item>
                        <Descriptions.Item label="Efeito do Remédio">
                            {remedy.efeito_remedio}
                        </Descriptions.Item>
                        <Descriptions.Item label="Modo de Preparo">
                            {remedy.modo_preparo}
                        </Descriptions.Item>
                        <Descriptions.Item label="Contraindicações">
                            {remedy.contraindicacoes}
                        </Descriptions.Item>
                    </Descriptions>
                </Card>
            </div>
        </div>
    );
}