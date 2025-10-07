import styles from "./Header.module.css"
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <div className={styles.container}>
            <Image
            className={styles.logo}
            src="/images/logoAvena.png"
            alt="Farmácia Avena Logo"
            width={120}
            height={110}
            priority
            />
            <div className={styles.links}>
            <Link href="/" className={styles.link}>Home</Link>
            <Link href="/about" className={styles.link}>About</Link>
            <Link href="/products" className={styles.link}>Products</Link>
            <Link href="/services" className={styles.link}>Services</Link>
            <Link href="/contact" className={styles.link}>Contact</Link> 
            </div>
        </div>
    )
}