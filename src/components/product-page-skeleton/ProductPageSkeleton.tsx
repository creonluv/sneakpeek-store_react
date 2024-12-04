import React from "react";
import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
import styles from "./ProductPageSkeleton.module.scss";

export const ProductPageSkeleton: React.FC = () => {
  return (
    <div className={styles.productpage}>
      <div className={styles.productpage__information}>
        <div className={styles.productpage__description}>
          <Skeleton width={120} height={20} />
          <Skeleton width={200} height={28} />
          <Skeleton width={100} height={20} />
        </div>
        <div className={styles.productpage__price}>
          <Skeleton width={80} height={32} />
        </div>
      </div>

      <div className={styles.productpage__interactive}>
        <div className={styles.productpage__interactive_top}>
          <div className={styles.productpage__block}>
            <Skeleton width={120} height={20} />
            <div className={styles.productpage__sizes}>
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className={styles.productpage__size}
                  width={60}
                  height={40}
                />
              ))}
            </div>
          </div>
          <div className={styles.productpage__buttons}>
            <Skeleton width={200} height={50} />
            <Skeleton width={50} height={50} circle />
          </div>
          <div className={styles.productpage__dropdowns}>
            <Skeleton width="100%" height={40} />
            <Skeleton width="100%" height={40} />
          </div>
        </div>
      </div>
      <Skeleton width={150} height={20} />
    </div>
  );
};
