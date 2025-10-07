import styles from "../contact/contact.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Contact() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h2 className={styles.title}>Entre em contato comigo!</h2>
                <p className={styles.description}>
                    Fique à vontade para me enviar dúvidas, sugestões ou compartilhar seu feedback sobre o site.
                    Seu contato é muito importante para o aprimoramento do projeto!
                </p>
                <div className={styles.emailSection}>
                    <span className={styles.emailLabel}>E-mail:</span>
                    <a className={styles.email} href="mailto:ana.b.oliveira56@aluno.senai.br">ana.b.oliveira56@aluno.senai.br</a>
                </div>
                <div className={styles.socialLinks}>
                    <Link className={styles.link} href="https://www.instagram.com/souzabweatriz_?igsh=MWUzaHFrOTh5N2prZA%3D%3D&utm_source=qr" title="Instagram" target="_blank">Instagram</Link>
                    <Link className={styles.link} href="https://www.linkedin.com/in/ana-beatriz-de-souza-745b222b1" title="LinkedIn" target="_blank">LinkedIn</Link>
                    <Link className={styles.link} href="https://github.com/souzabweatriz" title="GitHub" target="_blank">GitHub</Link>
                </div>
            </div>
        </div>
    )
}