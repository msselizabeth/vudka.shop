import Image from "next/image";
import styles from "./Header.module.css";
import Link from "next/link";
import { MobileMenu } from "./MobileMenu";
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
            <li className={styles.dropdown}>
              <Link href={"/rybalski-snasti"} className={styles.dropbtn}>
                Снасті
              </Link>
              <ul className={styles.dropdown__content}>
                {rybalskiSnastiMenu.map((item) => (
                  <li key={item.id}>
                    <Link href={item.path}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className={styles.dropdown}>
              <Link href={"/osnashchennya"} className={styles.dropbtn}>
                Оснащення
              </Link>
              <ul className={styles.dropdown__content}>
                {osnashchennyaMenu.map((item) => (
                  <li key={item.id}>
                    <Link href={item.path}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className={styles.dropdown}>
              <Link href={"/prymanky-ta-prykormky"} className={styles.dropbtn}>
                Приманки/прикормки
              </Link>
              <ul className={styles.dropdown__content}>
                {prymankyPrykormkyMenu.map((item) => (
                  <li key={item.id}>
                    <Link href={item.path}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className={styles.dropdown}>
              <Link href={"/odyah"} className={styles.dropbtn}>
                Одяг
              </Link>
              <ul className={styles.dropdown__content}>
                {rybalskiSnastiMenu.map((item) => (
                  <li key={item.id}>
                    <Link href={item.path}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className={styles.dropdown}>
              <Link href={"/camping"} className={styles.dropbtn}>
                Кемпінг
              </Link>
              <ul className={styles.dropdown__content}>
                {rybalskiSnastiMenu.map((item) => (
                  <li key={item.id}>
                    <Link href={item.path}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className={styles.dropdown}>
              <Link href={"/dvyhuny"} className={styles.dropbtn}>
                Човни/двигуни
              </Link>
              <ul className={styles.dropdown__content}>
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
        <div className={styles.info__container}>
          <ul className={styles.info__list}>
            <li>
              <Link href={"/sale"} className={styles.info__link}>
                Акції
              </Link>
            </li>
            <li>
              <Link href={"/oplata-ta-dostavka"} className={styles.info__link}>
                Оплата та доставка
              </Link>
            </li>
            <li>
              <Link href={"/contacts"} className={styles.info__link}>
                Контакти
              </Link>
            </li>
            <li>
              <Link href={"/gallery"} className={styles.info__link}>
                Фото
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.contact__container}>
          <ul className={styles.contact__list}>
            <li>
              <Link href={"tel:+380505545869"} className={styles.contact__link}>
                {"+38(050)-554-58-69"}
              </Link>
            </li>
            <li>
              <Link
                href={"mailto:vudkashop@gmail.com"}
                className={styles.info__link}
              >
                vudkashop@gmail.com
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
