
// import Link from "next/link";
import Image from "next/image";
import logo from "../public/logo-icon.svg";
import { LoginIcon } from "./icons/LoginIcon";
import { RegisterIcon } from "./icons/RegisterIcon";
import { MobileMenu } from "./MobileMenu";
import { MainNavList } from "./MainNavList";
import styles from "../styles/Header.module.scss";
import { daysOne } from "@/app/[locale]/layout";
import { LogoIcon } from "./icons/LogoIcon";

import { useTranslations } from "next-intl";
import Link from "next-intl/link";

 
export const Header = () => {
  const t  = useTranslations("Header");

  const navList = [
    { id: 1, title: t("home"), path: "/", pathEn: "/en" },
    { id: 2, title: t("continents"), path: "/continents", pathEn: "/en/continents" },
    { id: 3, title: t("countries"), path: "/countries", pathEn: "en/countries" },
    { id: 4, title: t("recipes"), path: "/recipes", pathEn: "en/recipes" },
    { id: 5, title: t("products"), path: "/products", pathEn: "en/products" },
    { id: 6, title: t("manual"), path: "/manual", pathEn: "en/manual" },
  ];

  
  return (
    <header className={`${styles.header}`}>
      <div className={`${styles.bgContainer} `}>
        <nav className={`${styles.headerNav} container`}>
          <Link
            href="/"
            className={`${styles.headerLogo} ${daysOne.className}`}
          >
            Gastro
            <span className={styles.headerLogoDecorWord}>Guide</span>
          </Link>
          <div className={styles.locale}>
            <Link href="/" locale="en" className={styles.localeLink}>
              EN
            </Link>

            <Link href="/" locale="ua" className={styles.localeLink}>
              УКР
            </Link>
          </div>
          <MainNavList navList={navList} />

          <MobileMenu />

          <ul className={styles.authList}>
            <li>
              <Link
                href="#"
                className={`${styles.authListLink} ${styles.authListLinkAuth}`}
              >
                {t("auth")}
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className={`${styles.authListLink} ${styles.authListLinkRegister}`}
              >
                {t("registrate")}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
