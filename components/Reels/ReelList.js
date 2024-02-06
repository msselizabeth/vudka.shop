"use client";
import { useState, useEffect } from "react";
import MobileFiltersContainer from "../Filters/MobileFiltersContainer";
import Filters from "../Filters/Filters";
import ButtonMore from "../ButtonMore/ButtonMore";
import Link from "next/link";
import Image from "next/image";
import styles from "./ReelList.module.css";
import BuyButton from "../BuyButton/BuyButton";
import { calcMainPrice, calcSalePrice } from "../../helpers/price-calc";

const ReelsList = ({ reels }) => {
  const [allReels, setAllReels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    typereel: [],
    brand: [],
    series: [],
    spoolSize: [],
    dragMax: [],
    dragSys: [],
    ballBearing: [],
  });
  const [typereelFilters, setTypereelFilters] = useState([]);
  const [brandsFilters, setBrandsFilters] = useState([]);
  const [seriesFilters, setSeriesFilters] = useState([]);
  const [spoolSizeFilters, setSpoolSizeFilters] = useState([]);
  const [dragMaxFilters, setDragMaxFilters] = useState([]);
  const [dragSysFilters, setDragSysFilters] = useState([]);
  const [ballBearingFilters, setBallBearingFilters] = useState([]);

  useEffect(() => {
    const uniqueTypereels = [
      ...new Set(
        reels.map((reel) => reel.typereel).sort((a, b) => a.localeCompare(b))
      ),
    ];
    const uniqueBrands = [
      ...new Set(
        reels.map((reel) => reel.brand).sort((a, b) => a.localeCompare(b))
      ),
    ];
    const uniqueSeries = [
      ...new Set(
        reels.map((reel) => reel.series).sort((a, b) => a.localeCompare(b))
      ),
    ];
    const uniqueSpoolSize = [
      ...new Set(
        reels
          .map((reel) => reel.spoolSize)
          .sort((a, b) => {
            return a - b;
          })
      ),
    ];
    const uniqueDragMax = [
      ...new Set(
        reels
          .map((reel) => reel.dragMax)
          .sort((a, b) => {
            return a - b;
          })
      ),
    ];
    const uniqueDragSys = [
      ...new Set(
        reels.map((reel) => reel.dragSys).sort((a, b) => a.localeCompare(b))
      ),
    ];
    const uniqueBallBearing = [
      ...new Set(
        reels.map((reel) => reel.ballBearing).sort((a, b) => a.localeCompare(b))
      ),
    ];

    setTypereelFilters(uniqueTypereels);
    setBrandsFilters(uniqueBrands);
    setSeriesFilters(uniqueSeries);
    setSpoolSizeFilters(uniqueSpoolSize);
    setDragMaxFilters(uniqueDragMax);
    setDragSysFilters(uniqueDragSys);
    setBallBearingFilters(uniqueBallBearing);
    setAllReels(reels);
  }, []);

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: prevFilters[filterType].includes(value)
        ? prevFilters[filterType].filter((filter) => filter !== value)
        : [...prevFilters[filterType], value],
    }));
    setCurrentPage(1);
  };

  const filteredProducts = allReels
    .filter(
      (reel) =>
        (filters.typereel.length === 0 ||
          filters.typereel.includes(reel.typereel)) &&
        (filters.brand.length === 0 || filters.brand.includes(reel.brand)) &&
        (filters.series.length === 0 || filters.series.includes(reel.series)) &&
        (filters.spoolSize.length === 0 ||
          filters.spoolSize.includes(reel.spoolSize)) &&
        (filters.dragMax.length === 0 ||
          filters.dragMax.includes(reel.dragMax)) &&
        (filters.dragSys.length === 0 ||
          filters.dragSys.includes(reel.dragSys)) &&
        (filters.ballBearing.length === 0 ||
          filters.ballBearing.includes(reel.ballBearing))
    )
    .sort((a, b) => {
      const brandComparison = a.brand.localeCompare(b.brand);
      if (brandComparison !== 0) return brandComparison;

      const seriesComparison = a.series.localeCompare(b.series);
      if (seriesComparison !== 0) return seriesComparison;

      const modelComparison = a.model.localeCompare(b.model);
      if (modelComparison !== 0) return modelComparison;

      return a.name.localeCompare(b.name);
    });

  const currentProducts = filteredProducts.slice(
    0,
    currentPage * productsPerPage
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const loadMoreItems = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className={`${styles.data__container}`}>
      <MobileFiltersContainer>
        <Filters
          filtersList={typereelFilters}
          filterState={filters.typereel}
          nameFilterInObject={"typereel"}
          handleFilterChange={handleFilterChange}
          name={"Оберіть тип:"}
        />
        <Filters
          filtersList={brandsFilters}
          filterState={filters.brand}
          nameFilterInObject={"brand"}
          handleFilterChange={handleFilterChange}
          name={"Оберіть бренд:"}
        />
        <Filters
          filtersList={seriesFilters}
          filterState={filters.series}
          nameFilterInObject={"series"}
          handleFilterChange={handleFilterChange}
          name={"Оберіть серію:"}
        />
        <Filters
          filtersList={spoolSizeFilters}
          filterState={filters.spoolSize}
          nameFilterInObject={"spoolSize"}
          handleFilterChange={handleFilterChange}
          name={"Оберіть розмір шпулі:"}
        />
        <Filters
          filtersList={dragMaxFilters}
          filterState={filters.dragMax}
          nameFilterInObject={"dragMax"}
          handleFilterChange={handleFilterChange}
          name={"Оберіть тягу(кг):"}
        />
        <Filters
          filtersList={dragSysFilters}
          filterState={filters.dragSys}
          nameFilterInObject={"dragSys"}
          handleFilterChange={handleFilterChange}
          name={"Оберіть фрікціон:"}
        />
        <Filters
          filtersList={ballBearingFilters}
          filterState={filters.ballBearing}
          nameFilterInObject={"ballBearing"}
          handleFilterChange={handleFilterChange}
          name={"Оберіть підшипники:"}
        />
      </MobileFiltersContainer>
      <div>
        <div className={styles.filters__container}>
          <p className={styles.filters__title}>Фільтрація:</p>
          <Filters
            filtersList={typereelFilters}
            filterState={filters.typereel}
            nameFilterInObject={"typereel"}
            handleFilterChange={handleFilterChange}
            name={"Оберіть тип:"}
          />
          <Filters
            filtersList={brandsFilters}
            filterState={filters.brand}
            nameFilterInObject={"brand"}
            handleFilterChange={handleFilterChange}
            name={"Оберіть бренд:"}
          />
          <Filters
            filtersList={seriesFilters}
            filterState={filters.series}
            nameFilterInObject={"series"}
            handleFilterChange={handleFilterChange}
            name={"Оберіть серію:"}
          />
          <Filters
            filtersList={spoolSizeFilters}
            filterState={filters.spoolSize}
            nameFilterInObject={"spoolSize"}
            handleFilterChange={handleFilterChange}
            name={"Оберіть розмір шпулі:"}
          />
          <Filters
            filtersList={dragMaxFilters}
            filterState={filters.dragMax}
            nameFilterInObject={"dragMax"}
            handleFilterChange={handleFilterChange}
            name={"Оберіть тягу(кг):"}
          />
          <Filters
            filtersList={dragSysFilters}
            filterState={filters.dragSys}
            nameFilterInObject={"dragSys"}
            handleFilterChange={handleFilterChange}
            name={"Оберіть фрікціон:"}
          />
          <Filters
            filtersList={ballBearingFilters}
            filterState={filters.ballBearing}
            nameFilterInObject={"ballBearing"}
            handleFilterChange={handleFilterChange}
            name={"Оберіть підшипники:"}
          />
        </div>
      </div>

      <div className={styles.reels__container}>
        <ul className={styles.reels__list}>
          {currentProducts.map((product) => (
            <li key={product._id} className={styles.reels__item}>
              <p className={styles.reels__article}>Артикль: {product.item}</p>
              <Link
                href={`/rybalski-snasti/katushky/${product._id}`}
                className={styles.reels__link}
              >
                <Image
                  src={product.img[0]}
                  alt={product.alt}
                  width={260}
                  height={260}
                  className={styles.reels__img}
                  priority={true}
                />
                <h3
                  className={styles.reels__name}
                >{`${product.name} ${product.brand} ${product.series} ${product.model}`}</h3>

                <p className={styles.reels__stock}>
                  {product.stock ? "В наявності" : "Немає в наявності"}
                </p>
              </Link>
              <div className={styles.price__container}>
                <ul className={styles.prices__list}>
                  <li>
                    <p
                      className={`${styles.reels__price} ${
                        process.env.NEXT_PUBLIC_SALE_MODE === "true"
                          ? styles.sale
                          : ""
                      }`}
                    >
                      {`Ціна: ${calcMainPrice(product.price)} грн`}
                    </p>
                  </li>
                  {process.env.NEXT_PUBLIC_SALE_MODE === "true" && (
                    <li
                      className={`${styles.reels__price} ${styles.reels__price__sale}`}
                    >
                      <p>{`Ціна: ${calcSalePrice(product.price)} грн`}</p>
                    </li>
                  )}
                </ul>

                {product.stock && (
                  <BuyButton
                    productId={product._id}
                    productName={`${product.name} ${product.brand} ${product.series} ${product.model}`}
                    productPrice={
                      process.env.NEXT_PUBLIC_SALE_MODE === "true"
                        ? calcSalePrice(product.price)
                        : calcMainPrice(product.price)
                    }
                    productImg={product.img[0]}
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
        {currentProducts.length === 0 && (
          <p className={styles.reels__none}>
            Вибачте, але товарів за обраними фільтрами не знайдено. Спробуйте
            змінити запит.
          </p>
        )}

        {currentPage !== totalPages && currentPage < totalPages && (
          <ButtonMore onClick={loadMoreItems} />
        )}
      </div>
    </div>
  );
};

export default ReelsList;
