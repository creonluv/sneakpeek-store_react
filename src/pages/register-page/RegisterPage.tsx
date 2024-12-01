import { ChangeEvent, FormEvent, useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { register } from "../../api/auth";

import { useAuthContext } from "../../context/AuthContext";
import { useModalContext } from "../../context/ModalContext";

import { RegisterPageMessages } from "../../shared/utils/modalMessages";

import logo from "../../assets/img/logo.svg";

import "./RegisterPage.scss";

interface FormData {
  username: string;
  email: string;
  password: string;
}

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { isAuth, signin } = useAuthContext();
  const { showModal } = useModalContext();

  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });

  const ref = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!ref.current?.checked) {
      showModal(RegisterPageMessages.REGISTER_WARNING);
      return;
    }

    try {
      await register(formData);
      signin();

      showModal(RegisterPageMessages.REGISTER_SUCCESS);
    } catch {
      showModal(RegisterPageMessages.REGISTER_ERROR);
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
              <h1 className="form__title title-2">{t("pages.register.title")}</h1>
              <p className="text-muted">
                {t("pages.register.noAccount")}{" "}
                <Link to="/login" className="form__link">
                  {t("pages.register.link")}
                </Link>
              </p>
            </div>
            <div className="form__group group">
              <input
                type="text"
                className="form__input input"
                placeholder={t("pages.register.username")}
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                className="form__input input"
                placeholder={t("pages.register.email")}
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                className="form__input input"
                placeholder={t("pages.register.password")}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form__checkbox checkbox">
              <input
                type="checkbox"
                className="checkbox__index"
                id="agree"
                ref={ref}
              />
              <label className="checkbox__label" htmlFor="agree">
                {t("pages.register.agree")}
              </label>
            </div>
            <div className="form__button">
              <button
                className="button button_lg button_default button_full-size"
                type="submit"
              >
                {t("pages.register.button")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>

  );
};

export default RegisterPage;
