import {
  calcMainPrice,
  calcSalePrice,
  calcAlwaysSalePrice,
} from "../../helpers/price-calc";
import BuyButton from "../BuyButton/BuyButton";
import { Carousel } from "../Carousel/Carousel";
import styles from "./Rod.module.css";

const Rod = ({ rod }) => {
  return (
    <>
      <h1 className={`title ${styles.rod__title}`}>
        {`${rod.name} ${rod.brand} ${rod.series} ${rod.model} ${rod.rodSize} ${
          rod.testMin && `${rod.testMin}-${rod.testMax}г`
        } `}
      </h1>
      <div className={styles.rod__style__box}>
        <Carousel images={rod.img} alt={rod.alt} />
        <div>
          <div className={styles.price__container}>
            <div>
              <ul className={styles.prices__list}>
                <li>
                  <p
                    className={`${styles.rod__price} ${
                      process.env.NEXT_PUBLIC_SALE_MODE === "true" || rod.sale
                        ? styles.sale
                        : ""
                    }`}
                  >
                    {`Ціна: ${calcMainPrice(rod.price)} грн`}
                  </p>
                </li>
                {process.env.NEXT_PUBLIC_SALE_MODE === "true" && !rod.sale && (
                  <li>
                    <p
                      className={`${styles.rod__price} ${styles.rod__price__sale}`}
                    >{`Ціна: ${calcSalePrice(rod.price)} грн`}</p>
                  </li>
                )}
                {rod.sale && (
                  <li>
                    <p
                      className={`${styles.rod__price} ${styles.rod__price__sale}`}
                    >{`Ціна: ${calcAlwaysSalePrice(rod.salePriceMain)} грн`}</p>
                  </li>
                )}
              </ul>
              {rod.stock ? (
                <p className={styles.stock__text}>{`в наявності`}</p>
              ) : (
                <p className={styles.stock__text}>{`немає в наявності`}</p>
              )}
            </div>

            {rod.stock && (
              <BuyButton
                sale={rod.sale}
                productId={rod._id}
                productName={`${rod.name} ${rod.brand} ${rod.series} ${
                  rod.model
                } ${rod.rodSize}см ${
                  rod.testMin && `${rod.testMin}-${rod.testMax}г`
                }`}
                productPrice={rod.sale ? rod.salePriceMain : rod.price}
                productImg={rod.img[0]}
              />
            )}
          </div>

          <div className={styles.info__container}>
            <h2 className="title">Характеристики:</h2>
            <table className={styles.info__table}>
              <tbody>
                <tr>
                  <th className={styles.th}>Артикль:</th>
                  <td className={styles.td}>{rod.item}</td>
                </tr>
                {rod.testMin && (
                  <tr>
                    <th className={styles.th}>Тест MIN(г):</th>
                    <td className={styles.td}>{rod.testMin}</td>
                  </tr>
                )}
                {rod.testMax && (
                  <tr>
                    <th className={styles.th}>Тест MAX(г):</th>
                    <td className={styles.td}>{rod.testMax}</td>
                  </tr>
                )}
                {rod.testLb && (
                  <tr>
                    <th className={styles.th}>Тест(lb):</th>
                    <td className={styles.td}>{rod.testLb}</td>
                  </tr>
                )}
                <tr>
                  <th className={styles.th}>Довжина вудилища(см):</th>
                  <td className={styles.td}>{rod.rodSize}</td>
                </tr>
                <tr>
                  <th className={styles.th}>Довжина транспортування(cм):</th>
                  <td className={styles.td}>{rod.transSize}</td>
                </tr>
                <tr>
                  <th className={styles.th}>Вага(г):</th>
                  <td className={styles.td}>{rod.weight}</td>
                </tr>
                {rod.action && (
                  <tr>
                    <th className={styles.th}>Дія бланку:</th>
                    <td className={styles.td}>{rod.action}</td>
                  </tr>
                )}
                {rod.rodClass && (
                  <tr>
                    <th className={styles.th}>Клас вудилища:</th>
                    <td className={styles.td}>{rod.rodClass}</td>
                  </tr>
                )}
                <tr>
                  <th className={styles.th}>Конструкція:</th>
                  <td className={styles.td}>{rod.design}</td>
                </tr>
                <tr>
                  <th className={styles.th}>Кількість секцій(шт):</th>
                  <td className={styles.td}>{rod.section}</td>
                </tr>
                <tr>
                  <th className={styles.th}>Тип кілець:</th>
                  <td className={styles.td}>{rod.guideType}</td>
                </tr>
                <tr>
                  <th className={`${styles.th} ${styles.last}`}>
                    Країна походження:
                  </th>
                  <td className={`${styles.td} ${styles.last}`}>
                    {rod.country}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className={styles.description__container}>
        <h2 className="title">{`Опис вудилища ${rod.brand} ${rod.series} ${rod.model}:`}</h2>
        <ul className={styles.description__list}>
          {rod.description.map((item, index) => (
            <li key={index}>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Rod;
