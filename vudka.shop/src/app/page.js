
import Link from 'next/link'
import styles from './page.module.css'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <section className="section">
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

     
    </>
  );
}
