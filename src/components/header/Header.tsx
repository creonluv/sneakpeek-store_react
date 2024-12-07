import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { AsideMenu } from "./asidemenu/AsideMenu";
import { logout } from "../../api/auth";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { fetchBucket } from "../../features/bucket";
import { fetchFavourite } from "../../features/favourite";

import { useAuthContext } from "../../context/AuthContext";
import { useModalContext } from "../../context/ModalContext";

import { AuthMessages } from "../../shared/utils/modalMessages";

import logo from "../../assets/img/icons/logo.svg";
import iconSearch from "../../assets/img/icons/search.svg";
import cart from "../../assets/img/icons/cart.svg";
import account from "../../assets/img/icons/account.svg";
import likes from "../../assets/img/icons/likes.svg";
import close from "../../assets/img/icons/close.svg";
import favicon from "../../assets/img/icons/favicon.svg"

import "./Header.scss";

export const Header = () => {
  const [burger, setBurger] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { isAuth, signout } = useAuthContext();
  const { showModal } = useModalContext();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { bucket } = useAppSelector((state: RootState) => state.bucket);
  const { favourite } = useAppSelector((state: RootState) => state.favourite);

  const { t, i18n } = useTranslation();

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleBurger = () => {
    setBurger(!burger);
    document.body.classList.toggle("_lock");
  };

  const handleChangeInputSearch = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  async function handleLogout() {
    try {
      await logout();
      signout();
      toggleModal();
      showModal(AuthMessages.LOGOUT_SUCCESS);
    } catch {
      showModal(AuthMessages.LOGOUT_ERROR);
    }
  }

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    navigate(
      `catalog/?minPrice=0&maxPrice=10000&sortField=name&sortOrder=asc&page=1&name=${searchTerm}`
    );
  };

  const handleSelectLanguage = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const selectedLanguage = e.target.value;
    i18n.changeLanguage(selectedLanguage);
  };

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchBucket());
      dispatch(fetchFavourite());
    }
  }, [dispatch, isAuth]);

  return (
    <header className="header">
      <div className="header__top">
        <div className="header__container">
          <div className="header__top-body">
            <div className="header__select select">
              <select
                className="select__items"
                name="lang"
                onChange={handleSelectLanguage}
              >
                <option className="select__item" value="en">
                  En
                </option>
                <option className="select__item" value="ua">
                  Ua
                </option>
                <option className="select__item" value="de">
                  De
                </option>
                <option className="select__item" value="fr">
                  Fr
                </option>
                <option className="select__item" value="es">
                  Es
                </option>
              </select>
            </div>
            <Link to="/help">{t("components.header.help")}</Link>
          </div>
        </div>
      </div>
      <div className="header__container">
        <div className="header__body">
          <div className="header__main">
            <div className="header__logo logo">
              <Link className="logo__link" to="/">
                <picture>
                  <source media="(min-width:480px)" srcSet={logo} />
                  <source media="(max-width:480px)" srcSet={favicon} />
                  <img className="header__logoimage" src={logo} alt="LOGO" />
                </picture>
              </Link>
            </div>
            <form className="header__form" onSubmit={handleSearchSubmit}>
              <input
                className="header__search"
                type="text"
                name="search"
                placeholder={t("components.header.search")}
                value={searchTerm}
                onChange={handleChangeInputSearch}
              />
              <button className="header__search-button" type="submit">
                <img
                  className="header__search-icon"
                  src={iconSearch}
                  alt="search"
                />
              </button>
            </form>
            <div className="header__icons">
              <Link className="header__icon" to="favourite">
                <img src={likes} alt="likes" />
                {favourite?.length > 0 && (
                  <div className="header__counter">{favourite?.length}</div>
                )}
              </Link>
              <Link className="header__icon" to="bucket">
                <img src={cart} alt="cart" />
                {(bucket?.cart_items?.length ?? 0) > 0 && (
                  <div className="header__counter">
                    {bucket?.cart_items.length}
                  </div>
                )}
              </Link>
              <button className="header__icon" onClick={toggleModal}>
                <img src={account} alt="account" />
              </button>
              <div className={`list ${isModalOpen ? "" : "_hidden"}`}>
                {isAuth ? (
                  <>
                    <Link
                      className="list__item"
                      to="/profile"
                      onClick={toggleModal}
                    >
                      {t("components.header.profile")}
                    </Link>
                    <button className="list__item" onClick={handleLogout}>
                      {t("components.header.logout")}
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      className="list__item"
                      to="/login"
                      onClick={toggleModal}
                    >
                      {t("components.header.login")}
                    </Link>
                    <Link
                      className="list__item"
                      to="/register"
                      onClick={toggleModal}
                    >
                      {t("components.header.register")}
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div
              className={`header__burger burger${burger ? " _menu-open" : ""}`}
              onClick={handleBurger}
            >
              <div className="burger__line"></div>
            </div>
          </div>
          <nav className={`header__nav${burger ? " _menu-open" : ""}`}>
            <button
              onClick={handleBurger}
              className="header__close"
            >
              <img
                src={close}
                alt="menu"
              />
            </button>
            <ul className="header__menu menu-header">
              <li className="menu-header__item">
                <a
                  href="http://localhost:5173/catalog/?minPrice=0&maxPrice=10000&sortField=name&sortOrder=asc&page=1"
                  className="menu-header__link"
                >
                  {t("components.header.nav.item1")}
                </a>
              </li>

              <li className="menu-header__item">
                <a
                  href="http://localhost:5173/catalog/?minPrice=0&maxPrice=10000&sortField=name&sortOrder=asc&page=1&genderIds=1"
                  className="menu-header__link"
                >
                  {t("components.header.nav.item2")}
                </a>
              </li>

              <li className="menu-header__item">
                <a
                  href="http://localhost:5173/catalog/?minPrice=0&maxPrice=10000&sortField=name&sortOrder=asc&page=1&genderIds=2"
                  className="menu-header__link"
                >
                  {t("components.header.nav.item3")}
                </a>
              </li>

              <li className="menu-header__item">
                <a
                  href="http://localhost:5173/catalog/?minPrice=0&maxPrice=10000&sortField=name&sortOrder=asc&page=1&genderIds=3"
                  className="menu-header__link"
                >
                  {t("components.header.nav.item4")}
                </a>
              </li>

              <li className="menu-header__item">
                <a
                  href="http://localhost:5173/catalog/?minPrice=0&maxPrice=10000&sortField=name&sortOrder=asc&page=1&genderIds=4"
                  className="menu-header__link"
                >
                  {t("components.header.nav.item5")}
                </a>
              </li>

              <li className="menu-header__item">
                <a
                  href="http://localhost:5173/catalog/?minPrice=0&maxPrice=10000&sortField=name&sortOrder=asc&page=1"
                  className="menu-header__link"
                >
                  {t("components.header.nav.item6")}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
