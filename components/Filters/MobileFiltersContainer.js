"use client"
import { useEffect, useState, useRef } from "react"
import { MobMenuCloseIcon } from "../icons/MobMenuCloseIcon";
import styles from "./MobileFiltersContainer.module.css";


const MobileFiltersContainer = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          toggleMenu();
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen]);
    return (
      <>
        <div className={styles.filters__open__container}>
          <button
            type="button"
            onClick={toggleMenu}
            className={styles.filters__open__btn}
          >
            Фільтри
          </button>
        </div>
        <div
          className={`${styles.filters__overlay} ${isOpen ? styles.open : ""}`}
          ref={menuRef}
        >
          <div className={`${styles.filters__cont}`}>
            <button
              className={styles.filters__close__btn}
              type="button"
              onClick={toggleMenu}
            >
              <MobMenuCloseIcon />
            </button>
            {children}
          </div>
        </div>
      </>
    );
}
export default MobileFiltersContainer;