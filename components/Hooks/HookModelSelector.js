"use client";
import Image from "next/image";
import BuyButton from "../BuyButton/BuyButton";
import styles from "./HookModelSelector.module.css";
import { useState } from "react";
import {
  calcMainPrice,
  calcSalePrice,
  calcAlwaysSalePrice,
} from "../../helpers/price-calc";

const HookModelSelector = ({ models, hook }) => {
  const [selectedModel, setSelectedModel] = useState(models[0]);

  const handleModelChange = (model) => {
    setSelectedModel(model);
  };
  return (
    <>
      <div className={styles.selector__container}>
        <div>
          <ul className={`${styles.select__btns__list}`}>
            {models.map((model, index) => (
              <li key={model._id} className={styles.selector__item}>
                <button
                  onClick={() => handleModelChange(model)}
                  className={styles.hook__selector__btn}
                  style={{
                    background:
                      selectedModel.number === model.number
                        ? "#F6F3BD"
                        : "#136773",
                    color:
                      selectedModel.number === model.number
                        ? "#F79400"
                        : "#F6F3BD",
                    border:
                      selectedModel.number === model.number
                        ? "1px solid #F79400"
                        : "2px solid #136773",
                  }}
                >
                  {model.number}
                </button>
              </li>
            ))}
          </ul>
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
                  <td className={styles.td}>{hook.color}</td>
                </tr>
                <tr>
                  <th className={styles.th}>Розмір:</th>
                  <td className={styles.td}>{selectedModel.number}</td>
                </tr>
                <tr>
                  <th className={styles.th}>Кількість в упаковці:</th>
                  <td className={styles.td}>{selectedModel.amount}</td>
                </tr>

                <tr>
                  <th className={`${styles.th} ${styles.last}`}>Країна:</th>
                  <td className={`${styles.td} ${styles.last}`}>
                    {hook.country}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <Image
            src={hook.imgMain}
            alt={hook.alt}
            width={700}
            height={700}
            priority={true}
            className={styles.selector__img}
          />
          <div className={styles.select__info__container}>
            <h3 className={styles.select__info__title}>
              Обрана модель: {selectedModel.number}
            </h3>

            <div className={styles.price__block}>
              <div>
                <ul className={styles.price__container}>
                  <li>
                    <p
                      className={`${styles.hook__price} ${
                        process.env.NEXT_PUBLIC_SALE_MODE === "true" ||
                        hook.sale
                          ? styles.sale
                          : ""
                      }`}
                    >
                      Ціна: {calcMainPrice(selectedModel.price)} грн
                    </p>
                  </li>
                  {process.env.NEXT_PUBLIC_SALE_MODE === "true" &&
                    !hook.sale && (
                      <li>
                        <p
                          className={`${styles.hook__price} ${styles.hook__price__sale}`}
                        >
                          Ціна: {calcSalePrice(selectedModel.price)}
                          грн
                        </p>
                      </li>
                    )}
                  {hook.sale && (
                    <li>
                      <p
                        className={`${styles.hook__price} ${styles.hook__price__sale}`}
                      >{`Ціна: ${calcAlwaysSalePrice(
                        selectedModel.salePrice
                      )} грн`}</p>
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
                  sale={hook.sale}
                  productId={selectedModel._id}
                  productName={`${hook.name} ${hook.brand} ${hook.series} ${selectedModel.number}`}
                  productPrice={
                    hook.sale ? selectedModel.salePrice : selectedModel.price
                  }
                  productImg={hook.imgMain}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HookModelSelector;
