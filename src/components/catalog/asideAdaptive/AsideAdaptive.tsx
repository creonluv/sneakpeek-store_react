import asideStyles from "../../header/asidemenu/AsideMenu.module.scss";
import styles from "../../header/Header.module.scss";

import close from "../../../assets/img/icons/close.svg";
import logo from "../../../assets/img/icons/logo.svg";
import { Aside } from "../aside";

type Props = {
  isAsideOpen: boolean;
  setIsAsideOpen: (isOpen: boolean) => void;
};

export const AsideAdaptive: React.FC<Props> = ({
  isAsideOpen,
  setIsAsideOpen,
}) => {
  return (
    <>
      <aside
        className={`${asideStyles.menu} ${
          isAsideOpen ? asideStyles.shown : ""
        }`}
      >
        <div className={asideStyles.menu__top}>
          <div className={asideStyles.menu__top_container}>
            <div
              className={`${asideStyles.menu__select} ${asideStyles.select}`}
            >
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
                onClick={() => setIsAsideOpen(false)}
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

        <div className={asideStyles.menu__aside}>
          <Aside />
        </div>
      </aside>
    </>
  );
};
