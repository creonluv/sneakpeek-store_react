import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const CheckoutBlockSkeleton: React.FC = () => {
  return (
    <div className="checkout__block">
      <div className="checkout__blockTitle">
        <Skeleton width={200} height={30} />
      </div>

      <hr className="checkout__line" />

      {[...Array(3)].map((_, index) => (
        <div key={index} className="checkout__item">
          <div className="checkout__itemLeft">
            <Skeleton width={100} height={100} />
          </div>

          <div className="checkout__itemTop">
            <div className="checkout__titles">
              <Skeleton width={150} height={20} />
              <Skeleton width={200} height={25} />
            </div>

            <div className="checkout__bottom">
              <div className="checkout__sizes">
                <Skeleton width={50} height={15} />
                <Skeleton width={30} height={15} />
              </div>
              <Skeleton width={70} height={20} />
            </div>
          </div>
        </div>
      ))}

      <div className="checkout__information">
        <div className="checkout__info">
          <Skeleton width={150} height={20} />
          <Skeleton width={70} height={20} />
        </div>
        <div className="checkout__info">
          <Skeleton width={150} height={20} />
          <Skeleton width={70} height={20} />
        </div>
      </div>

      <hr className="checkout__line" />

      <div className="checkout__subtotal">
        <Skeleton width={150} height={25} />
        <Skeleton width={70} height={25} />
      </div>
    </div>
  );
};
