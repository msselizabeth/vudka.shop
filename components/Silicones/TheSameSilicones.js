import Image from "next/image";
import Link from "next/link";
import styles from "./TheSameSilicones.module.css";

const TheSameSiliconesList = ({ silicones, currentSilicone }) => {
  const compareSilicones = silicones.sort((a, b) => {
    const brandComparison = a.brand.localeCompare(b.brand);
    if (brandComparison !== 0) return brandComparison;

    const seriesComparison = a.series.localeCompare(b.series);
    if (seriesComparison !== 0) return seriesComparison;

    const modelComparison = a.model.localeCompare(b.model);
    if (modelComparison !== 0) return modelComparison;

    return a.name.localeCompare(b.name);
  });
    
  return (
    <>
      <h2
        className={`title ${styles.sameSilicones__title}`}
      >{`Інші товари серії ${currentSilicone.brand} ${currentSilicone.series}:`}</h2>
      <ul className={styles.silicones__list}>
        {compareSilicones.map((silicone) => {
          if (currentSilicone._id !== silicone._id) {
            return (
              <li key={silicone._id}>
                <Link
                  href={`/prymanky-ta-prykormky/sylikon/${silicone._id}`}
                  className={styles.silicones__link}
                >
                  <Image
                    src={silicone.imgMain}
                    alt={silicone.alt}
                    width={50}
                    height={50}
                    className={styles.silicones__img}
                    priority={true}
                  />
                  <h3
                    className={styles.silicones__name}
                  >{`${silicone.name} ${silicone.brand} ${silicone.series} ${silicone.model}"`}</h3>
                </Link>
              </li>
            );
          }
          return;
        })}
      </ul>
    </>
  );
};

export default TheSameSiliconesList;
