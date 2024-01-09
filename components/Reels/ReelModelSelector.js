"use client";
import React, { useState } from "react";
import styles from "./ReelModelSelector.module.css";
import { BuyButton } from "../BuyButton/BuyButton";

export const ReelModelSelector = ({ models }) => {
  const [selectedModel, setSelectedModel] = useState(models[0]);

  const handleModelChange = (model) => {
    setSelectedModel(model);
  };

  return (
    <div>
      <ul className={styles.select__btns__list}>
        {models.map((model, index) => (
          <li key={index}>
            <button
              onClick={() => handleModelChange(model)}
              className={styles.reel__selector__btn}
              style={{
                background:
                  selectedModel.modSize === model.modSize
                    ? "#F6F3BD"
                    : "#136773",
                color:
                  selectedModel.modSize === model.modSize
                    ? "#F79400"
                    : "#F6F3BD",
                border:
                  selectedModel.modSize === model.modSize
                    ? "1px solid #F79400"
                    : "2px solid #136773",
              }}
            >
              {model.modSize}
            </button>
          </li>
        ))}
      </ul>

      <div className={styles.select__info__container}>
        <h3 className={styles.select__info__title}>
          Обрана модель: {selectedModel.modSize}
        </h3>

        <div className={styles.price__block}>
          <div>
            <div className={styles.price__container}>
              <h3 className={styles.select__price__title}>Ціна: </h3>
              <p className={styles.select__price__value}>
                {selectedModel.price * process.env.exchange} грн
              </p>
            </div>
            {selectedModel.stock ? (
              <p className={styles.select__stock__text}>в наявності</p>
            ) : (
              <p className={styles.select__stock__text}>немає в наявності</p>
            )}
          </div>
          {selectedModel.stock && <BuyButton />}
        </div>

        <h4 className={styles.select__info__title}>Характеристики:</h4>
        <ul className={styles.select__info__list}>
          <li className={styles.select__info__item}>
            <h4>Артикул:</h4>
            <p>{selectedModel.item}</p>
          </li>
          <li className={styles.select__info__item}>
            <h4>Тягове зусилля:</h4>
            <p>{selectedModel.dragMax}</p>
          </li>
          <li className={styles.select__info__item}>
            <h4>Розмір шпулі:</h4>
            <p>{selectedModel.spoolSize}</p>
          </li>
          <li className={styles.select__info__item}>
            <h4>Жилкомісткість: </h4>
            <p>{selectedModel.lineCapacity}</p>
          </li>
          <li className={styles.select__info__item}>
            <h4>Намотування(оберт): </h4>
            <p>{selectedModel.lineRetrieve}</p>
          </li>
          <li className={styles.select__info__item}>
            <h4>Редукція: </h4>
            <p>{selectedModel.gearRatio}</p>
          </li>
        </ul>
      </div>
    </div>
  );
};


