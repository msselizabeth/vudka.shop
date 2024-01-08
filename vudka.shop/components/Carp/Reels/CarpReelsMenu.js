"use client"
import Link from "next/link";
import styles from "./CarpReelsmenu.module.css";
import { usePathname } from "next/navigation";

export const CarpReelsMenu = () => {
    
    const pathname = usePathname();
    return (
      <section className="section">
        <div className="container">
          <h2 className="title">Коропові котушки</h2>
          <ul className={styles.carp__reels__list}>
            <li>
              <Link
                href={"/carp/reels/carp-reels"}
                className={`${styles.carp__reels__link} ${
                  pathname === "/carp/reels/carp-reels" ? styles.current : ""
                }`}
              >
                Коропові
              </Link>
            </li>
            <li>
              <Link
                href={"/carp/reels/spod-reels"}
                className={`${styles.carp__reels__link} ${
                  pathname === "/carp/reels/spod-reels" ? styles.current : ""
                }`}
              >
                Сподові та маркерні
              </Link>
            </li>
          </ul>
        </div>
      </section>
    );
}