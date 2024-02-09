"use client";
import styles from "./HooksList.module.css";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import MobileFiltersContainer from "../Filters/MobileFiltersContainer";
import Filters from "../Filters/Filters";
import ButtonMore from "../ButtonMore/ButtonMore";
import { calcMainPrice, calcSalePrice } from "../../helpers/price-calc";
import NoProductsFound from "../NoProductsFound/NoProductsFound";

const HooksList = ({ hooks }) => {
  const [allHooks, setAllHooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    typehooks: [],
    brand: [],
    series: [],
  });
  const [typehooksFilters, setTypehooksFilters] = useState([]);
  const [brandsFilters, setBrandsFilters] = useState([]);
  const [seriesFilters, setSeriesFilters] = useState([]);

  useEffect(() => {
    const uniqueTypehooks = [
      ...new Set(
        hooks.map((hook) => hook.typehooks).sort((a, b) => a.localeCompare(b))
      ),
    ];
    const uniqueBrands = [
      ...new Set(
        hooks.map((hook) => hook.brand).sort((a, b) => a.localeCompare(b))
      ),
    ];
    const uniqueSeries = [
      ...new Set(
        hooks.map((hook) => hook.series).sort((a, b) => a.localeCompare(b))
      ),
    ];

    setTypehooksFilters(uniqueTypehooks);
    setBrandsFilters(uniqueBrands);
    setSeriesFilters(uniqueSeries);

    setAllHooks(hooks);
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

  const filteredProducts = allHooks
    .filter(
      (hook) =>
        (filters.typehooks.length === 0 ||
          filters.typehooks.includes(hook.typehooks)) &&
        (filters.brand.length === 0 || filters.brand.includes(hook.brand)) &&
        (filters.series.length === 0 || filters.series.includes(hook.series))
    )
    .sort((a, b) => {
      const brandComparison = a.brand.localeCompare(b.brand);
      if (brandComparison !== 0) return brandComparison;

      const seriesComparison = a.series.localeCompare(b.series);
      if (seriesComparison !== 0) return seriesComparison;

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
          filtersList={typehooksFilters}
          filterState={filters.typehooks}
          nameFilterInObject={"typehooks"}
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
      </MobileFiltersContainer>
      <div>
        <div className={styles.filters__container}>
          <p className={styles.filters__title}>Фільтрація:</p>
          <Filters
            filtersList={typehooksFilters}
            filterState={filters.typehooks}
            nameFilterInObject={"typehooks"}
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
        </div>
      </div>

      <div className={styles.hooks__container}>
        <ul className={styles.hooks__list}>
          {currentProducts.map((product) => {
            if (!product.sale && product.render) {
              return (
                <li key={product._id} className={styles.hooks__item}>
                  {product.item && (
                    <p className={styles.hooks__article}>
                      Артикль: {product.item}
                    </p>
                  )}
                  <Link
                    href={`/osnashchennya/hachky/${product._id}`}
                    className={styles.hooks__link}
                  >
                    <Image
                      src={product.imgMain}
                      alt={product.alt}
                      width={800}
                      height={800}
                      className={styles.hooks__img}
                      priority={true}
                    />
                    <h3
                      className={styles.hooks__name}
                    >{`${product.name} ${product.brand} ${product.series}`}</h3>

                    <p className={styles.hooks__stock}>
                      {product.stock ? "В наявності" : "Немає в наявності"}
                    </p>
                  </Link>
                  <ul className={styles.prices__list}>
                    <li>
                      <p
                        className={`${styles.hooks__price} ${
                          process.env.NEXT_PUBLIC_SALE_MODE === "true"
                            ? styles.sale
                            : ""
                        }`}
                      >{`Ціна: ${calcMainPrice(product.priceMain)} грн`}</p>
                    </li>
                    {process.env.NEXT_PUBLIC_SALE_MODE === "true" && (
                      <li>
                        <p
                          className={`${styles.hooks__price} ${styles.hooks__price__sale}`}
                        >{`Ціна: ${calcSalePrice(product.priceMain)} грн`}</p>
                      </li>
                    )}
                  </ul>
                </li>
              );
            }
            return;
          })}
        </ul>
        {currentProducts.length === 0 && <NoProductsFound />}

        {currentPage !== totalPages && currentPage < totalPages && (
          <ButtonMore onClick={loadMoreItems} />
        )}
      </div>
    </div>
  );
};

export default HooksList;
