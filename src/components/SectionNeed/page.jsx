import styles from "./SectionNeed.module.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SectionNeed({ showTitle = false, categoryImages = {} }) {
    const [categorias, setCategorias] = useState([]);
    const [erro, setErro] = useState("");
    const router = useRouter();

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categorias`);
                if (!res.ok) throw new Error("Erro ao buscar categorias");
                const data = await res.json();
                console.log("Categorias fetched:", data);
                setCategorias(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
                setErro("Erro ao carregar as categorias. Tente novamente mais tarde.");
            }
        };
        fetchCategorias();
    }, []);

    const handleRemedyClick = async (id) => {
        try {
            await router.push(`/products/${id}`); // Corrigido para a rota correta
        } catch (error) {
            console.error("Erro ao navegar para o produto:", error);
            setErro("Erro ao navegar para o produto. Tente novamente.");
        }
    };

    return (
        <div className={styles.container}>
            {showTitle && <h1 className={styles.title}>Need a specific Remedy?</h1>}
            {erro && <p className={styles.error}>{erro}</p>}
            {categorias.length === 0 && !erro && showTitle && (
                <p>Carregando categorias...</p>
            )}
            <ul className={styles.list}>
                {Array.isArray(categorias) && categorias.map(categoria => (
                    <li key={categoria.id} className={styles.item}>
                        <Link href={`/categoria/${categoria.id}`}>
                            <Image
                                src={categoryImages[categoria.id] || "/images/logoAvena.png"}
                                alt={categoria.nome_categoria}
                                width={100}
                                height={100}
                            />
                            <h2 className={styles.itemTitle}>{categoria.nome_categoria}</h2>
                        </Link>
                        <button
                            className={styles.remedyButton}
                            onClick={() => handleRemedyClick(categoria.id)}
                        >
                            Ver Remédios da Categoria
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}