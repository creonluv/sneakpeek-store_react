import styles from "./BreadCrumbs.module.scss";

import React from "react";
import { useLocation, Link } from "react-router-dom";
import btnBred from "../../assets/img/icons/btn-bread.svg";

export const BreadСrumbs = () => {
  const location = useLocation();

  let currentLink = "";

  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb, index, array) => {
      currentLink += `/${crumb}`;

      const crumbText = crumb.charAt(0).toUpperCase() + crumb.slice(1);
      const isLast = index === array.length - 1;

      return (
        <React.Fragment key={crumb}>
          {index === 0 && (
            <div className={styles.crumbFirst}>
              <Link to="/">Home</Link>

              <img src={btnBred} alt="" />
            </div>
          )}

          <div className={styles.crumb}>
            <Link to={currentLink}>{crumbText}</Link>
          </div>

          {!isLast && <img src={btnBred} alt="" />}
        </React.Fragment>
      );
    });

  return <div className={styles.breadcrumbs}>{crumbs}</div>;
};
