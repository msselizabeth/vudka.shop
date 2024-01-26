"use client"

import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "./Cart.module.css";

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

  useEffect(() => {
    // Получение текущего состояния корзины из localStorage
    const currentCart = JSON.parse(localStorage.getItem("cart")) || {};

    // Преобразование объекта корзины в массив для удобства отображения
    const itemsArray = Object.keys(currentCart).map((productId) => ({
      productId,
      ...currentCart[productId],
    }));

    setCartItems(itemsArray);
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.productPrice * item.quantity,
      0
    );
  };

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
    // Регулярное выражение для валидации номера телефона
    const phoneRegExp =
      /^(?:\+38)?(?:\(\d{3}\)|\d{3})(?:[ -]?)\d{2,3}(?:[ -]?)\d{2}(?:[ -]?)\d{2}$/;
    return phoneRegExp.test(phoneNumber);
  };

  const validateEmail = (email) => {
    // Регулярное выражение для валидации email
    const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegExp.test(email);
  };

   const handleSubmitOrder = async (e) => {
     e.preventDefault();

     // Валидация номера телефона и почтового адреса
     const isValidPhone = validatePhoneNumber(formData.phoneNumber);
     const isValidEmail = validateEmail(formData.email);

     setIsValidPhone(isValidPhone);
     setIsValidEmail(isValidEmail);

     // Если данные валидны, можно отправить заказ на сервер
     if (isValidPhone && isValidEmail) {
       // Подготовка данных заказа для отправки
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
         console.log("Ответ от сервера:", response.data);

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
         console.error("Ошибка при отправке заказа:", error);
         // Обработка ошибок отправки заказа
       }
     }
   };
  
  const handleCloseModal = () => {
    // Закриваємо вспливаюче вікно
    setIsOrderSuccess(false);
  };

  return (
    <div>
      <h1 className="title">Корзина замовлення</h1>
      {cartItems.length === 0 ? (
        <p style={{ textAlign: "center" }}>Ви ще не обрали жодного товару.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.productId}>
                <Image
                  src={item.productImg}
                  alt={item.productName}
                  width={100}
                  height={100}
                />
                <p>
                  {item.productName} - {item.productPrice} грн. за 1 шт.
                  Кількість:
                  <button
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(
                        item.productId,
                        parseInt(e.target.value, 10)
                      )
                    }
                  />
                  <button
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                  <br />
                  Всього: {item.productPrice * item.quantity} грн.
                  <button onClick={() => removeFromCart(item.productId)}>
                    Видалити із замовленння
                  </button>
                </p>
              </li>
            ))}
          </ul>
          <p>Загальна сума замовлення: {calculateTotal()} грн.</p>

          <form onSubmit={handleSubmitOrder}>
            <h3>Оформлення замовлення:</h3>
            <label>
              Введіть імʼя:
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
            <label>
              Введіть призвіще:
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
            <label>
              Електронна пошта:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className={!isValidEmail ? "invalid" : ""}
              />
              {!isValidEmail && (
                <p className="error-message">
                  Введіть коректну адресу електронної пошти!
                </p>
              )}
            </label>
            <br />
            <label>
              Номер телефону:
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
                className={!isValidPhone ? "invalid" : ""}
              />
              {!isValidPhone && (
                <p className="error-message">
                  Введіть коректний номер телефону (наприклад, +380501234567)
                </p>
              )}
            </label>
            <br />
            <label>
              Область:
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
            <br />
            <label>
              Населений пункт:
              <input
                type="text"
                name="locality"
                value={formData.locality}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
            <label>
              Відділення "Нової пошти":
              <input
                type="text"
                name="postOffice"
                value={formData.postOffice}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
            <label>
              Коментар(за бажанням):
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <button type="submit">Відправити замовлення</button>
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
