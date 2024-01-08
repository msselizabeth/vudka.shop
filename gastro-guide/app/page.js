import Image from "next/image";
import { mons, daysOne, monsA } from "./layout";
import Link from "next/link";
import styles from "../styles/Home.module.scss";

export default function Home() {
  return (
    <section className={`section ${styles.hero}`} >
      <div className={`container ${styles.heroContainer}`}>
        <Link className={`${styles.heroLink} ${styles.heroLinkGreenland}`} href="#">Greenland</Link>
        <Link className={`${styles.heroLink} ${styles.heroLinkNA}`} href="#">North <br/> America</Link>
        <Link className={`${styles.heroLink} ${styles.heroLinkSA}`} href="#">South <br/> America</Link>
        <Link className={`${styles.heroLink} ${styles.heroLinkAfrica}`} href="#">Africa</Link>
        <Link className={`${styles.heroLink} ${styles.heroLinkEurope}`} href="#">Europe</Link>
        <Link className={`${styles.heroLink} ${styles.heroLinkAsia}`} href="#">Asia</Link>
        <Link className={`${styles.heroLink} ${styles.heroLinkAU}`} href="#">Australia</Link>

        <h1 className={`${styles.heroTitle} ${monsA.className}`}>КУХНІ СВІТУ <br/> ТРАДИЦІЇ ТА ОСОБЛИВОСТІ</h1>
            
        </div>
    </section>
  );
}
