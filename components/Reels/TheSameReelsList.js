import styles from "./TheSameReelsList.module.css"
import Image from "next/image";
import Link from "next/link";

const TheSameReelsList = ({ reels, currentReel }) => {
  const compareReels = reels.sort((a, b) => {
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
        className={`title ${styles.sameReels__title}`}
      >{`Інші товари серії ${currentReel.brand} ${currentReel.series}:`}</h2>
      <ul className={styles.reels__list}>
        {compareReels.map((reel) => {
          if (currentReel._id !== reel._id) {
            return (
              <li key={reel._id}>
                <Link
                  href={`/rybalski-snasti/katushky/${reel._id}`}
                  className={styles.reels__link}
                >
                  <Image
                    src={reel.img[0]}
                    alt={reel.alt}
                    width={50}
                    height={50}
                    className={styles.reels__img}
                    priority={true}
                  />
                  <h3 className={styles.reels__name}>{`${reel.name} ${reel.brand} ${reel.series} ${reel.model}`}</h3>
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

export default TheSameReelsList;
