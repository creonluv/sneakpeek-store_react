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
import burger from "../../assets/img/icons/burger.svg";

import styles from "./Header.module.scss";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { isAuth, signout } = useAuthContext();
  const { showModal } = useModalContext();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { bucket } = useAppSelector((state: RootState) => state.bucket);
  const { favourite } = useAppSelector((state: RootState) => state.favourite);

  const { t, i18n } = useTranslation();

  // useEffect(() => {
  //   const handler = setTimeout(() => {
  //     dispatch(setInputSearch(searchTerm));

  //     updateUrlWithFiltersAndPrice(
  //       navigate,
  //       {
  //         categoryIds: selectedCategories,
  //         producerIds: selectedProducers,
  //         sizeIds: selectedSizes,
  //         genderIds: selectedGenders,
  //       },
  //       priceRange,
  //       selectedSort,
  //       currentPage,
  //       true,
  //       searchTerm
  //     );
  //   }, 500);

  //   return () => {
  //     clearTimeout(handler);
  //   };
  // }, [
  //   searchTerm,
  //   dispatch,
  //   navigate,
  //   selectedCategories,
  //   selectedProducers,
  //   selectedSizes,
  //   selectedGenders,
  //   priceRange,
  //   selectedSort,
  //   currentPage,
  // ]);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

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

  const handleSelectLanguage = (e: React.ChangeEvent<HTMLSelectElement>): void => {
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
    <header className={styles.header}>
      <div className={styles.header__top}>
        <div className={styles.header__top_container}>
          <div className={`${styles.header__select} ${styles.select}`}>
            <select className={styles.select__items} name="lang" onChange={handleSelectLanguage}>
              <option className={styles.select__item} value="en">
                Eng
              </option>
              <option className={styles.select__item} value="ua">
                Ua
              </option>
              <option className={styles.select__item} value="de">
                De
              </option>
              <option className={styles.select__item} value="fr">
                Fr
              </option>
              <option className={styles.select__item} value="es">
                Es
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
            <form className={styles.header__form} onSubmit={handleSearchSubmit}>
              <input
                className={styles.header__search}
                type="text"
                name="search"
                placeholder={t("components.header.search")}
                value={searchTerm}
                onChange={handleChangeInputSearch}
              />
              <button className={styles.header__search_button} type="submit">
                <img
                  className={styles.header__search_icon}
                  src={iconSearch}
                  alt="search"
                />
              </button>
            </form>

            <div className={styles.header__middle_icons}>
              <Link className={styles.header__icon} to="favourite">
                <img src={likes} alt="likes" />
                {favourite?.length > 0 && (
                  <div className={styles.header__counter}>
                    {favourite?.length}
                  </div>
                )}
              </Link>
              <Link className={styles.header__icon} to="bucket">
                <img src={cart} alt="cart" />
                {(bucket?.cart_items?.length ?? 0) > 0 && (
                  <div className={styles.header__counter}>
                    {bucket?.cart_items.length}
                  </div>
                )}
              </Link>
              <button className={styles.header__icon} onClick={toggleModal}>
                <img src={account} alt="account" />
              </button>
              <div className={`${styles.list} ${isModalOpen ? "" : "_hidden"}`}>
                {isAuth ? (
                  <>
                    <Link
                      className={styles.list__item}
                      to="/profile"
                      onClick={toggleModal}
                    >
                      {t("components.header.profile")}
                    </Link>
                    <button
                      className={styles.list__item}
                      onClick={handleLogout}
                    >
                      {t("components.header.logout")}
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      className={styles.list__item}
                      to="/login"
                      onClick={toggleModal}
                    >
                      {t("components.header.login")}
                    </Link>
                    <Link
                      className={styles.list__item}
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
              onClick={() => setIsMenuOpen(true)}
              className={styles.header__middle_burger}
            >
              <button
                onClick={() => setIsMenuOpen(true)}
                className={styles.header__icon}
              >
                <img
                  className={styles.header__button_image}
                  src={burger}
                  alt="menu"
                />
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
                  {t("components.header.nav.item1")}
                </a>
              </li>

              <li className={styles.menu__item}>
                <a href="" className={styles.menu__link}>
                  {t("components.header.nav.item2")}
                </a>
              </li>

              <li className={styles.menu__item}>
                <a href="" className={styles.menu__link}>
                  {t("components.header.nav.item3")}
                </a>
              </li>

              <li className={styles.menu__item}>
                <a href="" className={styles.menu__link}>
                  {t("components.header.nav.item4")}
                </a>
              </li>

              <li className={styles.menu__item}>
                <a href="" className={styles.menu__link}>
                  {t("components.header.nav.item5")}
                </a>
              </li>

              <li className={styles.menu__item}>
                <a href="" className={styles.menu__link}>
                  {t("components.header.nav.item6")}
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
