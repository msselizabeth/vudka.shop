"use client"
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./Silicones.module.css";
import Filters from "../Filters/Filters";
import MobileFiltersContainer from "../Filters/MobileFiltersContainer";
import BuyButton from "../BuyButton/BuyButton";
import ButtonMore from "../ButtonMore/ButtonMore";

const SiliconesList = ({ silicones }) => {
    const [allSilicones, setAllSelicones] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(10);
    const [filters, setFilters] = useState({
      lurestype: [],
      brand: [],
      series: [],
      size: [],
      weight: [],
    });
    const [lurestypeFilters, setLurestypeFilters] = useState([]);
    const [brandsFilters, setBrandsFilters] = useState([]);
    const [seriesFilters, setSeriesFilters] = useState([]);
    const [sizeFilters, setSizeFilters] = useState([]);
    const [weightFilters, setWeightFilters] = useState([]);

     useEffect(() => {
       const uniqueLurestype = [
         ...new Set(
           silicones.map((silicone) => silicone.lurestype).sort((a, b) => a.localeCompare(b))
         ),
       ];
       const uniqueBrands = [
         ...new Set(
           silicones.map((silicone) => silicone.brand).sort((a, b) => a.localeCompare(b))
         ),
       ];
       const uniqueSeries = [
         ...new Set(
           silicones.map((silicone) => silicone.series).sort((a, b) => a.localeCompare(b))
         ),
       ];
       const uniqueSize = [
           ...new Set(
             silicones
               .map((silicone) => silicone.size)
               .sort((a, b) => {
                 return a - b;
               })
           ),
        ];
      const uniqueWeight = [
               ...new Set(
                 silicones
                   .map((silicone) => silicone.weight)
                   .sort((a, b) => {
                     return a - b;
                   })
               ),
        ];
        
       setLurestypeFilters(uniqueLurestype);
       setBrandsFilters(uniqueBrands);
         setSeriesFilters(uniqueSeries);
         setSizeFilters(uniqueSize);
         setWeightFilters(uniqueWeight);
    
       setAllSelicones(silicones);
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
    
    const filteredProducts = allSilicones
      .filter(
        (silicone) =>
          (filters.lurestype.length === 0 ||
            filters.lurestype.includes(silicone.lurestype)) &&
          (filters.brand.length === 0 ||
            filters.brand.includes(silicone.brand)) &&
          (filters.series.length === 0 ||
            filters.series.includes(silicone.series)) &&
          (filters.size.length === 0 ||
            filters.size.includes(silicone.size)) &&
          (filters.weight.length === 0 ||
            filters.weight.includes(silicone.weight))
      )
      .sort((a, b) => {
        const brandComparison = a.brand.localeCompare(b.brand);
        if (brandComparison !== 0) return brandComparison;

        const seriesComparison = a.series.localeCompare(b.series);
        if (seriesComparison !== 0) return seriesComparison;

        const sizeComparison = a.size.localeCompare(b.size);
        if (sizeComparison !== 0) return sizeComparison;

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
            filtersList={lurestypeFilters}
            filterState={filters.lurestype}
            nameFilterInObject={"lurestype"}
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
          {sizeFilters[0] !== "" && (
            <Filters
              filtersList={sizeFilters}
              filterState={filters.size}
              nameFilterInObject={"size"}
              handleFilterChange={handleFilterChange}
              name={"Оберіть розмір:"}
            />
          )}
          {weightFilters[0] !== "" && (
            <Filters
              filtersList={weightFilters}
              filterState={filters.weight}
              nameFilterInObject={"weight"}
              handleFilterChange={handleFilterChange}
              name={"Оберіть вагу:"}
            />
          )}
        </MobileFiltersContainer>
        <div>
          <div className={styles.filters__container}>
            <p className={styles.filters__title}>Фільтрація:</p>
            <Filters
              filtersList={lurestypeFilters}
              filterState={filters.lurestype}
              nameFilterInObject={"lurestype"}
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
            {sizeFilters[0] !== "" && (
              <Filters
                filtersList={sizeFilters}
                filterState={filters.size}
                nameFilterInObject={"size"}
                handleFilterChange={handleFilterChange}
                name={"Оберіть розмір:"}
              />
            )}
            {weightFilters[0] !== "" && (
              <Filters
                filtersList={weightFilters}
                filterState={filters.weight}
                nameFilterInObject={"weight"}
                handleFilterChange={handleFilterChange}
                name={"Оберіть вагу:"}
              />
            )}
          </div>
        </div>

        <div className={styles.silicones__container}>
          <ul className={styles.silicones__list}>
            {currentProducts.map((product) => (
              <li key={product._id} className={styles.silicones__item}>
                {product.item && (
                  <p className={styles.silicones__article}>
                    Артикль: {product.item}
                  </p>
                )}
                <Link
                  href={`/prymanky-ta-prykormky/sylikon/${product._id}`}
                  className={styles.silicones__link}
                >
                  <Image
                    src={product.imgMain}
                    alt={product.alt}
                    width={260}
                    height={260}
                    className={styles.silicones__img}
                    priority={true}
                  />
                  <h3
                    className={styles.silicones__name}
                  >{`${product.name} ${product.brand} ${product.series} ${product.model}"`}</h3>

                  <p className={styles.silicones__stock}>
                    {product.stock ? "В наявності" : "Немає в наявності"}
                  </p>
                </Link>
                <div className={styles.silicones__price__container}>
                  <p className={styles.silicones__price}>
                    Ціна:{" "}
                    {(
                      parseFloat(product.price) *
                      process.env.NEXT_PUBLIC_EXCHANGE
                    ).toFixed(2)}{" "}
                    грн
                  </p>
                  {product.stock && (
                    <BuyButton
                      productId={product._id}
                      productName={`${product.name} ${product.brand} ${product.series} ${product.model}"`}
                      productPrice={
                        parseFloat(product.price) *
                        process.env.NEXT_PUBLIC_EXCHANGE
                      }
                      productImg={product.imgMain}
                    />
                  )}
                </div>
              </li>
            ))}
          </ul>
          {currentProducts.length === 0 && (
            <p className={styles.silicones__none}>
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

export default SiliconesList;