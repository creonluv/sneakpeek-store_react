import { Link } from "react-router-dom";
import { Aside } from "../aside";

import close from "../../../assets/img/icons/close.svg";
import logo from "../../../assets/img/icons/logo.svg";

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
        className={`menu ${isAsideOpen ? "shown" : ""}`}
      >
        <div className="menu__top">
          <div className="menu__top_container">
            <div
              className="menu__select select"
            >
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
              <Link className="menu__logo" to="/">
                <img
                  className="menu__logoimage"
                  src={logo}
                  alt="LOGO"
                />
              </Link>

              <button
                onClick={() => setIsAsideOpen(false)}
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

        <div className="menu__aside">
          <Aside />
        </div>
      </aside>
    </>
  );
};
