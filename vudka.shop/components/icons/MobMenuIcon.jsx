import styles from "../Header/MobileMenu.module.css"

export const MobMenuIcon = () => {
    return (
      <svg
        version="1.1"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className={styles.mob__menu__icon}
      >
        <path d="M19 17h-14c-1.103 0-2 0.897-2 2s0.897 2 2 2h14c1.103 0 2-0.897 2-2s-0.897-2-2-2z"></path>
        <path d="M19 10h-14c-1.103 0-2 0.897-2 2s0.897 2 2 2h14c1.103 0 2-0.897 2-2s-0.897-2-2-2z"></path>
        <path d="M19 3h-14c-1.103 0-2 0.897-2 2s0.897 2 2 2h14c1.103 0 2-0.897 2-2s-0.897-2-2-2z"></path>
      </svg>
    );
}