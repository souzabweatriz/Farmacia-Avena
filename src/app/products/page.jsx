"use client"
import styles from "./products.module.css"
import  { useEffect, useState } from "react";
import { Pagination } from "antd";
import Link from "next/link";
import Card from "../../components/Card/Card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [remedios, setRemedios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/remedios`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setRemedios(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Erro ao buscar Remédios", error);
        toast.error("Erro ao carregar remédios. Tente novamente.");
        setRemedios([]);
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
  const currentRemedios = remedios.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className={styles.ifLoading}>
        <h1 className={styles.title}>Lista de Remédios</h1>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p className={styles.loadingText}>Carregando remédios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.h1title}>Lista de Remédios</h1>
      <div className={styles.list}>
        {currentRemedios.length > 0 ? (
          currentRemedios.map((remedio, index) => (
            <Link
              key={remedio.id || `${remedio.nome_remedio}-${index}`}
              href={`/remedios/${remedio.id}`}
              className={styles.item}
            >
              <Card remedio={remedio} />
            </Link>
          ))
        ) : (
          <p className={styles.noResults}>Nenhum remédio encontrado.</p>
        )}
      </div>
      
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={remedios.length}
        onChange={handlePageChange}
        showSizeChanger
        pageSizeOptions={[5, 10, 20, 50]}
        style={{ marginTop: 24 }}
      />
      
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        containerId="toast-container"
      />
    </div>
  );
}