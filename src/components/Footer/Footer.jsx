import styles from "./Footer.module.css"
import Link from "next/link";

export default function Footer() {
    return (
        <div className={styles.container}>
            <div className={styles.itens}>
                <p>© 2024 Farmácia Avena. Todos os direitos reservados.</p>
                <p>Endereço: Rua da Saúde, 123 - Cidade, Estado</p>
                <p>Telefone: (11) 1234-5678 | Email: farmaciaavena@gmail.com</p>
                <Link className={styles.link} href="https://github.com/souzabweatriz" target="_blank" rel="noopener noreferrer">GitHub</Link>
            </div>
        </div>
    )
}