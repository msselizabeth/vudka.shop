"use client"
import styles from "./MainNavLinksInnerMenu.module.css";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const MainNavLinksInnerMenu = ({ title, menu }) => {
  const pathname = usePathname();
  return (
    <section className="section">
      <div className="container">
              <h2 className="title">{title}</h2>
              <ul className={styles.list}>
                  {menu.map(({ id, path, name }) => {
                      return (
                        <li key={id} className={styles.item}>
                          <Link
                            href={path}
                            className={`${styles.link} ${
                              pathname === path ? styles.current : ""
                            }`}
                          >
                            {name}
                          </Link>
                        </li>
                      );
                  })}
        </ul>
      </div>
    </section>
  );
};