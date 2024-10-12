import { useEffect, useState } from "react";
import styles from "./PhotoSlider.module.scss";
import arrowSlider from "../../assets/img/icons/scrollingArrows.svg";
import clockIcon from "../../assets/img/icons/clock.svg";

type Props = {
  images: string[] | undefined;
};

export const PhotoSlider: React.FC<Props> = ({ images }) => {
  const initialImage = images && images.length > 0 ? images[0] : "";

  const [selectedImg, setSelectedImg] = useState(initialImage);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setSelectedImg(images![index]);
    setCurrentIndex(index);
  };

  const handleNextClick = () => {
    if (images) {
      const nextIndex = (currentIndex + 1) % images.length;

      setSelectedImg(images[nextIndex]);
      setCurrentIndex(nextIndex);
    }
  };

  const handlePrevClick = () => {
    if (images) {
      const prevIndex = (currentIndex - 1 + images.length) % images.length;

      setSelectedImg(images[prevIndex]);
      setCurrentIndex(prevIndex);
    }
  };

  useEffect(() => {
    if (images && images.length > 0) {
      setSelectedImg(images[0]);
      setCurrentIndex(0);
    }
  }, [images]);

  return (
    <div className={styles.slider}>
      <div className={styles.slider__mini}>
        {images?.slice(0, 6).map((image, index) => (
          <img
            key={index}
            src={`http://localhost:9091/api/images/${image}`}
            alt={`mini-photo-${index}`}
            className={`${styles.slider__photo} ${
              index === currentIndex ? styles.slider__selected : ""
            }`}
            onClick={() => handleImageClick(index)}
          />
        ))}
      </div>

      <div className={styles.slider__main}>
        {selectedImg && (
          <img
            className={styles.slider__main_photo}
            src={`http://localhost:9091/api/images/${selectedImg}`}
            alt="main-photo"
          />
        )}

        <div className={styles.slider__infolabel}>
          new
          <img
            className={styles.slider__infolabel_icon}
            src={clockIcon}
            alt=""
          />
        </div>

        <div className={styles.slider__togles}>
          <button
            className={styles.slider__togles_button}
            onClick={handlePrevClick}
          >
            <img className={styles.slider__togle} src={arrowSlider} alt="" />
          </button>

          <button
            className={`${styles.slider__togles_button} ${styles.left}`}
            onClick={handleNextClick}
          >
            <img className={styles.slider__togle} src={arrowSlider} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};
