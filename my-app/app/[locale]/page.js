
import { useTranslations } from "next-intl";
import Link from 'next-intl/link';
import { monsA } from "./layout";
// import Link from 'next/link';
import styles from "../../styles/Home.module.scss";
import { WorldMap } from "../../components/icons/WorldMapIcon";

const enMetadata = {
  title: "Gastronomic Guide",
};
const uaMetadata = {
  title: "Гастрономічний гід",
};

export async function generateMetadata({params}) {
  return params.locale === "en" ? enMetadata : uaMetadata;
}


export default function Home() {
  const t = useTranslations("Home");

  return (
    <>
      <section className={`section ${styles.hero}`}>
        <div className={`container ${styles.heroContainer}`}>
          <WorldMap />
          <Link
            className={`${styles.heroLink} ${styles.heroLinkGreenland}`}
            href="#"
          >
            {t("greenland")}
          </Link>
          <Link className={`${styles.heroLink} ${styles.heroLinkNA}`} href="#">
            {t("na")}
          </Link>
          <Link className={`${styles.heroLink} ${styles.heroLinkSA}`} href="#">
            {t("sa")}
          </Link>
          <Link
            className={`${styles.heroLink} ${styles.heroLinkAfrica}`}
            href="#"
          >
            {t("africa")}
          </Link>
          <Link
            className={`${styles.heroLink} ${styles.heroLinkEurope}`}
            href="#"
          >
            {t("eu")}
          </Link>
          <Link
            className={`${styles.heroLink} ${styles.heroLinkAsia}`}
            href="#"
          >
            {t("asia")}
          </Link>
          <Link className={`${styles.heroLink} ${styles.heroLinkAU}`} href="#">
            {t("au")}
          </Link>

          <h1 className={`${styles.heroTitle} ${monsA.className}`}>
            {t("title")}
          </h1>
        </div>
      </section>
    </>
  );
}
