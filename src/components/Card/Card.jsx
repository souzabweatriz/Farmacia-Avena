import styles from "./Card.module.css";
import Image from "next/image";
import { fixEncoding } from "../../utils/fixEncoding";

export default function Card({ remedio }) {
    return (
        <div className={styles.card}>
            <Image
                src={remedio.photo}
                alt={remedio.nome_remedio}
                width={180}
                height={120}
                className={styles.imagem}
            />
            <h2 className={styles.itens}>{remedio.nome_remedio}</h2>
            <p className={styles.itens}><strong>Efeito:</strong> {remedio.efeito_remedio}</p>
            <p className={styles.itens}><strong>Modo de preparo:</strong> {remedio.modo_preparo}</p>
            <p className={styles.itens}><strong>Contraindicações:</strong> {remedio.contraindicacoes}</p>
        </div>
    )
}