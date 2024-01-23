import Image from "next/image";
import Link from "next/link";
import styles from "./TheSameRods.module.css";


const TheSameRodsList = ({ rods, currentRod }) => {

    const compareRods = rods.sort((a, b) => {
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
      <h2 className={`title ${styles.sameRods__title}`}>{`Інші товари серії ${currentRod.brand} ${currentRod.series}:`}</h2>
      <ul className={styles.rods__list}>
        {compareRods.map((rod) => {
          if (currentRod._id !== rod._id) {
            return (
              <li key={rod._id}>
                <Link
                  href={`/rybalski-snasti/vudylyshcha/${rod._id}`}
                  className={styles.rods__link}
                >
                  <Image
                    src={rod.img[0]}
                    alt={rod.alt}
                    width={50}
                    height={50}
                    className={styles.rods__img}
                    priority={true}
                  />
                  <h3 className={styles.rods__name}>{`${rod.name} ${
                    rod.brand
                  } ${rod.series} ${rod.model} ${rod.rodSize}см ${
                    rod.testMin && `${rod.testMin}-${rod.testMax}г`
                  }`}</h3>
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

export default TheSameRodsList;
