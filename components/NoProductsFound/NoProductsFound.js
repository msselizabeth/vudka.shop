import styles from "./NoFoundProductsFound.module.css";

const NoProductsFound = () => {

    return (
      <p className={styles.text}>
        Вибачте, але товарів за обраними фільтрами не знайдено. Спробуйте
        змінити запит.
      </p>
    );
}

export default NoProductsFound;