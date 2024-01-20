import styles from "./ButtonMore.module.css";

const ButtonMore = ({ onClick}) => {
  return (
    <div className={styles.loadMoreButton__container}>
      <button className={styles.loadMoreButton} onClick={onClick} type="button">
        Завантажити ще
      </button>
    </div>
  );
};

export default ButtonMore;

