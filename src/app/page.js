import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";
import { test } from "../../data/test";
import { ReelProduct } from "../../components/Reels/ReelProduct";

export default function Home() {
  console.log(test.img);

  return (
    <>
      <section className="hero-section">
        <div className={styles.hero__container}>
          <h1 className={styles.hero__title}>
            Супермаркет рибальських та туристичних товарів
          </h1>
          <h2 className={styles.hero__logo}>Вудка.шоп</h2>
          <Link href={"/"} className={styles.hero__link}>
            Каталог
          </Link>
        </div>
      </section>

      <ReelProduct />
    </>
  );
}
