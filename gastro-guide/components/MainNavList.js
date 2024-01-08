"use client"
import { usePathname } from "next/navigation";
import { navList } from "./MobileMenu";
import styles from "../styles/Header.module.scss";
import Link from "next/link";

export const MainNavList = () => {

    const pathname = usePathname();

    return (
      <ul className={styles.navList}>
        {navList.map(({ id, title, path }) => {
          return (
            <li key={id} className={styles.navListItem}>
              <Link
                href={path}
                className={`${styles.navListLink} ${
                  pathname === path ? `${styles.current}` : ""
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