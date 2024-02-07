"use client"

import { useState } from "react";
import styles from "./Carousel.module.css";
import Image from "next/image";

export const Carousel = ({ images, alt }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const changeImage = (index) => {
    setCurrentImage(index);
  };

  return (
    <div className={styles.carousel__container}>
     
        <Image
          src={images[currentImage]}
          alt={alt}
          width={1000}
          height={1000}
          className={styles.main__image}
        />
      

      <div className={styles.thumbnail__container}>
        {images.map((image, index) => (
          <div
            key={index}
            className={
              index === currentImage
                ? styles.active__thumbnail
                : styles.thumbnail
            }
            style={{ backgroundImage: `url(${image})` }}
            onClick={() => changeImage(index)}
          />
        ))}
      </div>
    </div>
  );
};





