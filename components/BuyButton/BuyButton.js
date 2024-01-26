"use client"
import { useEffect, useState } from "react";
import styles from "./BuyButton.module.css";

const BuyButton = ({ productId, productName, productPrice, productImg }) => {
 
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
            <p>Товар успешно добавлен в корзину!</p>
            <button onClick={closeModal}>Продолжить покупки</button>
            <a href="/cart">Перейти в корзину</a>
          </div>
        </div>
      )}
    </div>
  );
};
export default BuyButton;