import styles from "../BuyCard/BuyCard.module.css";
import Link from "next/link";
import Image from "next/image";

export default function BuyCard({link, place }){
    return(
    <div className={styles.card}>
        <h2 className={styles.title}>Buy your medicines easily!</h2>
        <p className={styles.description}>Find the best prices and offers at Partner Stores!</p>
        <Link href={link} className={styles.link}>{place}</Link>
        <div className={styles.imageContainer}>
        </div>
    </div>
    )
}