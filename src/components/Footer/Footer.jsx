"use client"
import styles from "./Footer.module.css"
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function Footer() {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Email cadastrado:", email);
        setEmail("");
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.company}>
                    <div className={styles.logoSection}>
                            <h3>🌿 Farmácia Avena</h3>
                            <p>Sua saúde natural</p>
                    </div>
                    <p className={styles.description}>
                        Cuidando da sua saúde com produtos naturais e de qualidade. 
                        Mais de 10 anos oferecendo o melhor em medicina alternativa.
                    </p>
                </div>
                <div className={styles.section}>
                    <h4>Links Rápidos</h4>
                    <ul>
                        <li><Link href="/">Início</Link></li>
                        <li><Link href="/products">Produtos</Link></li>
                        <li><Link href="/about">Sobre Nós</Link></li>
                        <li><Link href="/contact">Contato</Link></li>
                    </ul>
                </div>

                {/* Contato */}
                <div className={styles.section}>
                    <h4>Contato</h4>
                    <div className={styles.contactInfo}>
                        <p>📍 Rua da Saúde, 123<br/>São Paulo - SP</p>
                        <p>📞 (11) 1234-5678</p>
                        <p>✉️ contato@farmaciaavena.com</p>
                    </div>
                </div>

                {/* Newsletter e Social */}
                <div className={styles.newsletter}>
                    <h4>Newsletter</h4>
                    <form onSubmit={handleSubmit} className={styles.emailForm}>
                        <input 
                            type="email" 
                            placeholder="Seu e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit">✉️</button>
                    </form>
                    
                    <div className={styles.social}>
                        <p>Siga a desenvolvedora:</p>
                        <div className={styles.socialIcons}>
                            <Link href="https://www.instagram.com/souzabweatriz_?igsh=MWUzaHFrOTh5N2prZA%3D%3D&utm_source=qr" title="Instagram">�</Link>
                            <Link href="https://www.linkedin.com/in/ana-beatriz-de-souza-745b222b1" title="LinkedIn">💼</Link>
                            <Link href="https://github.com/souzabweatriz" title="GitHub">💻</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.copyright}>
                <p>&copy; 2024 Farmácia Avena. Todos os direitos reservados.</p>
            </div>
        </div>
    )
}