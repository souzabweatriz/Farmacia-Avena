import styles from "../BuyCard/page.module.css";
import Image from "next/image";

export default function BuyCard(){
    return(
    <div className={styles.card}>
        <h2 className={styles.title}>Compre seus remédios com facilidade!</h2>
        <p className={styles.description}>Encontre os melhores preços e ofertas em Lojas Parceiras!</p>
        <Link href="https://www.rotulodobem.com.br/" className={styles.link}>Visite a Rótulo do Bem</Link>
        <div className={styles.imageContainer}>
        </div>
    </div>
    )
}