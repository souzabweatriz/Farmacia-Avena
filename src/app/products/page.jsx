"use client"
import styles from "./products.module.css"
import  { useEffect, useState } from "react";
import { Pagination } from "antd";
import Link from "next/link";
import Card from "../../components/Card/Card";
import { fixEncoding } from "../../utils/fixEncoding";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [remedios, setRemedios] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL);
        const data = await response.json();
        setRemedios(data);
      } catch (error) {
        console.error("Erro ao buscar Remédios", error);
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

  return (
    <div className={styles.container}>
      <h1>Lista de Remédios</h1>
      <div className={styles.list}>
        {currentRemedios.map((remedio) => (
          <Link
            key={remedio.id || remedio.nome_remedio}
            href={`/remedios/${remedio.id}`}
            className={styles.item}
          >
            <Card remedio={{
              ...remedio,
              nome_remedio: fixEncoding(remedio.nome_remedio),
              efeito_remedio: fixEncoding(remedio.efeito_remedio),
              modo_preparo: fixEncoding(remedio.modo_preparo),
              contraindicacoes: fixEncoding(remedio.contraindicacoes)
            }} />
          </Link>
        ))}
      </div>
      <>
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={remedios.length}
        onChange={handlePageChange}
        showSizeChanger
        pageSizeOptions={[5, 10, 20, 50]}
        style={{ marginTop: 24 }}
      />
      </>
      <>
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
            />
            </>
    </div>
  );
}