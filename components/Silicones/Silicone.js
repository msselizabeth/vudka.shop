import { Carousel } from "../Carousel/Carousel";
import SiliconeModelSelector from "./SiliconeModelSelector";

import styles from "./Silicone.module.css";

const SiliconProduct = ({ silicone }) => {
  
  return (
    <div className={styles.silicone__info__container}>
      <SiliconeModelSelector models={silicone.colors} silicone={silicone} />
      <div className={styles.description__container}>
        <h2 className="title">{`Опис силікону ${silicone.brand} ${silicone.series} ${silicone.model}" :`}</h2>
        <ul className={styles.description__list}>{silicone.description.map((item, index) => <li key={index}>
          <p>{item.text}</p>
        </li>)}</ul>
      </div>
    </div>
  );
};

export default SiliconProduct;
