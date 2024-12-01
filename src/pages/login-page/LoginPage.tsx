import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { login } from "../../api/auth";

import { useAuthContext } from "../../context/AuthContext";
import { useModalContext } from "../../context/ModalContext";

import { LoginPageMessages } from "../../shared/utils/modalMessages";

import { AuthData } from "../../types/Auth";

import logo from "../../assets/img/logo.svg";

import "./LoginPage.scss";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { isAuth, signin } = useAuthContext();
  const { showModal } = useModalContext();

  const [formData, setFormData] = useState<AuthData>({
    username: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await login(formData);
      signin();
      showModal(LoginPageMessages.LOGIN_SUCCESS);
    } catch (error) {
      showModal(LoginPageMessages.LOGIN_ERROR);
    }
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth]);

  return (
    <section className="authorization">
      <div className="authorization__container">
        <div className="authorization__body">
          <form className="authorization__form form" onSubmit={handleSubmit}>
            <div className="form__title">
              <img className="form__logo" src={logo} alt="logo" />
              <h1 className="form__title title-2">{t("pages.login.title")}</h1>
              <p className="text-muted">
                {t("pages.login.noAccount")}{" "}
                <Link to="/register" className="form__link">
                  {t("pages.login.register")}
                </Link>
              </p>
            </div>
            <div className="form__group group">
              <input
                type="text"
                className="form__input input"
                placeholder={t("pages.login.username")}
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                className="form__input input"
                placeholder={t("pages.login.password")}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form__button">
              <div className="form__button button-wrapper">
                <button
                  className="button button_lg button_default button_full-size"
                  type="submit"
                >
                  {t("pages.login.button")}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>

  );
};

export default LoginPage;
