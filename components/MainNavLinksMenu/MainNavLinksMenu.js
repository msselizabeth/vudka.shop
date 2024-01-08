"use client"
import Link from "next/link";
import styles from "./MainNavLinksMenu.module.css";
import { usePathname } from "next/navigation";

export const MainNavLinksMenu = ({title, menu}) => {

    const pathname = usePathname();

    return (
      <section className="section">
        <div className="container">
          <h1 className="title">{title}</h1>
          <ul className={styles.list}>
            {menu.map(({id, path, name})=> {
              return <li key={id} className={styles.item}>
                <Link
                  href={path}
                  className={`${styles.link} ${
                    pathname === path ? styles.current : ""
                  }`}
                >
                  {name}
                </Link>
              </li>;
            })}
          </ul>
        </div>
      </section>
    );
}