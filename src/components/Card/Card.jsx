import styles from "./Card.module.css";
import Image from "next/image";

export default function Card({ remedio }) {
    return (
        <div className={styles.card}>
            <Image
                src={remedio.photo || '/images/placeholder.svg'}
                alt={remedio.nome_remedio || 'Remédio'}
                width={400}
                height={300}
                className={styles.imagem}
                onError={(e) => {
                    e.target.src = '/images/placeholder.svg';
                }}
            />
            <h2 className={styles.itens}>{remedio.nome_remedio || 'Nome não disponível'}</h2>
        </div>
    );
}