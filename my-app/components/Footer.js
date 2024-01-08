import Link from "next/link";
import styles from "../styles/Footer.module.scss";
import { daysOne } from "@/app/[locale]/layout";

export const Footer = () => {
    return (
      <footer className={styles.footer}>
        <div className={styles.bgContainer}>
          <div className={`container ${styles.footerContainer}`}>
            <div className={styles.footerNavContainer}>
              <h3 className={styles.footerTitle}>Навігація по сайту</h3>
              <ul className={styles.footerNavList}>
                <li>
                  <Link href="/" className={`${styles.footerNavLink} ${styles.footerNavLinkHome}`}>
                    Головна 
                  </Link>
                </li>
                <li>
                  <Link href="/continents" className={`${styles.footerNavLink} ${styles.footerNavLinkContinents}`}>
                    Континенти 
                  </Link>
                </li>
                <li>
                  <Link href="/countries" className={`${styles.footerNavLink} ${styles.footerNavLinkCountries}`}>
                    Країни 
                  </Link>
                </li>
                <li>
                  <Link href="/recipes" className={`${styles.footerNavLink} ${styles.footerNavLinkRecipes}`}>
                    Рецепти 
                  </Link>
                </li>
                <li>
                  <Link href="/products" className={`${styles.footerNavLink} ${styles.footerNavLinkProducts}`}>
                    Продукти 
                  </Link>
                </li>
                <li>
                  <Link href="/manual" className={`${styles.footerNavLink} ${styles.footerNavLinkManual}`}>
                    Довідник 
                  </Link>
                </li>
                <li>
                  <Link href="/#contacts" className={`${styles.footerNavLink} ${styles.footerNavLinkContacts}`}>
                    Контакти 
                  </Link>
                </li>
                <li>
                  <Link href="/#author" className={`${styles.footerNavLink} ${styles.footerNavLinkAuthor}`}>
                    Про автора 
                  </Link>
                </li>
                <li>
                  <Link href="/#resource" className={`${styles.footerNavLink} ${styles.footerNavLinkResource}`}>
                    Про ресурс 
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className={styles.footerContactsStyleBox}>
              <div className={styles.footerContactsContainer}>
                <h3 className={styles.footerTitle}>Зворотній звʼязок</h3>
                <ul className={styles.footerContactsList}>
                  <li>
                    <Link
                      href="https://instagram.com/_gastroguide?igshid=NTc4MTIwNjQ2YQ=="
                      className={`${styles.footerContactsLink} ${styles.footerContactsLinkInsta}`}
                      target="_blank"
                    >
                     
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.facebook.com/profile.php?id=100095173823392"
                      className={`${styles.footerContactsLink} ${styles.footerContactsLinkFb}`}
                      target="_blank"
                    >
                      
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="mailto:gastroguide@ukr.net"
                      className={`${styles.footerContactsLink} ${styles.footerContactsLinkMail}`}
                      target="_blank"
                    >
                    
                      gastroguide@ukr.net
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <Link
              href="/"
              className={`${styles.footerLogo} ${daysOne.className}`}
            >
              Gastro
              <span className={styles.footerLogoDecorWord}>Guide</span>
            </Link>
          </div>
        </div>
      </footer>
    );
};
