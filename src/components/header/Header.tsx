import styles from "./Header.module.scss";
import logo from "../../assets/img/icons/logo.svg";
import iconSearch from "../../assets/img/icons/search.svg";
import cart from "../../assets/img/icons/cart.svg";
import account from "../../assets/img/icons/account.svg";
import likes from "../../assets/img/icons/likes.svg";
import burger from "../../assets/img/icons/burger.svg";

import { useState } from "react";
import { AsideMenu } from "./asidemenu/AsideMenu";
import { Link } from "react-router-dom";

import { logout } from "../../api/auth";

import { useAuthContext } from "../../context/AuthContext";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuth, signout } = useAuthContext();

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  async function handleLogout() {
    await logout();
    signout();
    toggleModal();
  }

  return (
    <header className={styles.header}>
      <div className={styles.header__top}>
        <div className={styles.header__top_container}>
          <div className={`${styles.header__select} ${styles.select}`}>
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

      <div className={styles.header__middle}>
        <div className={styles.header__middle_container}>
          <div className={styles.header__middle_left}>
            <Link className={styles.header__logo} to="/">
              <img className={styles.header__logoimage} src={logo} alt="LOGO" />
            </Link>
          </div>

          <div className={styles.header__middle_right}>
            <form className={styles.header__form}>
              <input className={styles.header__search} type="text" name="search" placeholder="Search" />
              <button className={styles.header__search_button} type="submit">
                <img className={styles.header__search_icon} src={iconSearch} alt="search" />
              </button>
            </form>

            <div className={styles.header__middle_icons}>
              <a className={styles.header__icon} href="">
                <img src={likes} alt="likes" />
              </a>
              <a className={styles.header__icon} href="">
                <img src={cart} alt="cart" />
              </a>
              <button className={styles.header__icon} onClick={toggleModal}>
                <img src={account} alt="account" />
              </button>
              <div className={`${styles.list} ${isModalOpen ? "" : "_hidden"}`}>
                {isAuth ? (
                  <>
                    <Link className={styles.list__item} to="/profile" onClick={toggleModal}>
                      User profile
                    </Link>
                    <button className={styles.list__item} onClick={handleLogout}>
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link className={styles.list__item} to="/login" onClick={toggleModal}>
                      Login
                    </Link>
                    <Link className={styles.list__item} to="/register" onClick={toggleModal}>
                      Register
                    </Link>
                  </>
                )}
              </div>
              {/* <div className={`${styles.overlay} ${isModalOpen ? "" : "_hidden"}`}>
                <div className={styles.modal}>
                  <button className={styles.closeButton} onClick={toggleModal}>
                    ✖
                  </button>
                  {isAuth ? (
                    <>
                      <button>User Profile</button>
                      <button onClick={handleLogout}>Logout</button>
                    </>
                  ) : (
                    <>
                      <button>Register</button>
                      <button>Login</button>
                    </>
                  )}
                </div>
              </div> */}
            </div>

            <div onClick={() => setIsMenuOpen(true)} className={styles.header__middle_burger}>
              <button onClick={() => setIsMenuOpen(true)} className={styles.header__icon}>
                <img className={styles.header__button_image} src={burger} alt="menu" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.header__bottom}>
        <div className={styles.header__bottom_container}>
          <nav className={styles.header__nav}>
            <ul className={`${styles.header__menu} ${styles.menu}`}>
              <li className={styles.menu__item}>
                <a href="" className={styles.menu__link}>
                  New arrives
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
                  Brands
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

      <AsideMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </header>
  );
};
