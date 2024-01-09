
import { Carousel } from "../Carousel/Carousel";
import { ReelModelSelector } from "./ReelModelSelector";
import styles from "./ReelProduct.module.css";

export const ReelProduct = ({test}) => {
  return (
    <section className="section">
      <div className="container">
        <div className={styles.prod__container}>
            <Carousel images={test.img} alt={"alt image"} />
          <div className={styles.info__container}>
            <h1 className={styles.prod__title}>{`Котушка ${test.brand} ${test.series}`}</h1>
            <ReelModelSelector models={test.models} />
          </div>
        </div>
        <div className={styles.description__container}>
          <h2 className={styles.description__title}>Опис:</h2>
          <ul className={styles.description__list}>
            {test.description.map((item, index) => {
              return <li key={index}>{item.text}</li>;
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};
