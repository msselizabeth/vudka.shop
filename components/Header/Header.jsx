import Image from "next/image";
import styles from "./Header.module.css";
import Link from "next/link";
import { MobileMenu } from "./MobileMenu";
import { RSC_VARY_HEADER } from "next/dist/client/components/app-router-headers";
import { rybalskiSnastiMenu } from "../../data/rybalski-snasti";
import { osnashchennyaMenu } from "../../data/osnashchennya";
import { prymankyPrykormkyMenu } from "../../data/prymanky-ta-prykormky";
import { HomeIcon } from "../icons/HomeIcon";
import { CartIcon } from "../icons/CartIcon";


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

            <ul className={styles.nav__list}>
              {/* <li>
                <Link href="/" className={styles.home__link}>
                  <HomeIcon />
                </Link>
              </li> */}
              <li class={styles.dropdown}>
                <Link href={"/rybalski-snasti"} class={styles.dropbtn}>
                  Снасті
                </Link>
                <ul class={styles.dropdown__content}>
                  {rybalskiSnastiMenu.map((item) => (
                    <li key={item.id}>
                      <Link href={item.path}>{item.name}</Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li class={styles.dropdown}>
                <Link href={"/osnashchennya"} class={styles.dropbtn}>
                  Оснащення
                </Link>
                <ul class={styles.dropdown__content}>
                  {osnashchennyaMenu.map((item) => (
                    <li key={item.id}>
                      <Link href={item.path}>{item.name}</Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li class={styles.dropdown}>
                <Link href={"/prymanky-ta-prykormky"} class={styles.dropbtn}>
                  Приманки/прикормки
                </Link>
                <ul class={styles.dropdown__content}>
                  {prymankyPrykormkyMenu.map((item) => (
                    <li key={item.id}>
                      <Link href={item.path}>{item.name}</Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li class={styles.dropdown}>
                <Link href={"/odyah"} class={styles.dropbtn}>
                  Одяг
                </Link>
                <ul class={styles.dropdown__content}>
                  {rybalskiSnastiMenu.map((item) => (
                    <li key={item.id}>
                      <Link href={item.path}>{item.name}</Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li class={styles.dropdown}>
                <Link href={"/camping"} class={styles.dropbtn}>
                  Кемпінг
                </Link>
                <ul class={styles.dropdown__content}>
                  {rybalskiSnastiMenu.map((item) => (
                    <li key={item.id}>
                      <Link href={item.path}>{item.name}</Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li class={styles.dropdown}>
                <Link href={"/dvyhuny"} class={styles.dropbtn}>
                  Човни/двигуни
                </Link>
                <ul class={styles.dropdown__content}>
                  {rybalskiSnastiMenu.map((item) => (
                    <li key={item.id}>
                      <Link href={item.path}>{item.name}</Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
            <Link href="/cart" className={styles.cart__link}>
              <CartIcon />
            </Link>
          </nav>
        </div>
      </>
    );
}