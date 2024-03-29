import styles from "./icons.module.css";

export const CartIcon = () => {
  return (
    <svg
      className={styles.cart__icon}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d="M12 29C12 30.657 10.657 32 9 32C7.343 32 6 30.657 6 29C6 27.343 7.343 26 9 26C10.657 26 12 27.343 12 29Z"
        
      />
      <path
        d="M32 29C32 30.657 30.657 32 29 32C27.343 32 26 30.657 26 29C26 27.343 27.343 26 29 26C30.657 26 32 27.343 32 29Z"
        
      />
      <path
        d="M32 16V4H8C8 2.895 7.105 2 6 2H0V4H4L5.502 16.877C4.587 17.61 4 18.736 4 20C4 22.209 5.791 24 8 24H32V22H8C6.895 22 6 21.105 6 20C6 19.993 6 19.986 6 19.98L32 16Z"
       
      />
    </svg>
  );
};
