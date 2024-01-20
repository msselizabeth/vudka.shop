"use client";

import { useEffect, useState } from "react";
import Filters from "../Filters/Filters";
import styles from "./RodList.module.css";
import MobileFiltersContainer from "../Filters/MobileFiltersContainer";
import ButtonMore from "../ButtonMore/ButtonMore";
import Link from "next/link";
import Image from "next/image";
import BuyButton from "../BuyButton/BuyButton";

const RodsList = ({ rods }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    brand: [],
    series: [],
    testMax: [],
    testLb: [],
    action: [],
    section: [],
  });
  const [brandsFilters, setBrandsFilters] = useState([]);
  const [seriesFilters, setSeriesFilters] = useState([]);
  const [testMaxFilters, setTestMaxFilters] = useState([]);
  const [testLbFilters, setTestLbFilters] = useState([]);
  const [actionFilters, setActionFilters] = useState([]);
  const [sectionFilters, setSectionFilters] = useState([]);

  useEffect(() => {
    const uniqueBrands = [
      ...new Set(
        rods.map((product) => product.brand).sort((a, b) => a.localeCompare(b))
      ),
    ];
    const uniqueSeries = [
      ...new Set(
        rods.map((product) => product.series).sort((a, b) => a.localeCompare(b))
      ),
    ];
    const uniqueTestsMax = [
      ...new Set(
        rods
          .map((product) => product.testMax)
          .sort((a, b) => {
            return a - b;
          })
      ),
    ];
    const uniqueTestsLb = [
      ...new Set(
        rods
          .map((product) => product.testLb)
          .sort((a, b) => {
            return a - b;
          })
      ),
    ];
    const uniqueAction = [
      ...new Set(
        rods
          .map((product) => product.action)
          .sort((a, b) => {
            return a - b;
          })
      ),
    ];
    const uniqueSection = [
      ...new Set(
        rods
          .map((product) => product.section)
          .sort((a, b) => {
            return a - b;
          })
      ),
    ];
    setBrandsFilters(uniqueBrands);
    setSeriesFilters(uniqueSeries);
    setTestMaxFilters(uniqueTestsMax);
    setTestLbFilters(uniqueTestsLb);
    setActionFilters(uniqueAction);
    setSectionFilters(uniqueSection);
    setProducts(rods);
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

  const filteredProducts = products
    .filter(
      (product) =>
        (filters.brand.length === 0 || filters.brand.includes(product.brand)) &&
        (filters.series.length === 0 ||
          filters.series.includes(product.series)) &&
        (filters.testMax.length === 0 ||
          filters.testMax.includes(product.testMax)) &&
        (filters.testLb.length === 0 ||
          filters.testLb.includes(product.testLb)) &&
        (filters.action.length === 0 ||
          filters.action.includes(product.action)) &&
        (filters.section.length === 0 ||
          filters.section.includes(product.section))
    )
    .sort((a, b) => {
      // Сравниваем по четырем свойствам
      const brandComparison = a.brand.localeCompare(b.brand);
      if (brandComparison !== 0) return brandComparison;

      const seriesComparison = a.series.localeCompare(b.series);
      if (seriesComparison !== 0) return seriesComparison;

      const modelComparison = a.model.localeCompare(b.model);
      if (modelComparison !== 0) return modelComparison;

      return a.name.localeCompare(b.name); // По умолчанию, если все свойства равны
    });

  const currentProducts = filteredProducts.slice(0, currentPage * itemsPerPage);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const loadMoreItems = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className={`${styles.data__container}`}>
      <MobileFiltersContainer>
        <Filters
          filtersList={brandsFilters}
          filterState={filters.brand}
          nameFilterInObject={"brand"}
          handleFilterChange={handleFilterChange}
          name={"Оберіть бренд"}
        />
        <Filters
          filtersList={seriesFilters}
          filterState={filters.series}
          nameFilterInObject={"series"}
          handleFilterChange={handleFilterChange}
          name={"Оберіть серію"}
        />
        <Filters
          filtersList={testMaxFilters}
          filterState={filters.testMax}
          nameFilterInObject={"testMax"}
          handleFilterChange={handleFilterChange}
          name={"Оберіть тест(макс.)"}
        />
        {filters.testLb.length > 0 && (
          <Filters
            filtersList={testLbFilters}
            filterState={filters.testLb}
            nameFilterInObject={"testLb"}
            handleFilterChange={handleFilterChange}
            name={"Оберіть тест(lb):"}
          />
        )}
        <Filters
          filtersList={actionFilters}
          filterState={filters.action}
          nameFilterInObject={"action"}
          handleFilterChange={handleFilterChange}
          name={"Оберіть дію:"}
        />
        <Filters
          filtersList={sectionFilters}
          filterState={filters.section}
          nameFilterInObject={"section"}
          handleFilterChange={handleFilterChange}
          name={"Оберіть секції:"}
        />
      </MobileFiltersContainer>
      <div>
        <div className={styles.filters__container}>
          <p className={styles.filters__title}>Фільтрація:</p>
          <Filters
            filtersList={brandsFilters}
            filterState={filters.brand}
            nameFilterInObject={"brand"}
            handleFilterChange={handleFilterChange}
            name={"Оберіть бренд"}
          />
          <Filters
            filtersList={seriesFilters}
            filterState={filters.series}
            nameFilterInObject={"series"}
            handleFilterChange={handleFilterChange}
            name={"Оберіть серію"}
          />
          <Filters
            filtersList={testMaxFilters}
            filterState={filters.testMax}
            nameFilterInObject={"testMax"}
            handleFilterChange={handleFilterChange}
            name={"Оберіть тест(макс.)"}
          />
          {filters.testLb.length > 0 && (
            <Filters
              filtersList={testLbFilters}
              filterState={filters.testLb}
              nameFilterInObject={"testLb"}
              handleFilterChange={handleFilterChange}
              name={"Оберіть тест(lb):"}
            />
          )}
          <Filters
            filtersList={actionFilters}
            filterState={filters.action}
            nameFilterInObject={"action"}
            handleFilterChange={handleFilterChange}
            name={"Оберіть дію:"}
          />
          <Filters
            filtersList={sectionFilters}
            filterState={filters.section}
            nameFilterInObject={"section"}
            handleFilterChange={handleFilterChange}
            name={"Оберіть секції:"}
          />
        </div>
      </div>

      <div className={styles.rods__container}>
        {/* Товары текущей страницы */}
        <ul className={styles.rods__list}>
          {currentProducts.map((product) => (
            <li key={product._id} className={styles.rods__item}>
              <p className={styles.rods__article}>Артикль: {product.item}</p>
              <Link href={"/"} className={styles.rods__link}>
                <Image
                  src={product.img[0]}
                  alt={product.alt}
                  width={260}
                  height={260}
                  className={styles.rods__img}
                />
                <h3
                  className={styles.rods__name}
                >{`${product.name} ${product.brand} ${product.series} ${product.model} ${product.rodSize}см ${product.testMin}-${product.testMax}г`}</h3>

                <p className={styles.rods__stock}>
                  {product.stock ? "В наявності" : "Немає в наявності"}
                </p>
              </Link>
              <div className={styles.rods__price__container}>
                <p className={styles.rods__price}>
                  Ціна: {product.price * process.env.NEXT_PUBLIC_EXCHANGE} грн
                </p>
                {product.stock && <BuyButton />}
              </div>
            </li>
          ))}
        </ul>
        {currentProducts.length === 0 && (
          <p className={styles.rods__none}>
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


