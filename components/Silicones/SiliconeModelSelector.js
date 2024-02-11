"use client";
import React, { useState } from "react";
import styles from "./SiliconeModelSelector.module.css";
import BuyButton from "../BuyButton/BuyButton";
import Image from "next/image";
import {
  calcMainPrice,
  calcSalePrice,
  calcAlwaysSalePrice,
} from "../../helpers/price-calc";

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
                    width={700}
                    height={700}
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
            width={700}
            height={700}
            priority={true}
            className={styles.selector__img}
          />
          <div className={styles.select__info__container}>
            <h3 className={styles.select__info__title}>
              Обрана модель: {selectedModel.color}
            </h3>

            <div className={styles.price__block}>
              <div>
                <ul className={styles.price__container}>
                  <li>
                    <p
                      className={`${styles.silicones__price} ${
                        process.env.NEXT_PUBLIC_SALE_MODE === "true" ||
                        silicone.sale
                          ? styles.sale
                          : ""
                      }`}
                    >
                      Ціна: {calcMainPrice(silicone.price)} грн
                    </p>
                  </li>
                  {process.env.NEXT_PUBLIC_SALE_MODE === "true" &&
                    !silicone.sale && (
                      <li>
                        <p
                          className={`${styles.silicones__price} ${styles.silicones__price__sale}`}
                        >
                          Ціна: {calcSalePrice(silicone.price)}
                          грн
                        </p>
                      </li>
                    )}
                  {silicone.sale && (
                    <li>
                      <p
                        className={`${styles.silicones__price} ${styles.silicones__price__sale}`}
                      >
                        Ціна: {calcAlwaysSalePrice(silicone.salePriceMain)}
                        грн
                      </p>
                    </li>
                  )}
                </ul>
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
                  sale={silicone.sale}
                  productId={selectedModel._id}
                  productName={`${silicone.name} ${silicone.brand} ${silicone.series} ${silicone.model}" ${selectedModel.color}`}
                  productPrice={silicone.sale ? silicone.salePriceMain : silicone.price}
                  productImg={selectedModel.img}
                />
              )}
            </div>

            <div className={styles.info__container}>
              <h4 className={`title`}>Характеристики:</h4>
              <table className={styles.info__table}>
                <tbody>
                  <tr>
                    <th className={styles.th}>Артикль:</th>
                    <td className={styles.td}>{selectedModel.item}</td>
                  </tr>
                  <tr>
                    <th className={styles.th}>Колір:</th>
                    <td className={styles.td}>{selectedModel.color}</td>
                  </tr>
                  <tr>
                    <th className={styles.th}>Розмір(дюйм):</th>
                    <td className={styles.td}>{silicone.model}</td>
                  </tr>
                  <tr>
                    <th className={styles.th}>Розмір(мм):</th>
                    <td className={styles.td}>{silicone.size}</td>
                  </tr>

                  <tr>
                    <th className={`${styles.th} ${styles.last}`}>Вага(г):</th>
                    <td className={`${styles.td} ${styles.last}`}>
                      {silicone.weight}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SiliconeModelSelector;
