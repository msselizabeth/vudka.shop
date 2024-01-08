import Image from "next/image";
import styles from "./Header.module.css";
import Link from "next/link";
import { MobileMenu } from "./MobileMenu";

export const Header = () => {
    
    return (
      <>
        <div className={`${styles.header__container} container`}>
          <nav className={styles.main__nav}>
            <Link href={"/"} className={styles.logo__link}>
              <Image
                src={"/vudka-logo.svg"}
                width={85}
                height={85}
                alt="Вудка.шоп - логотип інтернет-магазину рибальських товарів"
                className={styles.logo__img}
              />
              <p className={styles.logo__text}>Вудка.шоп</p>
            </Link>
            <MobileMenu />
          </nav>
        </div>
      </>
    );
}