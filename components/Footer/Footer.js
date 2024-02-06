import Link from "next/link";
import { FacebookIcon } from "../icons/FacebookIcon";
import { InstaIcon } from "../icons/InstaIcon";
import { MailIcon } from "../icons/MailIcon";
import { PhoneIcon } from "../icons/PhoneIcon";
import styles from "./Footer.module.css";
import Image from "next/image";
import { rybalskiSnastiMenu } from "../../data/rybalski-snasti";
import { osnashchennyaMenu } from "../../data/osnashchennya";
import { prymankyPrykormkyMenu } from "../../data/prymanky-ta-prykormky";
import { CartIcon } from "../icons/CartIcon";

const Footer = () => {
  return (
    <>
      <div className={`${styles.footer__container} container`}>
        <div className={styles.navInfo__box}>
          <div className={styles.nav__container}>
            <h2 className={styles.nav__title}>Навігація по сайту:</h2>
            <ul className={styles.nav__list}>
              <li>
                <Link href={"/rybalski-snasti"} className={styles.nav__link}>
                  Снасті
                </Link>
              </li>
              <li>
                <Link href={"/osnashchennya"} className={styles.nav__link}>
                  Оснащення
                </Link>
              </li>
              <li>
                <Link
                  href={"/prymanky-ta-prykormky"}
                  className={styles.nav__link}
                >
                  Приманки/прикормки
                </Link>
              </li>
              <li>
                <Link href={"/odyah"} className={styles.nav__link}>
                  Одяг
                </Link>
              </li>
              <li>
                <Link href={"/camping"} className={styles.nav__link}>
                  Кемпінг
                </Link>
              </li>
              <li>
                <Link href={"/dvyhuny"} className={styles.nav__link}>
                  Човни/двигуни
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.info__container}>
            <h2 className={styles.info__title}>Інформаційні сторінки:</h2>
            <ul className={styles.info__list}>
              <li>
                <Link href={"/sale"} className={styles.info__link}>
                  Акції
                </Link>
              </li>
              <li>
                <Link
                  href={"/oplata-ta-dostavka"}
                  className={styles.info__link}
                >
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
        </div>

        <div className={styles.contactSocialLogo__box}>
          <div className={styles.contacts__style__box}>
            <div className={styles.contacts__container}>
              <h2 className={styles.contacts__title}>Контакти:</h2>
              <ul className={styles.contacts__list}>
                <li>
                  <Link
                    href={"tel:+380505545869"}
                    className={styles.contacts__link}
                  >
                    <PhoneIcon /> +38(050)554-58-69
                  </Link>
                </li>
                <li>
                  <Link
                    href={"mailto:vudkashop@gmail.com"}
                    className={styles.contacts__link}
                  >
                    <MailIcon /> vudkashop@gmail.com
                  </Link>
                </li>
              </ul>
            </div>
            <div className={styles.social__container}>
              <h2 className={styles.social__title}>Соціальні мережі:</h2>
              <ul className={styles.social__list}>
                <li>
                  <Link
                    href={
                      "https://www.instagram.com/supmarket_rybalka?igsh=ZDE1MWVjZGVmZQ=="
                    }
                    className={styles.social__link}
                  >
                    <InstaIcon />
                  </Link>
                </li>
                <li>
                  <Link
                    href={"https://www.facebook.com/supmarketrybalka"}
                    className={styles.social__link}
                  >
                    <FacebookIcon />
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.footer__end}>
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
            <Link href="/cart" className={styles.cart__link}>
              <CartIcon />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
