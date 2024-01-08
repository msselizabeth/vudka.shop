import styles from "../../styles/Header.module.scss";

export const LoginIcon = () => {
  return (
    <svg
      version="1.1"
      width="20"
      height="20"
      viewBox="0 0 32 32"
      className={styles.loginIcon}
    >
      <path d="M12 16h-10v-4h10v-4l6 6-6 6zM32 0v26l-12 6v-6h-12v-8h2v6h10v-18l8-4h-18v8h-2v-10z"></path>
    </svg>
  );
};
