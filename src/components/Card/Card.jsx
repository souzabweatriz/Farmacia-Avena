import styles from "./Card.module.css";
import Image from "next/image";

export default function Card({ remedio }) {
    if (!remedio) {
        return null;
    }

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
            <p className={styles.itens}><strong>Effect:</strong> {remedio.efeito_remedio || 'Não informado'}</p>
            <p className={styles.itens}><strong>Preparation method:</strong> {remedio.modo_preparo || 'Não informado'}</p>
            <p className={styles.itens}><strong>Contraindications:</strong> {remedio.contraindicacoes || 'Não informado'}</p>
        </div>
    );
}