"use client"
import { useEffect, useRef, useState } from "react";
import { MobMenuIcon } from "../icons/MobMenuIcon";
import styles from "./MobileMenu.module.css"
import { MobMenuCloseIcon } from "../icons/MobMenuCloseIcon";
import { MobInnerMenuIcon } from "../icons/MobInnerMenuIcon";
import Link from "next/link";
import { carpMenu } from "../../data/carp";
import { feederMenu } from "../../data/feeder";

export const MobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  
  const [innerMenuStates, setInnerMenuStates] = useState({
    carp: false,
    feeder: false,
  });

  const toggleInnerMenu = (menu) => {
    setInnerMenuStates((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu],
    }));
  };
    
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }
  
    
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
        <button
          className={styles.mob__menu__btn}
          type="button"
          onClick={toggleMenu}
        >
          <MobMenuIcon />
        </button>

        <div
          className={`${styles.mob__menu__overlay} ${
            isOpen ? styles.open : ""
          }`}
          ref={menuRef}
        >
          <div className={`${styles.mob__menu__cont}`}>
            <button
              className={styles.mob__menu__close__btn}
              type="button"
              onClick={toggleMenu}
            >
              <MobMenuCloseIcon />
            </button>
            <ul className={styles.mob__list}>
              <li>
                <Link
                  href="/"
                  className={styles.mob__link}
                  onClick={toggleMenu}
                >
                  Головна
                </Link>
              </li>
              <li>
                <div className={styles.mob__item__cont}>
                  <Link
                    href="/carp"
                    className={styles.mob__link}
                    onClick={toggleMenu}
                  >
                    Короп
                  </Link>
                  <button
                    className={styles.mob__inner__btn}
                    type="button"
                    onClick={() => toggleInnerMenu("carp")}
                  >
                    <MobInnerMenuIcon />
                  </button>
                </div>
                <ul
                  className={`${styles.mob__inner__list} ${
                    innerMenuStates.carp ? styles.active : ""
                  }`}
                >
                  {carpMenu.map(({ id, path, name }) => {
                    return (
                      <li ket={id} className={styles.mob__inner__item}>
                        <Link
                          href={path}
                          className={styles.mob__link}
                          onClick={toggleMenu}
                        >
                          {name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
              <li>
                <div className={styles.mob__item__cont}>
                  <Link
                    href="/feeder"
                    className={styles.mob__link}
                    onClick={toggleMenu}
                  >
                    Фідер
                  </Link>
                  <button
                    className={styles.mob__inner__btn}
                    type="button"
                    onClick={() => toggleInnerMenu("feeder")}
                  >
                    <MobInnerMenuIcon />
                  </button>
                </div>
                <ul
                  className={`${styles.mob__inner__list} ${
                    innerMenuStates.feeder ? styles.active : ""
                  }`}
                >
                  {feederMenu.map(({ id, path, name }) => {
                    return (
                      <li ket={id} className={styles.mob__inner__item}>
                        <Link
                          href={path}
                          className={styles.mob__link}
                          onClick={toggleMenu}
                        >
                          {name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
              <li>Поплавець</li>
              <li>Хижак</li>
              <li>З човна</li>
              <li>Море</li>
              <li>Норвегія</li>
              <li>Кемпінг</li>
              <li>Одяг</li>
            </ul>
          </div>
        </div>
      </>
    );
}