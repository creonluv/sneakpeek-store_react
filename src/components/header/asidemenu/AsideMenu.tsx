import React from "react";
import asideStyles from "./AsideMenu.module.scss";
import styles from "../Header.module.scss";

import close from "../../../assets/img/icons/close.svg";
import logo from "../../../assets/img/icons/logo.svg";
import cart from "../../../assets/img/icons/cart.svg";
import account from "../../../assets/img/icons/account.svg";
import likes from "../../../assets/img/icons/likes.svg";

interface AsideMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

export const AsideMenu: React.FC<AsideMenuProps> = ({
  isMenuOpen,
  setIsMenuOpen,
}) => {
  return (
    <aside
      className={`${asideStyles.menu} ${isMenuOpen ? asideStyles.shown : ""}`}
    >
      <div className={asideStyles.menu__top}>
        <div className={asideStyles.menu__top_container}>
          <div className={`${asideStyles.menu__select} ${asideStyles.select}`}>
            <select className={styles.select__items} name="lang">
              <option className={styles.select__item} value="Eng">
                Eng
              </option>
              <option className={styles.select__item} value="Ua">
                Ua
              </option>
              <option className={styles.select__item} value="De">
                de
              </option>
              <option className={styles.select__item} value="Fr">
                fr
              </option>
              <option className={styles.select__item} value="Es">
                es
              </option>
            </select>
          </div>
        </div>
      </div>

      <div className={asideStyles.menu__header}>
        <div className={asideStyles.menu__header_container}>
          <div className={asideStyles.menu__header_content}>
            <a className={asideStyles.menu__logo} href="/">
              <img
                className={asideStyles.menu__logoimage}
                src={logo}
                alt="LOGO"
              />
            </a>

            <button
              onClick={() => setIsMenuOpen(false)}
              className={asideStyles.menu__header_icon}
            >
              <img
                className={asideStyles.menu__header_image}
                src={close}
                alt="menu"
              />
            </button>
          </div>
        </div>
      </div>

      <div className={asideStyles.menu__middle}>
        <div className={asideStyles.menu__middle_container}>
          <nav className={asideStyles.menu__nav}>
            <ul className={`${asideStyles.menu__menu} ${styles.menu}`}>
              <li className={styles.menu__item}>
                <a href="" className={styles.menu__link}>
                  New
                </a>
              </li>

              <li className={styles.menu__item}>
                <a href="" className={styles.menu__link}>
                  Men
                </a>
              </li>

              <li className={styles.menu__item}>
                <a href="" className={styles.menu__link}>
                  Woman
                </a>
              </li>

              <li className={styles.menu__item}>
                <a href="" className={styles.menu__link}>
                  Kids
                </a>
              </li>

              <li className={styles.menu__item}>
                <a href="" className={styles.menu__link}>
                  Sale
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className={asideStyles.menu__bottom}>
        <div className={asideStyles.menu__bottom_container}>
          <div className={asideStyles.menu__bottom_icons}>
            <a className={asideStyles.menu__bottom_icon} href="">
              <img src={cart} alt="cart" />
            </a>

            <a className={asideStyles.menu__bottom_icon} href="">
              <img src={account} alt="account" />
            </a>

            <a className={asideStyles.menu__bottom_icon} href="">
              <img src={likes} alt="likes" />
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
};
