"use client"

// ProductList.js
// ProductList.js
import React, { useState, useEffect } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [filters, setFilters] = useState({
    brand: [],
    series: [],
  });
  const [brandsFilters, setBrandsFilters] = useState([]);
  const [seriesFiletrs, setSeriesFilters] = useState([]);

  // Функция для загрузки товаров из API
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reels/predator`);
      const data = await response.json();
      const uniqueBrands = [...new Set(data.map((product) => product.brand))];
      const uniqueSeries = [...new Set(data.map((product) => product.series))];
      setBrandsFilters(uniqueBrands);
      setSeriesFilters(uniqueSeries);
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Функция для изменения текущей страницы
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Фильтрация по бренду и серии
  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: prevFilters[filterType].includes(value)
        ? prevFilters[filterType].filter((filter) => filter !== value)
        : [...prevFilters[filterType], value],
    }));
    setCurrentPage(1); // Сбрасываем текущую страницу при изменении фильтров
  };

  // Отфильтрованные товары
  const filteredProducts = products.filter(
    (product) =>
      (filters.brand.length === 0 || filters.brand.includes(product.brand)) &&
      (filters.series.length === 0 || filters.series.includes(product.series))
  );

  // Отображение кнопок пагинации
  const renderPaginationButtons = () => {
    const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

    return Array.from({ length: pageCount }).map((_, index) => (
      <button key={index} onClick={() => paginate(index + 1)}>
        {index + 1}
      </button>
    ));
  };

  // Отображение товаров текущей страницы
  const renderCurrentPageItems = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

    return (
      <ul>
        {currentItems.map((product) => (
          <li key={product._id}>
                <p>{product.series}</p>
            {/* Например: product.brand, product.series, product.models, и т.д. */}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      {/* Фильтры по бренду */}
      <div>
        {brandsFilters.map((brand) => (
          <label key={brand}>
            <input
              type="checkbox"
              checked={filters.brand.includes(brand)}
              onChange={() => handleFilterChange("brand", brand)}
            />
            {brand}
          </label>
        ))}
        {/* Добавьте чекбоксы для других брендов, если необходимо */}
      </div>

      {/* Фильтры по серии */}
      <div>
        {seriesFiletrs.map((series) => (
          <label key={series}>
            <input
              type="checkbox"
              checked={filters.series.includes(series)}
              onChange={() => handleFilterChange("series", series)}
            />
            {series}
          </label>
        ))}
        {/* Добавьте чекбоксы для других серий, если необходимо */}
      </div>

      {/* Товары текущей страницы */}
      {renderCurrentPageItems()}

      {/* Пагинация */}
      <div>{renderPaginationButtons()}</div>
    </div>
  );
};

export default ProductList;

