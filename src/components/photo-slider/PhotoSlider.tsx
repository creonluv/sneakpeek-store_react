import { useEffect, useState } from "react";

import arrowSlider from "../../assets/img/icons/scrollingArrows.svg";
import clockIcon from "../../assets/img/icons/clock.svg";

import "./PhotoSlider.scss";
import { Product } from "../../types/Products";

type Props = {
  images: string[] | undefined;
  product: Product | null;
};

export const PhotoSlider: React.FC<Props> = ({ images, product }) => {
  const initialImage = images && images.length > 0 ? images[0] : "";

  const [selectedImg, setSelectedImg] = useState(initialImage);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomStyle, setZoomStyle] = useState({
    display: "none",
    backgroundPosition: "0% 0%",
  });

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;

    setZoomStyle({
      display: "block",
      backgroundPosition: `${x}% ${y}%`,
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: "none", backgroundPosition: "0% 0%" });
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

      <div
        className="slider__main"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {selectedImg && (
          <img
            className="slider__main_photo"
            src={`https://localhost:9091/api/images/${selectedImg}`}
            alt="main-photo"
          />
        )}
        <div
          className="slider__zoom"
          style={{
            ...zoomStyle,
            backgroundImage: `url(https://localhost:9091/api/images/${selectedImg})`,
          }}
        ></div>
        <div className="slider__infolabel">
          new
          <img className="slider__infolabel_icon" src={clockIcon} alt="" />
        </div>

        <div className="slider__infolabel">
          {product && (
            <>
              <span>
                {"current_discount" in product && product.current_discount
                  ? product.current_discount.type === "PERCENTAGE"
                    ? `-${product.current_discount.value}%`
                    : `-${product.current_discount.value}$`
                  : "new"}
              </span>

              <img
                className="slider__infolabel_icon"
                src={
                  "current_discount" in product && product.current_discount
                    ? product.current_discount.type && ""
                    : clockIcon
                }
                alt=""
              />
            </>
          )}
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
