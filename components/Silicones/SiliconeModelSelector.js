"use client";
import React, { useState } from "react";
import styles from "./SiliconeModelSelector.module.css";
import BuyButton from "../BuyButton/BuyButton";
import Image from "next/image";
import { calcMainPrice, calcSalePrice } from "../../helpers/price-calc";



const SiliconeModelSelector = ({ models, silicone }) => {
  const [selectedModel, setSelectedModel] = useState(models[0]);

  const [isListOpen, setIsListOpen] = useState(false);

  const handleToggleList = () => {
    setIsListOpen(!isListOpen);
  };
  const shouldShowButton = models.length > 15; 

  const handleModelChange = (model) => {
    setSelectedModel(model);
  };

  return (
    <>
      <div className={styles.selector__container}>
        <div>
          <ul
            className={`${styles.select__btns__list} ${
              isListOpen ? styles.opened : styles.closed
            }`}
          >
            {models.map((model, index) => (
              <li key={index} className={styles.selector__item}>
                <button
                  onClick={() => handleModelChange(model)}
                  className={styles.silicone__selector__btn}
                  style={{
                    background:
                      selectedModel.colorNumber === model.colorNumber
                        ? "#F6F3BD"
                        : "#136773",
                    color:
                      selectedModel.colorNumber === model.colorNumber
                        ? "#F79400"
                        : "#F6F3BD",
                    border:
                      selectedModel.colorNumber === model.colorNumber
                        ? "1px solid #F79400"
                        : "2px solid #136773",
                  }}
                >
                  <Image
                    src={model.img}
                    alt={silicone.alt}
                    width={30}
                    height={30}
                    className={styles.selector__inner__img}
                  />
                  {model.colorNumber}
                </button>
              </li>
            ))}
          </ul>
          {shouldShowButton && (
            <div className={styles.toggle__btn__container}>
              <button
                onClick={handleToggleList}
                type="button"
                className={styles.toggle__btn}
              >
                {isListOpen ? "Менше" : "Більше"}
              </button>
            </div>
          )}
        </div>
        <div>
          <Image
            src={selectedModel.img}
            alt={silicone.alt}
            width={300}
            height={300}
            priority={true}
            className={styles.selector__img}
          />
          <div className={styles.select__info__container}>
            <h3 className={styles.select__info__title}>
              Обрана модель: {selectedModel.color}
            </h3>

            <div className={styles.price__block}>
              <div>
                <div className={styles.price__container}>
                  <p
                    className={`${styles.silicones__price} ${
                      process.env.NEXT_PUBLIC_SALE_MODE === "true"
                        ? styles.sale
                        : ""
                    }`}
                  >
                    Ціна:{" "}
                    {calcMainPrice(silicone.price)}{" "}
                    грн
                  </p>
                  {process.env.NEXT_PUBLIC_SALE_MODE === "true" && (
                    <p
                      className={`${styles.silicones__price} ${styles.silicones__price__sale}`}
                    >
                      Ціна:{" "}
                      {calcSalePrice(silicone.price)}
                      грн
                    </p>
                  )}
                </div>
                {selectedModel.stock ? (
                  <p className={styles.select__stock__text}>в наявності</p>
                ) : (
                  <p className={styles.select__stock__text}>
                    немає в наявності
                  </p>
                )}
              </div>

              {selectedModel.stock && (
                <BuyButton
                  productId={selectedModel._id}
                  productName={`${silicone.name} ${silicone.brand} ${silicone.series} ${silicone.model}" ${selectedModel.color}`}
                  productPrice={
                    process.env.NEXT_PUBLIC_SALE_MODE === "true"
                      ? calcSalePrice(silicone.price) 
                      : calcMainPrice(silicone.price) 
                  }
                  productImg={selectedModel.img}
                />
              )}
            </div>

            <h4 className={styles.select__info__title}>Характеристики:</h4>
            <ul className={styles.select__info__list}>
              <li className={styles.select__info__item}>
                <h4>Артикул:</h4>
                <p>{selectedModel.item}</p>
              </li>
              <li className={styles.select__info__item}>
                <h4>Колір: </h4>
                <p>{selectedModel.color}</p>
              </li>
              <li className={styles.select__info__item}>
                <h4>Розмір(дюйм):</h4>
                <p>{silicone.model}</p>
              </li>
              <li className={styles.select__info__item}>
                <h4>Розмір(мм):</h4>
                <p>{silicone.size}</p>
              </li>
              <li className={styles.select__info__item}>
                <h4>Вага(г):</h4>
                <p>{silicone.weight}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SiliconeModelSelector;
