import styles from "../SectionNeed/SectionNeed.module.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SectionNeed({showTitle = false, categoryImages = {}}) {
    const [categorias, setCategorias] = useState([]);
    const [erro, setErro] = useState("");

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categorias`);
                if (!res.ok) throw new Error();
                const data = await res.json();
                console.log('Categorias fetched:', data);
                setCategorias(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setErro("Error fetching categories");
            }
        };
        fetchCategorias();
    }, []);

    return (
        <div className={styles.container}>
            {showTitle && <h1 className={styles.title}>Need a specific Remedy?</h1>}
            {erro && <p className={styles.error}>{erro}</p>}
            {categorias.length === 0 && !erro && showTitle && (
                <p>Loading categories...</p>
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
                    </li>
                ))}
            </ul>
        </div>
    )
}