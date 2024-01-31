"use client"
import { useEffect, useRef, useState } from "react";
import { MobMenuIcon } from "../icons/MobMenuIcon";
import styles from "./MobileMenu.module.css"
import { MobMenuCloseIcon } from "../icons/MobMenuCloseIcon";
import { MobInnerMenuIcon } from "../icons/MobInnerMenuIcon";
import Link from "next/link";

import { rybalskiSnastiMenu } from "../../data/rybalski-snasti";
import { osnashchennyaMenu } from "../../data/osnashchennya";
import { prymankyPrykormkyMenu } from "../../data/prymanky-ta-prykormky";
import { HomeIcon } from "../icons/HomeIcon";
import { MailIcon } from "../icons/MailIcon";
import { PhoneIcon } from "../icons/PhoneIcon";
import { FacebookIcon } from "../icons/FacebookIcon";
import { InstaIcon } from "../icons/InstaIcon";


export const MobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  
  const [innerMenuStates, setInnerMenuStates] = useState({
    rybalskiSnasti: false,
    osnashchennya: false,
    prymankyPrykormky: false,
    camping: false,
    odyah: false,
    сhovnyDvyhuny: false,
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
            <Link
              href="/"
              className={styles.mob__home__link}
              onClick={toggleMenu}
            >
              <HomeIcon />
            </Link>
            <ul className={styles.mob__list}>
              <li>
                <div className={styles.mob__item__cont}>
                  <Link
                    href="/rybalski-snasti"
                    className={styles.mob__link}
                    onClick={toggleMenu}
                  >
                    Снасті
                  </Link>
                  <button
                    className={styles.mob__inner__btn}
                    type="button"
                    onClick={() => toggleInnerMenu("rybalskiSnasti")}
                  >
                    <MobInnerMenuIcon />
                  </button>
                </div>
                <ul
                  className={`${styles.mob__inner__list} ${
                    innerMenuStates.rybalskiSnasti ? styles.active : ""
                  }`}
                >
                  {rybalskiSnastiMenu.map(({ id, path, name }) => {
                    return (
                      <li key={id} className={styles.mob__inner__item}>
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
                    href="/osnashchennya"
                    className={styles.mob__link}
                    onClick={toggleMenu}
                  >
                    Оснащення
                  </Link>
                  <button
                    className={styles.mob__inner__btn}
                    type="button"
                    onClick={() => toggleInnerMenu("osnashchennya")}
                  >
                    <MobInnerMenuIcon />
                  </button>
                </div>
                <ul
                  className={`${styles.mob__inner__list} ${
                    innerMenuStates.osnashchennya ? styles.active : ""
                  }`}
                >
                  {osnashchennyaMenu.map(({ id, path, name }) => {
                    return (
                      <li key={id} className={styles.mob__inner__item}>
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
                    href="/prymanky-ta-prykormky"
                    className={styles.mob__link}
                    onClick={toggleMenu}
                  >
                    Приманки та прикормки
                  </Link>
                  <button
                    className={styles.mob__inner__btn}
                    type="button"
                    onClick={() => toggleInnerMenu("prymankyPrykormky")}
                  >
                    <MobInnerMenuIcon />
                  </button>
                </div>
                <ul
                  className={`${styles.mob__inner__list} ${
                    innerMenuStates.prymankyPrykormky ? styles.active : ""
                  }`}
                >
                  {prymankyPrykormkyMenu.map(({ id, path, name }) => {
                    return (
                      <li key={id} className={styles.mob__inner__item}>
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
                    href="/camping"
                    className={styles.mob__link}
                    onClick={toggleMenu}
                  >
                    Кемпінг
                  </Link>
                  <button
                    className={styles.mob__inner__btn}
                    type="button"
                    onClick={() => toggleInnerMenu("camping")}
                  >
                    <MobInnerMenuIcon />
                  </button>
                </div>
                {/* <ul
                  className={`${styles.mob__inner__list} ${
                    innerMenuStates.rybalskiSnasti ? styles.active : ""
                  }`}
                >
                  {rybalskiSnastiMenu.map(({ id, path, name }) => {
                    return (
                      <li key={id} className={styles.mob__inner__item}>
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
                </ul> */}
              </li>
              <li>
                <div className={styles.mob__item__cont}>
                  <Link
                    href="/odyah"
                    className={styles.mob__link}
                    onClick={toggleMenu}
                  >
                    Одяг
                  </Link>
                  <button
                    className={styles.mob__inner__btn}
                    type="button"
                    onClick={() => toggleInnerMenu("odyah")}
                  >
                    <MobInnerMenuIcon />
                  </button>
                </div>
                {/* <ul
                  className={`${styles.mob__inner__list} ${
                    innerMenuStates.rybalskiSnasti ? styles.active : ""
                  }`}
                >
                  {rybalskiSnastiMenu.map(({ id, path, name }) => {
                    return (
                      <li key={id} className={styles.mob__inner__item}>
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
                </ul> */}
              </li>
              <li>
                <div className={styles.mob__item__cont}>
                  <Link
                    href="/dvyhuny"
                    className={styles.mob__link}
                    onClick={toggleMenu}
                  >
                    Човни та двигуни
                  </Link>
                  <button
                    className={styles.mob__inner__btn}
                    type="button"
                    onClick={() => toggleInnerMenu("сhovnyDvyhuny")}
                  >
                    <MobInnerMenuIcon />
                  </button>
                </div>
                {/* <ul
                  className={`${styles.mob__inner__list} ${
                    innerMenuStates.rybalskiSnasti ? styles.active : ""
                  }`}
                >
                  {rybalskiSnastiMenu.map(({ id, path, name }) => {
                    return (
                      <li key={id} className={styles.mob__inner__item}>
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
                </ul> */}
              </li>
            </ul>
            <div className={styles.contacts__container}>
              <p className={styles.contacts__text}>Контакти:</p>
              <ul className={styles.contacts__list}>
                <li>
                  <Link
                    href={"tel:+380505545869"}
                    className={styles.contacts__link}
                  >
                    <PhoneIcon /> +38(050)554-58-69
                  </Link>
                </li>
                <li>
                  <Link
                    href={"mailto:vudkashop@gmail.com"}
                    className={styles.contacts__link}
                  >
                    <MailIcon /> vudkashop@gmail.com
                  </Link>
                </li>
              </ul>
            </div>

            <div className={styles.social__container}>
              <p className={styles.social__text}>Соціальні мережі:</p>
              <ul className={styles.social__list}>
                <li>
                  <Link
                    href={
                      "https://www.instagram.com/supmarket_rybalka?igsh=ZDE1MWVjZGVmZQ=="
                    }
                    className={styles.social__link}
                  >
                    <InstaIcon />
                  </Link>
                </li>
                <li>
                  <Link
                    href={"https://www.facebook.com/supmarketrybalka"}
                    className={styles.social__link}
                  >
                    <FacebookIcon />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    );
}