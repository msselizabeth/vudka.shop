import styles from "../Header/MobileMenu.module.css"

export const MobInnerMenuIcon = () => {
    return (
      <svg
        version="1.1"
        width="44"
        height="32"
            viewBox="0 0 44 32"
            className={styles.mob__inner__icon}
      >
        <path d="M0 6h28v6h-28v-6zM0 14h28v6h-28v-6zM0 22h28v6h-28v-6z"></path>
        <path d="M31 18l6 6 6-6z"></path>
        <path d="M43 16l-6-6-6 6z"></path>
      </svg>
    );
}