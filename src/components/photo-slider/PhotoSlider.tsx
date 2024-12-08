import { useEffect, useState } from "react";

import arrowSlider from "../../assets/img/icons/scrollingArrows.svg";
import clockIcon from "../../assets/img/icons/clock.svg";

import "./PhotoSlider.scss";

type Props = {
  images: string[] | undefined;
};

export const PhotoSlider: React.FC<Props> = ({ images }) => {
  const initialImage = images && images.length > 0 ? images[0] : "";

  const [selectedImg, setSelectedImg] = useState(initialImage);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images && images.length > 0) {
      setSelectedImg(images[0]);
      setCurrentIndex(0);
    }
  }, [images]);

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

  return (
    <div className="slider">
      <div className="slider__miniPhoto">
        {images?.slice(0, 6).map((image, index) => (
          <img
            key={index}
            src={`https://localhost:9091/api/images/${image}`}
            alt={`mini-photo-${index}`}
            className={`slider__photo ${
              index === currentIndex ? "slider__selected" : ""
            }`}
            onClick={() => handleImageClick(index)}
          />
        ))}
      </div>

      <div className="slider__main">
        {selectedImg && (
          <img
            className="slider__main_photo"
            src={`https://localhost:9091/api/images/${selectedImg}`}
            alt="main-photo"
          />
        )}

        <div className="slider__infolabel">
          new
          <img className="slider__infolabel_icon" src={clockIcon} alt="" />
        </div>

        <div className="slider__togles">
          <button className="slider__togles_button" onClick={handlePrevClick}>
            <img className="slider__togle" src={arrowSlider} alt="" />
          </button>

          <button
            className="slider__togles_button left"
            onClick={handleNextClick}
          >
            <img className="slider__togle" src={arrowSlider} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};
