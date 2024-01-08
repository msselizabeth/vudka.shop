"use client"
import { usePathname } from "next/navigation";
// import { navList } from "./MobileMenu";
import styles from "../styles/Header.module.scss";
import Link from "next/link";

export const MainNavList = ({navList}) => {

  const pathname = usePathname();


    return (
      <ul className={styles.navList}>
        {navList.map(({ id, title, path, pathEn }) => {
          return (
            <li key={id} className={styles.navListItem}>
              <Link
                href={path}
                className={`${styles.navListLink} ${
                  pathname === path || pathname === pathEn
                    ? `${styles.current}`
                    : ""
                }`}
              >
                {title}
              </Link>
            </li>
          );
        })}
      </ul>
    );
}