
import Link from "next/link";
import Image from "next/image";
import logo from "../public/logo-icon.svg";
import { LoginIcon } from "./icons/LoginIcon";
import { RegisterIcon } from "./icons/RegisterIcon";
import { MobileMenu } from "./MobileMenu";
import { MainNavList } from "./MainNavList";
import styles from "../styles/Header.module.scss";
import { daysOne } from "@/app/layout";
import { LogoIcon } from "./icons/LogoIcon";


export const navList = [
  { id: 1, title: "Головна", path: "/" },
  { id: 2, title: "Континенти", path: "/continents" },
  { id: 3, title: "Країни", path: "/countries" },
  { id: 4, title: "Рецепти", path: "/recipes" },
  { id: 5, title: "Продукти", path: "/products" },
  { id: 6, title: "Довідник", path: "/manual" },
];

export const Header = () => {
  
  
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
          <MainNavList />

          <MobileMenu />

          <ul className={styles.authList}>
            <li>
              <Link href="#" className={`${styles.authListLink} ${styles.authListLinkAuth}`}>
                 Авторизація
              </Link>
            </li>
            <li>
            <Link href="#" className={`${styles.authListLink} ${styles.authListLinkRegister}`}>
                Реєстрація
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
