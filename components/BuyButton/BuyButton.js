"use client"
import { useState } from "react";
import styles from "./BuyButton.module.css";

const BuyButton = ({ productId, productName, productPrice, productImg , sale}) => {
 
  const [quantity, setQuantity] = useState(1);
  const [isModalVisible, setModalVisible] = useState(false);

     const handleBuyClick = () => {
       // Получение текущего состояния корзины из localStorage
       const currentCart = JSON.parse(localStorage.getItem("cart")) || {};

       // Проверка наличия товара в корзине
       if (currentCart[productId]) {
         // Если товар уже есть в корзине, увеличиваем количество
         currentCart[productId].quantity += quantity;
       } else {
         // Если товара нет в корзине, добавляем новый элемент
         currentCart[productId] = {
           sale,
           productImg,
           productName,
           productPrice,
           quantity,
         };
       }

       // Обновление состояния корзины в localStorage
       localStorage.setItem("cart", JSON.stringify(currentCart));

       // Сброс количества после добавления в корзину
       setQuantity(1);
       setModalVisible(true);
       
     };
      const closeModal = () => {
    // Закрываем модальное окно
    setModalVisible(false);
      };
  


  return (
    <div>
      <button className={styles.buy__btn} onClick={handleBuyClick}>
        Купити
      </button>
      {isModalVisible && (
        <div className={styles.modal__overlay}>
          <div className={styles.modal}>
            <p className={styles.modal__title}>Товар успішно додано до кошика!</p>
            <div className={styles.modal__buttons}>
              <button onClick={closeModal} type="button" className={`${styles.modal__btn} ${styles.modal__btn__back}`}>Продовжити покупки</button>
              <a href="/cart" className={`${styles.modal__btn} ${styles.modal__btn__cart}`}>Перейти до кошика</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default BuyButton;