import styles from '../PageSpecific/PageSpecific.module.css';
import { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import Link from 'next/link';
import Card from '../../components/Card/Card';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PageSpecific() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        async function fetchData({url}) {
            try {
                setLoading(true);
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setData(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Erro ao buscar dados", error);
                toast.error("Erro ao carregar dados. Tente novamente.");
                setData([]);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const handlePageChange = (page, size) => {
        setCurrentPage(page);
        setPageSize(size);
    };

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentData = data.slice(startIndex, endIndex);

    if (loading) {
        return (
            <div className={styles.ifLoading}>
                <h1 className={styles.title}>Página Específica</h1>
                <div className={styles.loading}>
                    <div className={styles.spinner}></div>
                    <p className={styles.loadingText}>Carregando dados...</p>
                </div>
            </div>
        );
    }

    return(
        <div className={styles.container}>
            <h1 className={styles.title}>Página Específica</h1>
        </div>
    )
}