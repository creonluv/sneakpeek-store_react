import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const ProductPageSkeleton: React.FC = () => {
  return (
    <div className="productpage">
      <div className="productpage__information">
        <div className="productpage__description">
          <Skeleton width={120} height={20} />
          <Skeleton width={200} height={28} />
          <Skeleton width={100} height={20} />
        </div>
        <div className="productpage__price">
          <Skeleton width={80} height={32} />
        </div>
      </div>

      <div className="productpage__interactive">
        <div className="productpage__interactive_top">
          <div className="productpage__block">
            <Skeleton width={120} height={20} />
            <div className="productpage__sizes">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="productpage__size"
                  width={60}
                  height={40}
                />
              ))}
            </div>
          </div>
          <div className="productpage__buttons">
            <Skeleton width={200} height={50} />
            <Skeleton width={50} height={50} circle />
          </div>
          <div className="productpage__dropdowns">
            <Skeleton width="100%" height={40} />
            <Skeleton width="100%" height={40} />
          </div>
        </div>
      </div>
      <Skeleton width={150} height={20} />
    </div>
  );
};
