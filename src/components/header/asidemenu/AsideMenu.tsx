import React from "react";

import close from "../../../assets/img/icons/close.svg";
import logo from "../../../assets/img/icons/logo.svg";
import cart from "../../../assets/img/icons/cart.svg";
import account from "../../../assets/img/icons/account.svg";
import likes from "../../../assets/img/icons/likes.svg";

import "./AsideMenu.scss";

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
      className={`menu ${isMenuOpen ? "shown" : ""}`}
    >
      <div className="menu__top">
        <div className="menu__top_container">
          <div className="menu__select select">
            <select className="select__items" name="lang">
              <option className="select__item" value="Eng">
                Eng
              </option>
              <option className="select__item" value="Ua">
                Ua
              </option>
              <option className="select__item" value="De">
                de
              </option>
              <option className="select__item" value="Fr">
                fr
              </option>
              <option className="select__item" value="Es">
                es
              </option>
            </select>
          </div>
        </div>
      </div>

      <div className="menu__header">
        <div className="menu__header_container">
          <div className="menu__header_content">
            <a className="menu__logo" href="/">
              <img
                className="menu__logoimage"
                src={logo}
                alt="LOGO"
              />
            </a>

            <button
              onClick={() => setIsMenuOpen(false)}
              className="menu__header_icon"
            >
              <img
                className="menu__header_image"
                src={close}
                alt="menu"
              />
            </button>
          </div>
        </div>
      </div>

      <div className="menu__middle">
        <div className="menu__middle_container">
          <nav className="menu__nav">
            <ul className="menu__menu menu">
              <li className="menu__item">
                <a href="" className="menu__link">
                  New
                </a>
              </li>

              <li className="menu__item">
                <a href="" className="menu__link">
                  Men
                </a>
              </li>

              <li className="menu__item">
                <a href="" className="menu__link">
                  Woman
                </a>
              </li>

              <li className="menu__item">
                <a href="" className="menu__link">
                  Kids
                </a>
              </li>

              <li className="menu__item">
                <a href="" className="menu__link">
                  Sale
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="menu__bottom">
        <div className="menu__bottom_container">
          <div className="menu__bottom_icons">
            <a className="menu__bottom_icon" href="">
              <img src={cart} alt="cart" />
            </a>

            <a className="menu__bottom_icon" href="">
              <img src={account} alt="account" />
            </a>

            <a className="menu__bottom_icon" href="">
              <img src={likes} alt="likes" />
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
};
