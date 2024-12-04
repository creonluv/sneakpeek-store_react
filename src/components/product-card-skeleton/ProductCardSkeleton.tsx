import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./ProductCardSkeleton.scss";

type Props = {
  count: number;
  gridClass?: string;
};

export const ProductCardSkeleton: React.FC<Props> = ({ count, gridClass }) => {
  return (
    <div className={gridClass ? `${gridClass}` : "cards"}>
      {Array.from({ length: count }).map((_, index) => (
        <div className="card" key={index}>
          <div className="card__imgWrapper">
            <Skeleton className="card__img" height={285} />
          </div>

          <div className="card__information">
            <div className="card__description">
              <Skeleton width={100} height={16} className="card__producer" />
              <Skeleton width={140} height={20} className="card__title" />
            </div>
            <Skeleton width={60} height={24} className="card__price" />
          </div>

          <div className="card__infolabel">
            <Skeleton width={50} height={16} />
            <Skeleton
              circle
              width={16}
              height={16}
              className="card__infolabel_icon"
            />
          </div>

          <div className="card__button">
            <Skeleton width={40} height={40} circle />
          </div>
        </div>
      ))}
    </div>
  );
};
