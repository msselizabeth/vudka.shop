import BuyButton from "../BuyButton/BuyButton";
import { Carousel } from "../Carousel/Carousel";
import styles from "./Reel.module.css";
import {
  calcMainPrice,
  calcSalePrice,
  calcAlwaysSalePrice,
} from "../../helpers/price-calc";

const Reel = ({ reel }) => {
  return (
    <>
      <h1
        className={`title ${styles.reel__title}`}
      >{`${reel.name} ${reel.brand} ${reel.series} ${reel.model}`}</h1>
      <div className={styles.reel__style__box}>
        <Carousel images={reel.img} alt={reel.alt} />
        <div>
          <div className={styles.price__container}>
            <div>
              <ul className={styles.prices__list}>
                <li>
                  <p
                    className={`${styles.reel__price} ${
                      process.env.NEXT_PUBLIC_SALE_MODE === "true" || reel.sale
                        ? styles.sale
                        : ""
                    }`}
                  >
                    {`Ціна: ${calcMainPrice(reel.price)} грн`}
                  </p>
                </li>
                {process.env.NEXT_PUBLIC_SALE_MODE === "true" && !reel.sale && (
                  <li>
                    <p
                      className={`${styles.reel__price} ${styles.reel__price__sale}`}
                    >{`Ціна: ${calcSalePrice(reel.price)} грн`}</p>
                  </li>
                )}
                {reel.sale && (
                  <li>
                    <p
                      className={`${styles.reel__price} ${styles.reel__price__sale}`}
                    >{`Ціна: ${calcAlwaysSalePrice(reel.salePriceMain)} грн`}</p>
                  </li>
                )}
              </ul>
              {reel.stock ? (
                <p className={styles.stock__text}>{`в наявності`}</p>
              ) : (
                <p className={styles.stock__text}>{`немає в наявності`}</p>
              )}
            </div>

            {reel.stock && (
              <BuyButton
                sale={reel.sale}
                productId={reel._id}
                productName={`${reel.name} ${reel.brand} ${reel.series} ${reel.model}`}
                productPrice={
                 reel.sale ? reel.salePriceMain : reel.price
                }
                productImg={reel.img[0]}
              />
            )}
          </div>

          <div className={styles.info__container}>
            <h2 className="title">Характеристики:</h2>
            <table className={styles.info__table}>
              <tbody>
                <tr>
                  <th className={styles.th}>Артикль:</th>
                  <td className={styles.td}>{reel.item}</td>
                </tr>

                {reel.spoolSize && (
                  <tr>
                    <th className={styles.th}>Розмір шпулі:</th>
                    <td className={styles.td}>{reel.spoolSize}</td>
                  </tr>
                )}

                <tr>
                  <th className={styles.th}>Жилкомісткість:</th>
                  <td className={styles.td}>{reel.lineCapacity}</td>
                </tr>

                <tr>
                  <th className={styles.th}>Намотування (оберт, см):</th>
                  <td className={styles.td}>{reel.lineRetrieve}</td>
                </tr>

                <tr>
                  <th className={styles.th}>Редукція:</th>
                  <td className={styles.td}>{reel.gearRatio}</td>
                </tr>
                <tr>
                  <th className={styles.th}>Тягове зусилля(кг):</th>
                  <td className={styles.td}>{reel.dragMax}</td>
                </tr>
                <tr>
                  <th className={styles.th}>Вага(г):</th>
                  <td className={styles.td}>{reel.weight}</td>
                </tr>
                <tr>
                  <th className={styles.th}>Фрікціон:</th>
                  <td className={styles.td}>{reel.dragSys}</td>
                </tr>
                {reel.brakeSys && (
                  <tr>
                    <th className={styles.th}>Гальма:</th>
                    <td className={styles.td}>{reel.brakeSys}</td>
                  </tr>
                )}
                <tr>
                  <th className={styles.th}>Ручка котушки:</th>
                  <td className={styles.td}>{reel.handle}</td>
                </tr>
                <tr>
                  <th className={styles.th}>Підшипники(шт):</th>
                  <td className={styles.td}>{reel.ballBearing}</td>
                </tr>
                <tr>
                  <th className={`${styles.th} ${styles.last}`}>
                    Країна походження:
                  </th>
                  <td className={`${styles.td} ${styles.last}`}>
                    {reel.country}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className={styles.description__container}>
        <h2 className="title">{`Опис котушки ${reel.brand} ${reel.series} ${reel.model}:`}</h2>
        <ul className={styles.description__list}>
          {reel.description.map((item, index) => (
            <li key={index}>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Reel;
