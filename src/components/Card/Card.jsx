import styles from "./Card.module.css";
import Image from "next/image";
import { fixEncoding } from "../../utils/fixEncoding";

export default function Card({ remedio }) {
    return (
        <div className={styles.card}>
            <Image
                src={remedio.photo}
                alt={fixEncoding(remedio.nome_remedio)}
                width={180}
                height={120}
                className={styles.imagem}
            />
            <h2 className={styles.nomeRemedio}>{fixEncoding(remedio.nome_remedio)}</h2>
            <p className={styles.itens}><strong>Efeito:</strong> {fixEncoding(remedio.efeito_remedio)}</p>
            <p className={styles.itens}><strong>Modo de preparo:</strong> {fixEncoding(remedio.modo_preparo)}</p>
            <p className={styles.itens}><strong>Contraindicações:</strong> {fixEncoding(remedio.contraindicacoes)}</p>
        </div>
    )
}