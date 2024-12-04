import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./PhotoSliderSkeleton.scss";

type Props = {
  imagesCount: number;
};

export const PhotoSliderSkeleton: React.FC<Props> = ({ imagesCount }) => {
  return (
    <div className="slider">
      <div className="slider__mini">
        {Array.from({ length: Math.min(imagesCount, 6) }).map((_, index) => (
          <Skeleton
            key={index}
            className="slider__photo"
            height={82}
            width={82}
            borderRadius={5}
          />
        ))}
      </div>

      <div className="slider__main">
        <Skeleton className="slider__main_photo" height="590px" />

        <div className="slider__infolabel">
          <Skeleton width={50} height={20} />
          <Skeleton circle width={16} height={16} />
        </div>

        <div className="slider__togles">
          <Skeleton
            className="slider__togles_button"
            height={40}
            width={40}
            circle
          />
          <Skeleton
            className="slider__togles_button left"
            height={40}
            width={40}
            circle
          />
        </div>
      </div>
    </div>
  );
};
