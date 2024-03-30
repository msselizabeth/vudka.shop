"use client";

import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "./Cart.module.css";
import Link from "next/link";
import {
  calcMainPrice,
  calcSalePrice,
  calcAlwaysSalePrice,
} from "../../helpers/price-calc";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    region: "",
    locality: "",
    postOffice: "",
    comment: "",
  });
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);
  const [isConfirmed, setIsСonfirmed] =
    useState(false);
  const [dataProcessingError, setDataProcessingError] = useState("");

  const handleConfirmation = () => {
    setIsСonfirmed(!isConfirmed);
    setDataProcessingError(""); 
  };

  useEffect(() => {
    const currentCart = JSON.parse(localStorage.getItem("cart")) || {};
    const itemsArray = Object.keys(currentCart).map((productId) => ({
      productId,
      ...currentCart[productId],
    }));

    setCartItems(itemsArray);
  }, []);

  const removeFromCart = (productId) => {
    // Получение текущего состояния корзины из localStorage
    const currentCart = JSON.parse(localStorage.getItem("cart")) || {};

    // Удаление товара по productId
    delete currentCart[productId];

    // Обновление состояния корзины в localStorage
    localStorage.setItem("cart", JSON.stringify(currentCart));

    // Обновление состояния компонента для перерендеринга
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.productId !== productId)
    );
  };

  const updateQuantity = (productId, newQuantity) => {
    // Получение текущего состояния корзины из localStorage
    const currentCart = JSON.parse(localStorage.getItem("cart")) || {};

    // Обновление количества товара по productId
    currentCart[productId].quantity = newQuantity;

    // Обновление состояния корзины в localStorage
    localStorage.setItem("cart", JSON.stringify(currentCart));

    // Обновление состояния компонента для перерендеринга
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegExp =
      /^(?:\+38)?(?:\(\d{3}\)|\d{3})(?:[ -]?)\d{2,3}(?:[ -]?)\d{2}(?:[ -]?)\d{2}$/;
    return phoneRegExp.test(phoneNumber);
  };

  const validateEmail = (email) => {
    const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegExp.test(email);
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!isConfirmed) {
      setDataProcessingError("Підтвердіть обробку персональних даних!");
      return;
    }

    const isValidPhone = validatePhoneNumber(formData.phoneNumber);
    const isValidEmail = validateEmail(formData.email);

    setIsValidPhone(isValidPhone);
    setIsValidEmail(isValidEmail);

    if (isValidPhone && isValidEmail) {

      const orderData = {
        products: cartItems.map((item) => ({
          _id: item.productId,
          prodName: item.productName,
          quantity: item.quantity,
          prodPrice: item.productPrice,
        })),
        orderSum: calculateTotal(),
        destination: {
          clientName: formData.firstName,
          clientSurname: formData.lastName,
          clientPhone: formData.phoneNumber,
          clientEmail: formData.email,
          oblast: formData.region,
          city: formData.locality,
          numberOfPost: formData.postOffice,
          comment: formData.comment,
        },
      };

      try {
        // Отправка POST-запроса на сервер
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/cart/addOrder`,
          orderData
        );

        // Очистка формы после успешной отправки заказа
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          region: "",
          locality: "",
          postOffice: "",
          comment: "",
        });

        localStorage.removeItem("cart");
        setCartItems([]);
        setIsOrderSuccess(true);
      } catch (error) {
        console.error("Помилка при відправленні:", error);
      }
    }
  };

  const handleCloseModal = () => {
    setIsOrderSuccess(false);
  };

  function calculateTotal() {
    return cartItems
      .reduce(
        (total, item) =>
          total + currentPrice(item.productPrice, item.sale) * item.quantity,
        0
      )
      .toFixed(2);
  }

  function currentPrice(price, sale) {
    let currentPrice;
    if (sale) {
     return currentPrice = calcAlwaysSalePrice(price).toFixed(2);
    }
    if (process.env.NEXT_PUBLIC_SALE_MODE === "true" && !sale) {
      return currentPrice = calcSalePrice(price).toFixed(2);
    }
    
    return (currentPrice = calcMainPrice(price).toFixed(2));

  }

  return (
    <div>
      <h1 className="title">Кошик замовлення</h1>
      {cartItems.length === 0 ? (
        <p style={{ textAlign: "center" }}>Ви ще не обрали жодного товару.</p>
      ) : (
        <div>
          <ul className={styles.cart__products__list}>
            {cartItems.map((item) => (
              <li key={item.productId} className={styles.cart__products__item}>
                <Image
                  src={item.productImg}
                  alt={item.productName}
                  width={60}
                  height={60}
                  className={styles.cart__products__img}
                />
                <div className={styles.cart__products__info__box}>
                  <p className={styles.cart__products__productName}>
                    {item.productName}
                  </p>
                  <p>Ціна за 1шт. - {currentPrice(item.productPrice, item.sale)}грн.</p>
                  <p className={styles.cart__products__qnt}>
                    Кількість:
                    <button
                      className={styles.cart__products__qnt__btn}
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className={styles.cart__products__qnt__input}
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(
                          item.productId,
                          parseInt(e.target.value, 10)
                        )
                      }
                    />
                    <button
                      className={styles.cart__products__qnt__btn}
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </p>
                  <p className={styles.cart__products__totalProdPrice}>
                    Всього:{" "}
                    {(currentPrice(item.productPrice, item.sale) * item.quantity).toFixed(
                      2
                    )}{" "}
                    грн.
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className={styles.cart__products__delete__btn}
                    >
                      Видалити
                    </button>
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <p className={styles.cart__products__totalPrice}>
            Загальна сума замовлення: {calculateTotal()} грн.
          </p>

          <form onSubmit={handleSubmitOrder} className={styles.cart__form}>
            <h3>Оформлення замовлення:</h3>
            <label className={styles.cart__label}>
              Введіть імʼя:
              <input
                type="text"
                name="firstName"
                placeholder="Ваше імʼя для доставки"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </label>

            <label className={styles.cart__label}>
              Введіть призвіще:
              <input
                type="text"
                name="lastName"
                placeholder="Ваше призвіще для доставки"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </label>

            <label className={styles.cart__label}>
              Електронна пошта(сповіщення замовлення):
              <input
                type="email"
                name="email"
                placeholder="Ваше справжня пошта"
                value={formData.email}
                onChange={handleInputChange}
                required
                className={!isValidEmail ? "invalid" : ""}
              />
              {!isValidEmail && (
                <p className={styles.errorMessage}>
                  Введіть коректну адресу електронної пошти!
                </p>
              )}
            </label>

            <label className={styles.cart__label}>
              Номер телефону(для доставки):
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Почніть з +380 або 099"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
                className={!isValidPhone ? "invalid" : ""}
              />
              {!isValidPhone && (
                <p className={styles.errorMessage}>
                  Введіть коректний номер телефону (наприклад, +380501234567)
                </p>
              )}
            </label>

            <label className={styles.cart__label}>
              Область доставки:
              <select
                name="region"
                value={formData.region}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Виберіть область
                </option>
                <option value="Вінницька">Вінницька область</option>
                <option value="Волинська">Волинська область</option>
                <option value="Дніпропетровська">
                  Дніпропетровська область
                </option>
                <option value="Донецька">Донецька область</option>
                <option value="Житомирська">Житомирська область</option>
                <option value="Закарпатська">Закарпатська область</option>
                <option value="Запорізька">Запорізька область</option>
                <option value="Івано-Франківська">
                  Івано-Франківська область
                </option>
                <option value="Київська">Київська область</option>
                <option value="Кіровоградська">Кіровоградська область</option>
                <option value="Луганська">Луганська область</option>
                <option value="Львівська">Львівська область</option>
                <option value="Миколаївська">Миколаївська область</option>
                <option value="Одеська">Одеська область</option>
                <option value="Полтавська">Полтавська область</option>
                <option value="Рівненська">Рівненська область</option>
                <option value="Сумська">Сумська область</option>
                <option value="Тернопільська">Тернопільська область</option>
                <option value="Харківська">Харківська область</option>
                <option value="Херсонська">Херсонська область</option>
                <option value="Хмельницька">Хмельницька область</option>
                <option value="Черкаська">Черкаська область</option>
                <option value="Чернівецька">Чернівецька область</option>
                <option value="Чернігівська">Чернігівська область</option>
              </select>
            </label>

            <label className={styles.cart__label}>
              Населений пункт доставки:
              <input
                type="text"
                name="locality"
                placeholder="Назва вашого населеного пункту"
                value={formData.locality}
                onChange={handleInputChange}
                required
              />
            </label>

            <label className={styles.cart__label}>
              Відділення "Нової пошти":
              <input
                type="text"
                name="postOffice"
                placeholder={` Номер ввіділення \"Нової пошти\" `}
                value={formData.postOffice}
                onChange={handleInputChange}
                required
              />
            </label>

            <label className={styles.cart__label}>
              Коментар(за бажанням):
              <textarea
                name="comment"
                placeholder="Введіть текст тут..."
                value={formData.comment}
                onChange={handleInputChange}
              />
            </label>

            <label className={styles.cart__label__confirm}>
              <input
                type="checkbox"
                checked={isConfirmed}
                onChange={handleConfirmation}
              />
              <p>
                Підтверджую обробку персональних даних та
                <Link href="/" className={styles.confirm__link}>
                  умови користування
                </Link>
                .
              </p>
            </label>
            {dataProcessingError && (
              <p className={styles.errorMessage}>{dataProcessingError}</p>
            )}

            <div className={styles.cart__form___submit__container}>
              <button type="submit" className={styles.cart__form___submit__btn}>
                Відправити замовлення
              </button>
            </div>
          </form>
        </div>
      )}
      {isOrderSuccess && (
        <div className={styles.modal}>
          <div className={styles.modal__content}>
            <p>Ваше замовлення успішно відправлено!</p>
            <button onClick={handleCloseModal}>Закрити</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
