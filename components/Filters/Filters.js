"use client"
import { useState } from "react";
import styles from "./Filters.module.css";

const Filters = ({
  filtersList,
  filterState,
  nameFilterInObject,
    handleFilterChange,
  name,
}) => {
    const [isListOpen, setIsListOpen] = useState(false);

    const handleToggleList = () => {
      setIsListOpen(!isListOpen);
    };
    const shouldShowButton = filtersList.length > 5; 

    
    return (
      <div>
        <p className={styles.filters__name}>{name}</p>
        <ul
          className={`${styles.filters__list} ${
            isListOpen ? styles.opened : styles.closed
          }`}
        >
          {filtersList.map((filter, index) => (
            <li key={index}>
              <label className={styles.filters__label}>
                <input
                  name={filter}
                  className={styles.filters__checkbox}
                  type="checkbox"
                  checked={filterState.includes(filter)}
                  onChange={() =>
                    handleFilterChange(nameFilterInObject, filter)
                  }
                />
                {filter}
              </label>
            </li>
          ))}
        </ul>
        {shouldShowButton && (
          <button
            onClick={handleToggleList}
            type="button"
            className={styles.filters__toggle__btn}
          >
            {isListOpen ? "Менше" : "Більше"}
          </button>
        )}
      </div>
    );
};

export default Filters;