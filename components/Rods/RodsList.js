"use client"
import { useEffect, useState } from "react";
import Filters from "../Filters/Filters";
import styles from "./RodList.module.css";
import MobileFiltersContainer from "../Filters/MobileFiltersContainer";
import ButtonMore from "../ButtonMore/ButtonMore";
import Link from "next/link";
import Image from "next/image";
import BuyButton from "../BuyButton/BuyButton";
import { calcMainPrice, calcSalePrice } from "../../helpers/price-calc";

const RodsList = ({rods}) => {
  const [allRods, setAllRods] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    typerods: [],
    brand: [],
    series: [],
    testMax: [],
    testLb: [],
    action: [],
    section: [],
  });
  const [typerodsFilters, setTyperodsFilters] = useState([]);
  const [brandsFilters, setBrandsFilters] = useState([]);
  const [seriesFilters, setSeriesFilters] = useState([]);
  const [testMaxFilters, setTestMaxFilters] = useState([]);
  const [testLbFilters, setTestLbFilters] = useState([]);
  const [actionFilters, setActionFilters] = useState([]);
  const [sectionFilters, setSectionFilters] = useState([]);

  useEffect(() => {
     const uniqueTyperods = [
       ...new Set(
         rods.map((rod) => rod.typerods).sort((a, b) => a.localeCompare(b))
       ),
     ];
     const uniqueBrands = [
       ...new Set(
         rods.map((rod) => rod.brand).sort((a, b) => a.localeCompare(b))
       ),
     ];
     const uniqueSeries = [
       ...new Set(
         rods
           .map((rod) => rod.series)
           .sort((a, b) => a.localeCompare(b))
       ),
     ];
     const uniqueTestsMax = [
       ...new Set(
         rods
           .map((rod) => rod.testMax)
           .sort((a, b) => {
             return a - b;
           })
       ),
     ];
     const uniqueTestsLb = [
       ...new Set(
         rods
           .map((rod) => rod.testLb)
           .sort((a, b) => {
             return a - b;
           })
       ),
     ];
     const uniqueAction = [
       ...new Set(
         rods
           .map((rod) => rod.action)
           .sort((a, b) => {
             return a - b;
           })
       ),
     ];
     const uniqueSection = [
       ...new Set(
         rods
           .map((rod) => rod.section)
           .sort((a, b) => {
             return a - b;
           })
       ),
     ];
     setTyperodsFilters(uniqueTyperods);
     setBrandsFilters(uniqueBrands);
     setSeriesFilters(uniqueSeries);
     setTestMaxFilters(uniqueTestsMax);
     setTestLbFilters(uniqueTestsLb);
     setActionFilters(uniqueAction);
     setSectionFilters(uniqueSection);
     setAllRods(rods);
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

   const filteredProducts = allRods
     .filter(
       (rod) =>
         (filters.typerods.length === 0 ||
           filters.typerods.includes(rod.typerods)) &&
         (filters.brand.length === 0 ||
           filters.brand.includes(rod.brand)) &&
         (filters.series.length === 0 ||
           filters.series.includes(rod.series)) &&
         (filters.testMax.length === 0 ||
           filters.testMax.includes(rod.testMax)) &&
         (filters.testLb.length === 0 ||
           filters.testLb.includes(rod.testLb)) &&
         (filters.action.length === 0 ||
           filters.action.includes(rod.action)) &&
         (filters.section.length === 0 ||
           filters.section.includes(rod.section))
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
          filtersList={typerodsFilters}
          filterState={filters.typerods}
          nameFilterInObject={"typerods"}
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
        {testMaxFilters[0] !== "" && (
          <Filters
            filtersList={testMaxFilters}
            filterState={filters.testMax}
            nameFilterInObject={"testMax"}
            handleFilterChange={handleFilterChange}
            name={"Оберіть тест(макс.):"}
          />
        )}
        {testLbFilters[0] !== "" && (
          <Filters
            filtersList={testLbFilters}
            filterState={filters.testLb}
            nameFilterInObject={"testLb"}
            handleFilterChange={handleFilterChange}
            name={"Оберіть тест(lb):"}
          />
        )}
        {actionFilters[0] !== "" && (
          <Filters
            filtersList={actionFilters}
            filterState={filters.action}
            nameFilterInObject={"action"}
            handleFilterChange={handleFilterChange}
            name={"Оберіть дію:"}
          />
        )}
        {sectionFilters[0] !== "" && (
          <Filters
            filtersList={sectionFilters}
            filterState={filters.section}
            nameFilterInObject={"section"}
            handleFilterChange={handleFilterChange}
            name={"Оберіть секції:"}
          />
        )}
      </MobileFiltersContainer>
      <div>
        <div className={styles.filters__container}>
          <p className={styles.filters__title}>Фільтрація:</p>
          <Filters
            filtersList={typerodsFilters}
            filterState={filters.typerods}
            nameFilterInObject={"typerods"}
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
          {testMaxFilters[0] !== "" && (
            <Filters
              filtersList={testMaxFilters}
              filterState={filters.testMax}
              nameFilterInObject={"testMax"}
              handleFilterChange={handleFilterChange}
              name={"Оберіть тест(макс.):"}
            />
          )}
          {testLbFilters[0] !== "" && (
            <Filters
              filtersList={testLbFilters}
              filterState={filters.testLb}
              nameFilterInObject={"testLb"}
              handleFilterChange={handleFilterChange}
              name={"Оберіть тест(lb):"}
            />
          )}
          {actionFilters[0] !== "" && (
            <Filters
              filtersList={actionFilters}
              filterState={filters.action}
              nameFilterInObject={"action"}
              handleFilterChange={handleFilterChange}
              name={"Оберіть дію:"}
            />
          )}
          {sectionFilters[0] !== "" && (
            <Filters
              filtersList={sectionFilters}
              filterState={filters.section}
              nameFilterInObject={"section"}
              handleFilterChange={handleFilterChange}
              name={"Оберіть секції:"}
            />
          )}
        </div>
      </div>

      <div className={styles.rods__container}>
        <ul className={styles.rods__list}>
          {currentProducts.map((product) => (
            <li key={product._id} className={styles.rods__item}>
              <p className={styles.rods__article}>Артикль: {product.item}</p>
              <Link
                href={`/rybalski-snasti/vudylyshcha/${product._id}`}
                className={styles.rods__link}
              >
                <Image
                  src={product.img[0]}
                  alt={product.alt}
                  width={260}
                  height={260}
                  className={styles.rods__img}
                  priority={true}
                />
                <h3 className={styles.rods__name}>{`${product.name} ${
                  product.brand
                } ${product.series} ${product.model} ${product.rodSize}см ${
                  product.testMin && `${product.testMin}-${product.testMax}г`
                }`}</h3>

                <p className={styles.rods__stock}>
                  {product.stock ? "В наявності" : "Немає в наявності"}
                </p>
              </Link>
              <div className={styles.price__container}>
                  <ul className={styles.prices__list}>
                    <li>
                      <p
                        className={`${styles.rods__price} ${
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
                        className={`${styles.rods__price} ${styles.rods__price__sale}`}
                      >
                        <p>{`Ціна: ${calcSalePrice(product.price)} грн`}</p>
                      </li>
                    )}
                  </ul>
                 
          

                {product.stock && (
                  <BuyButton
                    productId={product._id}
                    productName={`${product.name} ${product.brand} ${product.series} ${
                      product.model
                    } ${product.rodSize}см ${
                      product.testMin && `${product.testMin}-${product.testMax}г`
                    }`}
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
}

export default RodsList;