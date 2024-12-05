import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const ProductPageSkeleton: React.FC = () => {
  return (
    <div className="product">
      <div className="product__information">
        <div className="product__description">
          <Skeleton width={120} height={20} />
          <Skeleton width={200} height={28} />
          <Skeleton width={100} height={20} />
        </div>
        <div className="product_price">
          <Skeleton width={80} height={32} />
        </div>
      </div>

      <div className="product__interactive">
        <div className="product__interactive_top">
          <div className="product__block">
            <Skeleton width={120} height={20} />
            <div className="product__sizes">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="product__size"
                  width={60}
                  height={40}
                />
              ))}
            </div>
          </div>
          <div className="product__buttons">
            <Skeleton width={200} height={50} />
            <Skeleton width={50} height={50} circle />
          </div>
          <div className="product__dropdowns">
            <Skeleton width="100%" height={40} />
            <Skeleton width="100%" height={40} />
          </div>
        </div>
      </div>
      <Skeleton width={150} height={20} />
    </div>
  );
};
