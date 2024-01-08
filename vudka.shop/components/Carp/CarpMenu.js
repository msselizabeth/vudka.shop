"use client"
import Link from "next/link";
import {carpMenu} from "../../data/carp"
import styles from "./CarpMenu.module.css";
import { usePathname } from "next/navigation";

export const CarpMenu = () => {

    const pathname = usePathname();

    return (
      <section className="section">
        <div className="container">
          <h1 className="title">Рибаловля на коропа</h1>
          <ul className={styles.carp__menu__list}>
            {carpMenu.map(({id, path, name})=> {
              return <li key={id} className={styles.carp__menu__item}>
                <Link
                  href={path}
                  className={`${styles.carp__menu__link} ${
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