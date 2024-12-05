import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const ProfileSkeleton: React.FC = () => {
  return (
    <section className="profile">
      <div className="profile__container">
        <div className="profile__body">
          <div className="profile__top">
            <Skeleton width={200} height={30} />

            <div className="profile__buttons">
              <Skeleton
                width={100}
                height={40}
                style={{ marginRight: "8px" }}
              />
              <Skeleton width={100} height={40} />
            </div>
          </div>

          <div className="profile__items">
            <div className="profile__item">
              <Skeleton
                width={150}
                height={25}
                style={{ marginTop: "24px", marginLeft: "24px" }}
              />

              <div className="profile__content">
                <div className="profile__info">
                  <Skeleton circle width={100} height={100} />

                  <div className="profile__block">
                    <Skeleton width={140} height={20} />
                    <Skeleton width={100} height={20} />
                    <Skeleton width={150} height={32} />
                  </div>
                </div>
                <div className="profile__inputs">
                  <div className="profile__group">
                    <Skeleton width={100} height={15} />
                    <Skeleton
                      width="100%"
                      height={40}
                      style={{ marginTop: "5px" }}
                    />
                  </div>
                  <div className="profile__group">
                    <Skeleton width={100} height={15} />
                    <Skeleton
                      width="100%"
                      height={40}
                      style={{ marginTop: "5px" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="profile__item">
              <Skeleton
                width={150}
                height={25}
                style={{ marginTop: "24px", marginLeft: "24px" }}
              />
              <div className="profile__content">
                <div className="profile__inputs">
                  <div className="profile__group">
                    <Skeleton width={100} height={15} />
                    <Skeleton
                      width="100%"
                      height={40}
                      style={{ marginTop: "5px" }}
                    />
                  </div>
                  <div className="profile__group">
                    <Skeleton width={100} height={15} />
                    <Skeleton
                      width="100%"
                      height={40}
                      style={{ marginTop: "5px" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="profile__item">
              <Skeleton
                width={150}
                height={25}
                style={{ marginTop: "24px", marginLeft: "24px" }}
              />

              <div className="profile__content">
                <div className="profile__inputs">
                  {["state", "city", "street", "apartment"].map((_, index) => (
                    <div className="profile__group" key={index}>
                      <Skeleton width={100} height={15} />
                      <Skeleton
                        width="100%"
                        height={40}
                        style={{ marginTop: "5px" }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
